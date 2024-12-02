import type { PageServerLoad } from './$types.js';
import axios from 'axios';
import {
	API_BASE_URL,
	API_TRANSACTION_ROOT,
	API_TRANSACTION_GET_ESTABLISHMENT_INFO_SLOT_FORM
} from '$env/static/private';
import { httpsAgent } from '$lib/server/http-config';
import credentialsManager from '$lib/utils/function/credentials-manager.js';

export const load: PageServerLoad = async ({ params, cookies }) => {
	const cookieObject = credentialsManager(cookies);
	try {
		const response = await axios.get(
			`${API_BASE_URL}${API_TRANSACTION_ROOT}${API_TRANSACTION_GET_ESTABLISHMENT_INFO_SLOT_FORM}`,
			{
				params: {
					establishment_uuid: params.uuid,
					slot_code: params.code
				},
				headers: {
					Authorization: cookieObject.Authorization,
					'X-CSRF-TOKEN': cookieObject['X-CSRF-TOKEN']
				},
				httpsAgent,
				withCredentials: true,
				withXSRFToken: true
			}
		);
		return response.data;
	} catch (error) {
		console.error('Failed to fetch transaction details:', error);
	}
};
