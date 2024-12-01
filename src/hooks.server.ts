import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import axios from 'axios';
import { httpsAgent } from '$lib/server/http-config';

axios.defaults.withCredentials = true;

type UserRole = 'user' | 'parking_manager' | 'admin';

const ROLE_ROUTES: Record<string, UserRole[]> = {
	'/parking-manager': ['parking_manager'],
	'/admin': ['admin'],
	'/user': ['user']
};

function matchesPattern(path: string, pattern: string): boolean {
	const normalizedPath = path.replace(/\/$/, '');
	const regexPattern = pattern.replace(/\*/g, '.*').replace(/\//g, '\\/').replace(/\/$/, '');
	const regex = new RegExp(`^${regexPattern}`);
	return regex.test(normalizedPath);
}

function getRoleFromPath(path: string): string | null {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	for (const [route, _] of Object.entries(ROLE_ROUTES)) {
		if (matchesPattern(path, route)) {
			return route;
		}
	}
	return null;
}

export const handle: Handle = async ({ event, resolve }) => {
	const PROTECTED_ENDPOINTS = ['/parking-manager', '/admin', '/user'];
	const verifyTokenUrl = 'https://localhost:5000/api/v1/auth/verify-token';

	const isProtected = PROTECTED_ENDPOINTS.some((pattern) =>
		matchesPattern(event.url.pathname, pattern)
	);

	if (!isProtected) {
		return resolve(event);
	}

	const authToken = event.cookies.get('Authorization');
	const xsrfToken = event.cookies.get('X-CSRF-TOKEN');

	if (!authToken) {
		throw redirect(303, '/');
	}

	const result = await axios.post(
		verifyTokenUrl,
		{},
		{
			headers: {
				Authorization: `Bearer ${authToken}`,
				'X-CSRF-TOKEN': xsrfToken || ''
			},
			withCredentials: true,
			httpsAgent
		}
	);

	const userRole = result.data.role as UserRole;
	const currentPath = event.url.pathname;
	const routeBase = getRoleFromPath(currentPath);

	if (!routeBase || !ROLE_ROUTES[routeBase].includes(userRole)) {
		switch (userRole) {
			case 'admin':
				throw redirect(303, '/admin/dashboard');
			case 'parking_manager':
				throw redirect(303, '/parking-manager/dashboard');
			case 'user':
				throw redirect(303, '/user/dashboard');
			default:
				throw redirect(303, '/');
		}
	}

	return resolve(event);
};
