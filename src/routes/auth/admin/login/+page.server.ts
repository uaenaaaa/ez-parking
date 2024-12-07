import type { Actions } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import type { Cookies } from '@sveltejs/kit';
import axios from 'axios';
import {
	API_BASE_URL,
	API_AUTH_ROOT,
	API_AUTH_LOGIN,
	API_AUTH_VERIFY_OTP
} from '$env/static/private';
import { httpsAgent } from '$lib/server/http-config';

export const actions: Actions = {
	login: async ({ request }) => {
		const data = await request.formData();
		try {
			const response = await axios.post(
				`${API_BASE_URL}${API_AUTH_ROOT}${API_AUTH_LOGIN}`,
				{
					email: data.get('email') as string
				},
				{ withCredentials: true, httpsAgent }
			);
			return { status: 200, data: response.data };
		} catch {
			return fail(401, { success: false, message: 'Invalid credentials' });
		}
	},

	otp: async ({ request, cookies }: { request: Request; cookies: Cookies }) => {
		const data = await request.formData();
		try {
			const otpDigits = Array.from({ length: 6 }, (_, i) => (data.get(`otp-${i}`) as string) || '');

			const response = await axios.patch(
				`${API_BASE_URL}${API_AUTH_ROOT}${API_AUTH_VERIFY_OTP}`,
				{
					email: data.get('email'),
					otp: otpDigits.join(''),
					remember_me: data.get('remember') === 'on'
				},
				{ withCredentials: true, httpsAgent }
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
		} catch (error) {
			console.error('OTP verification failed:', error);
			return fail(500, {
				success: false,
				message: 'Server error occurred'
			});
		}
	}
};
