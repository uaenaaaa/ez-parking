import type { PageServerLoad } from './$types';
import { API_BASE_URL, API_AUTH_LOGOUT, API_AUTH_ROOT } from '$env/static/private';
import axios from 'axios';
import { redirect } from '@sveltejs/kit';
import { httpsAgent } from '$lib/server/http-config';
import credentialsManager from '$lib/utils/function/credentials-manager';

export const load: PageServerLoad = async ({ cookies }) => {
	const cookiesObject = credentialsManager(cookies);
	const authToken = cookiesObject.Authorization;
	const XCSRFToken = cookiesObject['X-CSRF-TOKEN'];
	const refresh_token_cookie = cookiesObject.refresh_token_cookie;
	const csrf_refresh_token = cookiesObject.csrf_refresh_token;

	if (!authToken || !XCSRFToken || !refresh_token_cookie || !csrf_refresh_token) {
		redirect(303, '/');
	}

	axios.post(
		`${API_BASE_URL}${API_AUTH_ROOT}${API_AUTH_LOGOUT}`,
		{},
		{
			headers: {
				Authorization: `Bearer ${authToken}`,
				'X-CSRF-TOKEN': XCSRFToken,
				csrf_refresh_token,
				refresh_token_cookie
			},
			withCredentials: true,
			httpsAgent
		}
	);

	cookies.delete('Authorization', { path: '/' });
	cookies.delete('X-CSRF-TOKEN', { path: '/' });
	cookies.delete('refresh_token_cookie', { path: '/' });
	cookies.delete('csrf_refresh_token', { path: '/' });

	redirect(303, '/');
};
