import type { PageServerLoad } from './$types';
import {
	API_PARKING_MANAGER_ROOT,
	API_BASE_URL,
	API_ESTABLISHMENT_ENTRY_VALIDATE,
	API_QR_CODE_TRANSACTION_OVERVIEW
} from '$env/static/private';
import { httpsAgent } from '$lib/server/http-config';
import axios from 'axios';
import credentialsManager from '$lib/utils/function/credentials-manager';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, cookies }) => {
	if (
		!params.transaction_id ||
		params.transaction_id.length < 100 ||
		params.transaction_id.length > 1024
	) {
		redirect(303, '/parking-manager/entry');
	}
	const cookiesObject = credentialsManager(cookies);
	try {
		const response = await axios.get(
			`${API_BASE_URL}${API_PARKING_MANAGER_ROOT}${API_QR_CODE_TRANSACTION_OVERVIEW}`,
			{
				params: {
					qr_content: params.transaction_id
				},
				headers: {
					Authorization: cookiesObject.Authorization,
					'X-CSRF-Token': cookiesObject['X-CSRF-TOKEN'],
					csrf_refresh_token: cookiesObject.csrf_refresh_token,
					refresh_token_cookie: cookiesObject.refresh_token_cookie
				},
				withCredentials: true,
				withXSRFToken: true,
				httpsAgent
			}
		);

		const transaction = response.data;
		return { transaction };
	} catch {
		redirect(303, '/parking-manager/entry');
	}
};
