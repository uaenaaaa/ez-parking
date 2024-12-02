import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import axios from 'axios';
import { httpsAgent } from '$lib/server/http-config';
import validateTwoDifferentHours from '$lib/utils/function/validators/validate-hours';
import credentialsManager from '$lib/utils/function/credentials-manager';
import { fail } from '@sveltejs/kit';
import {
	API_BASE_URL,
	API_PARKING_MANAGER_ROOT,
	API_PARKING_MANAGER_GET_ESTABLISHMENT_HOURS,
	API_PARKING_MANAGER_UPDATE_ESTABLISHMENT_HOURS
} from '$env/static/private';

export const load: PageServerLoad = async ({ cookies }) => {
	const cookiesObject = credentialsManager(cookies);

	const response = await axios.get(
		`${API_BASE_URL}${API_PARKING_MANAGER_ROOT}${API_PARKING_MANAGER_GET_ESTABLISHMENT_HOURS}`,
		{
			httpsAgent,
			headers: {
				Authorization: cookiesObject.Authorization,
				'X-CSRF-TOKEN': cookiesObject['X-CSRF-TOKEN'],
				csrf_refresh_token: cookiesObject.csrf_refresh_token,
				refresh_token_cookie: cookiesObject.refresh_token_cookie
			}
		}
	);

	return {
		data: response.data.data
	};
};

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		try {
			const cookiesObject = credentialsManager(cookies);
			const data = request.formData();
			const openingTime = (await data).get('opening-time') as string;
			const closingTime = (await data).get('closing-time') as string;
			const is24Hours = (await data).get('is-24-hours') ?? false;

			if (is24Hours && (openingTime || closingTime)) {
				return fail(400, {
					success: false,
					message: 'Cannot set opening and closing times if 24 hours is selected'
				});
			}

			if (!is24Hours && openingTime && closingTime) {
				if (!validateTwoDifferentHours(openingTime, closingTime)) {
					return fail(400, {
						success: false,
						message: 'Opening and closing times must have at least 1 hour difference'
					});
				}
			}

			if (!is24Hours && (!openingTime || !closingTime)) {
				return fail(400, { success: false, message: 'Opening and closing times are required' });
			}

			const response = axios.patch(
				`${API_BASE_URL}${API_PARKING_MANAGER_ROOT}${API_PARKING_MANAGER_UPDATE_ESTABLISHMENT_HOURS}`,
				{
					opening_time: openingTime,
					closing_time: closingTime,
					is_24_hours: is24Hours
				},
				{
					httpsAgent,
					headers: {
						Authorization: cookiesObject.Authorization,
						'X-CSRF-TOKEN': cookiesObject['X-CSRF-TOKEN'],
						csrf_refresh_token: cookiesObject.csrf_refresh_token,
						refresh_token_cookie: cookiesObject.refresh_token_cookie
					}
				}
			);
			console.log(response);
			return {
				status: 200,
				data: { success: true, message: 'Establishment hours updated successfully' }
			};
		} catch {
			return fail(500, {
				success: false,
				message: 'An error occurred while updating establishment hours'
			});
		}
	}
};
