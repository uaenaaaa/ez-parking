import type { PageServerLoad } from './$types';
import axios from 'axios';
import {
	API_BASE_URL,
	API_TRANSACTION_ROOT,
	API_TRANSACTION_ALL_TRANSACTIONS
} from '$env/static/private';
import { httpsAgent } from '$lib/server/http-config';
import credentialsManager from '$lib/utils/function/credentials-manager';

export const load: PageServerLoad = async ({ cookies }) => {
	const cookieObject = credentialsManager(cookies);
	try {
		console.log(`${API_BASE_URL}${API_TRANSACTION_ROOT}${API_TRANSACTION_ALL_TRANSACTIONS}`);
		const response = await axios.get(
			`${API_BASE_URL}${API_TRANSACTION_ROOT}${API_TRANSACTION_ALL_TRANSACTIONS}`,
			{
				headers: {
					Authorization: cookieObject.Authorization,
					'X-CSRF-TOKEN': cookieObject['X-CSRF-TOKEN'],
					csrf_refresh_token: cookieObject.csrf_refresh_token,
					refresh_token_cookie: cookieObject.refresh_token_cookie
				},
				withCredentials: true,
				withXSRFToken: true,
				httpsAgent
			}
		);

		console.log(response.data);
		return response.data;
	} catch (error) {
		console.error('Failed to fetch transactions:', error);
		throw new Error('Failed to fetch transactions');
	}
};
