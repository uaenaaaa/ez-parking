import axios from 'axios';
import { httpsAgent } from '$lib/server/http-config';
import type { Actions } from '@sveltejs/kit';
import { API_AUTH_ROOT, API_BASE_URL, API_AUTH_CREATE_ACCOUNT } from '$env/static/private';
import { fail } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		try {
			if (data.get('password') !== data.get('password_confirmation')) {
				return fail(401, { success: false, message: 'Passwords do not match' });
			}
			const response = await axios.post(
				`${API_BASE_URL}${API_AUTH_ROOT}${API_AUTH_CREATE_ACCOUNT}`,
				{
					email: data.get('email') as string,
					password: data.get('password') as string,
					first_name: data.get('first_name') as string,
					last_name: data.get('last_name') as string,
					phone: data.get('phone') as string,
					role: 'User'
				},
				{ withCredentials: true, httpsAgent }
			);
			return { status: 200, data: response.data };
		} catch {
			return fail(401, { success: false, message: 'Invalid credentials' });
		}
	}
};
