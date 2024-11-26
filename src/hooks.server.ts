import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { verifyToken } from '$lib/server/auth/verify-token-jwt.js';

function matchesPattern(path: string, pattern: string): boolean {
	const regexPattern = pattern.replace(/\*/g, '.*').replace(/\//g, '\\/');

	const regex = new RegExp(`^${regexPattern}$`);
	return regex.test(path);
}

export const handle: Handle = async ({ event, resolve }) => {
	const PROTECTED_ENDPOINTS = ['/parking-manager/*', '/admin/*', '/user/*'];

	const isProtected = PROTECTED_ENDPOINTS.some((pattern) =>
		matchesPattern(event.url.pathname, pattern)
	);

	if (isProtected) {
		try {
			await verifyToken();
			return resolve(event);
		} catch {
			redirect(308, '/');
		}
	}

	return resolve(event);
};
