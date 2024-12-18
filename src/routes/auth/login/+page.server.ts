import { fail, type Actions, type Cookies } from '@sveltejs/kit';
import axiosInstance from '$lib/utils/function/validators/axios-config';
import {
    API_AUTH_LOGIN,
    API_AUTH_ROOT,
    API_AUTH_VERIFY_OTP,
    API_AUTH_LOGOUT
} from '$env/static/private';
import axios from 'axios';
import type { PageServerLoad } from './$types';
import credentialsManager from '$lib/utils/function/credentials-manager';

export const load: PageServerLoad = async ({ cookies, url }) => {
    try {
        const credentials = credentialsManager(cookies);
        const authToken = credentials.Authorization;
        const XCSRFToken = credentials['X-CSRF-TOKEN'];
        const refresh_token_cookie = credentials.refresh_token_cookie;
        const csrf_refresh_token = credentials.csrf_refresh_token;

        if (url.searchParams.has('next')) {
            const response = await axiosInstance.post(
                `${API_AUTH_ROOT}${API_AUTH_LOGOUT}`,
                {},
                {
                    headers: {
                        Authorization: authToken,
                        'X-CSRF-TOKEN': XCSRFToken,
                        csrf_refresh_token,
                        refresh_token_cookie
                    }
                }
            );

            const responseCookies = response.headers['set-cookie'];
            if (responseCookies && Array.isArray(responseCookies)) {
                responseCookies.forEach((cookie) => {
                    const [cookieString] = cookie.split(';');
                    const [name, ...parts] = cookieString.split('=');
                    const value = parts.join('=');

                    cookies.set(name, value, {
                        path: '/',
                        secure: true,
                        sameSite: 'none',
                        httpOnly: true
                    });
                });
            }
        }
        return { success: true };
    } catch {
        cookies.delete('Authorization', { path: '/' });
        cookies.delete('X-CSRF-TOKEN', { path: '/' });
        cookies.delete('csrf_refresh_token', { path: '/' });
        cookies.delete('refresh_token_cookie', { path: '/' });
    }
};

export const actions: Actions = {
    login: async ({ request }) => {
        const data = await request.formData();
        try {
            const response = await axiosInstance.post(`${API_AUTH_ROOT}${API_AUTH_LOGIN}`, {
                email: data.get('email') as string
            });
            return { status: 200, data: response.data };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return fail(error.response?.status || 500, {
                    success: false,
                    message: error.response?.data?.message || 'An error occurred'
                });
            }
            return fail(500, { success: false, message: 'An unexpected error occurred' });
        }
    },
    otp: async ({ request, cookies }: { request: Request; cookies: Cookies }) => {
        const data = await request.formData();
        try {
            const otpDigits = Array.from(
                { length: 6 },
                (_, i) => (data.get(`otp-${i}`) as string) || ''
            );

            const response = await axiosInstance.patch(`${API_AUTH_ROOT}${API_AUTH_VERIFY_OTP}`, {
                email: data.get('email'),
                otp: otpDigits.join(''),
                remember_me: data.get('remember') === 'on'
            });

            const responseCookies = response.headers['set-cookie'];
            if (responseCookies && Array.isArray(responseCookies)) {
                responseCookies.forEach((cookie) => {
                    const [cookieString] = cookie.split(';');
                    const [name, ...parts] = cookieString.split('=');
                    const value = parts.join('=');

                    cookies.set(name, value, {
                        path: '/',
                        secure: true,
                        sameSite: 'none',
                        httpOnly: true
                    });
                });
            }
            const role: 'parking_manager' | 'user' | 'admin' = response.data.role;
            return { role };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return fail(error.response?.status || 500, {
                    success: false,
                    message: error.response?.data?.message || 'An error occurred'
                });
            }
            return fail(500, {
                success: false,
                message: 'Server error occurred'
            });
        }
    }
};
