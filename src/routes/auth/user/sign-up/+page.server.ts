import axios from 'axios';
import { httpsAgent } from '$lib/server/http-config';
import type { Actions } from '@sveltejs/kit';
import { API_AUTH_ROOT, API_BASE_URL, API_AUTH_CREATE_ACCOUNT } from '$env/static/private';
import { fail } from '@sveltejs/kit';
import { validateEmail } from '$lib/utils/function/validators/validate-email';
import { email } from '$lib/state/account-email-registration-data';
import { validatePlateNumber } from '$lib/utils/function/validators/validate-plate-number';

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		try {
			const firstName = String(data.get('first-name'));
			const lastName = String(data.get('last-name'));
			const nickname = data.get('nickname') ? String(data.get('nickname')) : '';
			const plateNumber = String(data.get('plate-number'));
			const phone = String(data.get('phone'));
			const userEmail = String(data.get('email'));
			if (!validateEmail(userEmail)) {
				return fail(400, { success: false, message: 'Invalid email' });
			}
			if (!firstName || !lastName || !phone || !plateNumber) {
				return fail(400, { success: false, message: 'Missing required fields' });
			}
			if (firstName.length < 2 || lastName.length < 2) {
				return fail(400, { success: false, message: 'First and Last Name must be at least 2 characters long' });
			}
			if (!validatePlateNumber(plateNumber)) {
				return fail(400, { success: false, message: 'Invalid plate number' });
			}

			const response = axios.post(
				`${API_BASE_URL}${API_AUTH_ROOT}${API_AUTH_CREATE_ACCOUNT}`,
				{
					email: userEmail,
					first_name: firstName,
					last_name: lastName,
					phone_number: phone as string,
					role: 'User',
					plate_number: plateNumber,
					nickname: nickname
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
