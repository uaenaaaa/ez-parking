import type { PageServerLoad } from './$types';
import { API_AUTH_LOGOUT, API_AUTH_ROOT } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import credentialsManager from '$lib/utils/function/credentials-manager';
import axiosInstance from '$lib/utils/function/validators/axios-config';

export const load: PageServerLoad = async ({ cookies }) => {
    const cookiesObject = credentialsManager(cookies);
    const authToken = cookiesObject.Authorization;
    const XCSRFToken = cookiesObject['X-CSRF-TOKEN'];
    const refresh_token_cookie = cookiesObject.refresh_token_cookie;
    const csrf_refresh_token = cookiesObject.csrf_refresh_token;

    if (!authToken || !XCSRFToken || !refresh_token_cookie || !csrf_refresh_token) {
        redirect(303, '/');
    }

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

    redirect(303, '/');
};
