import type { Cookies } from '@sveltejs/kit';

export default function credentialsManager(cookies: Cookies) {
	const Authorization = cookies.get('Authorization');
	const XCSRFTOKEN = cookies.get('X-CSRF-TOKEN');
	const csrf_refresh_token = cookies.get('csrf_refresh_token');
	const refresh_token_cookie = cookies.get('refresh_token_cookie');

	return {
		Authorization: `Bearer ${Authorization}`,
		'X-CSRF-TOKEN': XCSRFTOKEN,
		csrf_refresh_token,
		refresh_token_cookie
	};
}
