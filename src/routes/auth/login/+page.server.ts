import type { Actions } from '@sveltejs/kit';
import { login } from '$lib/server/auth/login.js';
import { fail } from '@sveltejs/kit';
import type { Cookies } from '@sveltejs/kit';
import axios from 'axios';
import https from 'https';

const agent = new https.Agent({
	rejectUnauthorized: false
});

export const actions: Actions = {
	login: async ({ request }) => {
		const data = await request.formData();
		try {
			const result = await login({
				email: data.get('email') as string
			});
			return { status: 200, data: result };
		} catch {
			return fail(401, { success: false, message: 'Invalid credentials' });
		}
	},
	otp: async ({ request, cookies }: { request: Request; cookies: Cookies }) => {
		const data = await request.formData();
		try {
			const otpDigits = Array.from({ length: 6 }, (_, i) => (data.get(`otp-${i}`) as string) || '');

			const response = await axios.patch(
				'https://localhost:5000/api/v1/auth/verify-otp',
				{
					email: data.get('email'),
					otp: otpDigits.join(''),
					remember_me: data.get('remember') === 'on'
				},
				{ withCredentials: true, httpsAgent: agent }
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

			return {
				success: true,
				data: response.data
			};
		} catch (error) {
			console.error('OTP verification failed:', error);
			return fail(500, {
				success: false,
				message: 'Server error occurred'
			});
		}
	}
};
