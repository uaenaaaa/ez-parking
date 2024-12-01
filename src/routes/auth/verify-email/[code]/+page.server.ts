import type { PageServerLoad } from './$types';
import axios from 'axios';
import { httpsAgent } from '$lib/server/http-config';
import { API_BASE_URL, API_AUTH_VERIFY_EMAIL, API_AUTH_ROOT } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const response = axios.patch(
		`${API_BASE_URL}${API_AUTH_ROOT}${API_AUTH_VERIFY_EMAIL}`,
		{ verification_token: params.code },
		{ httpsAgent }
	);
	redirect(303, '/auth/login');
};
