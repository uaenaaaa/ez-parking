import type { PageServerLoad } from './$types';
import axiosInstance from '$lib/utils/function/validators/axios-config';
import { API_VEHICLE_TYPE_GET_ALL_VEHICLE_TYPES, API_ADMIN_ROOT } from '$env/static/private';
import credentialsManager from '$lib/utils/function/credentials-manager';

export const load: PageServerLoad = async ({ cookies }) => {
	const {
		Authorization,
		'X-CSRF-TOKEN': X_CSRF_TOKEN,
		csrf_refresh_token,
		refresh_token_cookie
	} = credentialsManager(cookies);
	const response = await axiosInstance.get(
		`${API_ADMIN_ROOT}${API_VEHICLE_TYPE_GET_ALL_VEHICLE_TYPES}`,
		{
			headers: {
				Authorization,
				'X-CSRF-TOKEN': X_CSRF_TOKEN,
				csrf_refresh_token,
				refresh_token_cookie
			}
		}
	);
	console.log(response);

	return {
		success: true,
		message: response.data
	};
};
