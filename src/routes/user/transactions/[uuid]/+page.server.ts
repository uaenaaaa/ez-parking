import type { PageServerLoad } from './$types';
import axios from 'axios';
import {
	API_BASE_URL,
	API_TRANSACTION_ROOT,
	API_TRANSACTION_TRANSACTION_OVERVIEW
} from '$env/static/private';
import { httpsAgent } from '$lib/server/http-config';

export const load: PageServerLoad = async ({ params, cookies }) => {
	try {
		const token = cookies.get('Authorization');
		const xsrfToken = cookies.get('X-CSRF-TOKEN');
		const response = await axios.get(
			`${API_BASE_URL}${API_TRANSACTION_ROOT}${API_TRANSACTION_TRANSACTION_OVERVIEW}`,
			{
				params: {
					transaction_uuid: params.uuid
				},
				headers: {
					Authorization: `Bearer ${token}`,
					'X-CSRF-TOKEN': xsrfToken
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
