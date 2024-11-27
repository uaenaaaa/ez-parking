import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import axios from 'axios';
import https from 'https';

const agent = new https.Agent({
	rejectUnauthorized: false
});
axios.defaults.withCredentials = true;

function matchesPattern(path: string, pattern: string): boolean {
	const normalizedPath = path.replace(/\/$/, '');
	const regexPattern = pattern.replace(/\*/g, '.*').replace(/\//g, '\\/').replace(/\/$/, '');
	const regex = new RegExp(`^${regexPattern}`);
	return regex.test(normalizedPath);
}

export const handle: Handle = async ({ event, resolve }) => {
	const PROTECTED_ENDPOINTS = ['/parking-manager', '/admin', '/user'];
	const verifyTokenUrl = 'https://localhost:5000/api/v1/auth/verify-token';

	const isProtected = PROTECTED_ENDPOINTS.some((pattern) =>
		matchesPattern(event.url.pathname, pattern)
	);

	if (isProtected) {
		try {
			const authToken = event.cookies.get('Authorization');
			const xsrfToken = event.cookies.get('X-CSRF-TOKEN');

			if (!authToken) {
				throw redirect(303, '/auth/login');
			}

			await axios.post(
				verifyTokenUrl,
				{},
				{
					headers: {
						Authorization: `Bearer ${authToken}`,
						'X-CSRF-TOKEN': xsrfToken || ''
					},
					withCredentials: true,
					httpsAgent: agent
				}
			);
			return resolve(event);
		} catch (error) {
			console.error('Token verification failed:', error);
			throw redirect(303, '/auth/login');
		}
	}

	return resolve(event);
};
