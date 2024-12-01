import axios from 'axios';
import { httpsAgent } from '$lib/server/http-config';
import type { Actions } from '@sveltejs/kit';
import { API_AUTH_ROOT, API_BASE_URL, API_AUTH_CREATE_ACCOUNT } from '$env/static/private';
import { fail } from '@sveltejs/kit';
import { validateEmail } from '$lib/utils/function/validators/validate-email';
import { email } from '$lib/state/account-email-registration-data';

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		try {
			if (!validateEmail(data.get('email') as string)) {
				return fail(400, { success: false, message: 'Invalid email' });
			}
			if (!data.get('first-name') || !data.get('last-name') || !data.get('phone')) {
				return fail(400, { success: false, message: 'Missing required fields' });
			}
			if (String(data.get('first-name')).length < 2 || String(data.get('last-name')).length < 2) {
				return fail(400, { success: false, message: 'Name must be at least 2 characters long' });
			}

			const response = axios.post(
				`${API_BASE_URL}${API_AUTH_ROOT}${API_AUTH_CREATE_ACCOUNT}`,
				{
					email: data.get('email') as string,
					first_name: data.get('first-name') as string,
					last_name: data.get('last-name') as string,
					phone_number: data.get('phone') as string,
					role: 'User'
				},
				{ withCredentials: true, httpsAgent }
			);
			email.set(data.get('email') as string);
			console.log(await response);
			return (await response).data;
		} catch (error) {
			console.error(error);
			return fail(401, { success: false, message: 'Invalid credentials' });
		}
	}
};
