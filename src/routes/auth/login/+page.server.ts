import { fail, type Actions, type Cookies } from '@sveltejs/kit';
import axiosInstance from '$lib/utils/function/validators/axios-config';
import { API_AUTH_LOGIN, API_AUTH_ROOT, API_AUTH_VERIFY_OTP } from '$env/static/private';
import axios from 'axios';

export const actions: Actions = {
    login: async ({ request }) => {
        const data = await request.formData();
        try {
            console.log(data);
            const response = await axiosInstance.post(
                `${API_AUTH_ROOT}${API_AUTH_LOGIN}`,
                {
                    email: data.get('email') as string
                },
                { withCredentials: true }
            );
            console.log(response.data);
            return { status: 200, data: response.data };
        } catch (error) {
            console.log(error);
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

            const response = await axiosInstance.patch(
                `${API_AUTH_ROOT}${API_AUTH_VERIFY_OTP}`,
                {
                    email: data.get('email'),
                    otp: otpDigits.join(''),
                    remember_me: data.get('remember') === 'on'
                },
                { withCredentials: true }
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
            const role: 'parking_manager' | 'user' | 'admin' = response.data.role;
            return { role };
        } catch(error) {
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
