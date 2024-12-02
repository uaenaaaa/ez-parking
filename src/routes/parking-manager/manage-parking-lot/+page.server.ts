import type { PageServerLoad } from './$types';
import axios from 'axios';
import { httpsAgent } from '$lib/server/http-config';
import credentialsManager from '$lib/utils/function/credentials-manager';

export const load: PageServerLoad = async ({ cookies }) => {
	const cookiesObject = credentialsManager(cookies);
	try {
		const response = await axios.get(
			'https://localhost:5000/api/v1/parking-manager/get-all-establishments-info',
			{
				headers: {
					Authorization: cookiesObject.Authorization,
					'X-CSRF-TOKEN': cookiesObject['X-CSRF-TOKEN'],
					csrf_refresh_token: cookiesObject.csrf_refresh_token,
					refresh_token_cookie: cookiesObject.refresh_token_cookie
				},
				httpsAgent,
				withCredentials: true,
				withXSRFToken: true
			}
		);
		console.log('response', response);

		return {
			establishmentInfo: response.data
		};
	} catch (error) {
		console.error('Failed to fetch establishment info:', error);
		return {
			establishmentInfo: null,
			error: 'Failed to load data'
		};
	}
};
