import type { PageServerLoad } from './$types';
import axios from 'axios';
import {
	API_BASE_URL,
	API_TRANSACTION_ROOT,
	API_TRANSACTION_TRANSACTION_OVERVIEW,
	API_TRANSACTION_CANCEL_TRANSACTION
} from '$env/static/private';
import { httpsAgent } from '$lib/server/http-config';
import credentialsManager from '$lib/utils/function/credentials-manager';
import type { Actions } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, cookies }) => {
	const cookieObject = credentialsManager(cookies);
	try {
		console.log('params', params.uuid);
		const response = await axios.get(
			`${API_BASE_URL}${API_TRANSACTION_ROOT}${API_TRANSACTION_TRANSACTION_OVERVIEW}`,
			{
				params: {
					transaction_uuid: params.uuid
				},
				headers: {
					Authorization: cookieObject.Authorization,
					'X-CSRF-TOKEN': cookieObject['X-CSRF-TOKEN'],
					csrf_refresh_token: cookieObject.csrf_refresh_token,
					refresh_token_cookie: cookieObject.refresh_token_cookie
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

export const actions: Actions = {
	default: async ({ params, cookies }) => {
		const cookieObject = credentialsManager(cookies);
		try {
			await axios.patch(
				`${API_BASE_URL}${API_TRANSACTION_ROOT}${API_TRANSACTION_CANCEL_TRANSACTION}`,
				{
					transaction_uuid: params.uuid
				},
				{
					headers: {
						Authorization: cookieObject.Authorization,
						'X-CSRF-TOKEN': cookieObject['X-CSRF-TOKEN'],
						csrf_refresh_token: cookieObject.csrf_refresh_token,
						refresh_token_cookie: cookieObject.refresh_token_cookie
					},
					httpsAgent,
					withCredentials: true,
					withXSRFToken: true
				}
			);
		} catch {
			return fail(500, { success: false, message: 'Failed to cancel transaction' });
		}
	}
};
