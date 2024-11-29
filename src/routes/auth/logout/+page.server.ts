import type { PageServerLoad } from './$types';
import { API_BASE_URL, API_AUTH_LOGOUT, API_AUTH_ROOT } from '$env/static/private';
import axios from 'axios';
import { redirect } from '@sveltejs/kit';
import { httpsAgent } from '$lib/server/http-config';

export const load: PageServerLoad = (async ({ cookies }) => {
	const authToken = cookies.get('Authorization');
	const xsrfToken = cookies.get('X-CSRF-TOKEN');
	const refreshToken = cookies.get('refresh_token_cookie');
	const refreshXsrfToken = cookies.get('csrf_refresh_token');

	if (!authToken || !xsrfToken || !refreshToken || !refreshXsrfToken) {
		redirect(303, '/auth/login');
	}

	await axios.post(
		`${API_BASE_URL}${API_AUTH_ROOT}${API_AUTH_LOGOUT}`,
		{},
		{
			headers: {
				Authorization: `Bearer ${authToken}`,
				'X-CSRF-TOKEN': xsrfToken
			},
			withCredentials: true,
			httpsAgent
		}
	);

	cookies.delete('Authorization', { path: '/' });
	cookies.delete('X-CSRF-TOKEN', { path: '/' });
	cookies.delete('refresh_token_cookie', { path: '/' });
	cookies.delete('csrf_refresh_token', { path: '/' });

	redirect(303, '/auth/login');
}) satisfies PageServerLoad;
