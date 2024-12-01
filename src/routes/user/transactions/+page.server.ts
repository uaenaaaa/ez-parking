import type { PageServerLoad } from './$types';
import axios from 'axios';
import {
	API_BASE_URL,
	API_TRANSACTION_ROOT,
	API_TRANSACTION_ALL_TRANSACTIONS
} from '$env/static/private';
import { httpsAgent } from '$lib/server/http-config';

export const load: PageServerLoad = async ({ cookies }) => {
	try {
		const token = cookies.get('Authorization');
		const xsrfToken = cookies.get('X-CSRF-TOKEN');
		console.log(`${API_BASE_URL}${API_TRANSACTION_ROOT}${API_TRANSACTION_ALL_TRANSACTIONS}`);
		const response = await axios.get(
			`${API_BASE_URL}${API_TRANSACTION_ROOT}${API_TRANSACTION_ALL_TRANSACTIONS}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
					'X-CSRF-TOKEN': xsrfToken
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
