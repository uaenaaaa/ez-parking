import type { PageLoad } from './$types';
import axios from 'axios';
import { httpsAgent } from '$lib/server/http-config';

export const load: PageLoad = async ({ cookies }) => {
	try {
		const token = cookies.get('Authorization');
		const xsrfToken = cookies.get('X-CSRF-TOKEN');

		if (!token) {
			return {
				establishmentInfo: null,
				error: 'Not authenticated'
			};
		}

		const response = await axios.get(
			'https://localhost:5000/api/v1/parking-manager/get-all-establishments-info',
			{
				headers: {
					Authorization: `Bearer ${token}`
				},
				httpsAgent,
				withCredentials: true,
				withXSRFToken: xsrfToken
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
