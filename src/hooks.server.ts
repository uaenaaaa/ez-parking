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

const verifyTokenUrl = 'https://localhost:5000/api/v1/auth/verify-token';

function matchesPattern(path: string, pattern: string): boolean {
	const normalizedPath = path.replace(/\/$/, '');
	const regexPattern = pattern.replace(/\*/g, '.*').replace(/\//g, '\\/').replace(/\/$/, '');
	const regex = new RegExp(`^${regexPattern}`);
	return regex.test(normalizedPath);
}

function getRoleFromPath(path: string): string | null {
	for (const [route, _] of Object.entries(ROLE_ROUTES)) {
		if (matchesPattern(path, route)) {
			return route;
		}
	}
	return null;
}

async function verifyAndGetRole(
	authToken: string | undefined,
	xsrfToken: string | undefined
): Promise<UserRole | null> {
	if (!authToken) return null;

	try {
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
		return result.data.role as UserRole;
	} catch {
		return null;
	}
}

function getRedirectPath(role: UserRole): string {
	switch (role) {
		case 'admin':
			return '/admin/dashboard';
		case 'parking_manager':
			return '/parking-manager/dashboard';
		case 'user':
			return '/user/dashboard';
		default:
			return '/';
	}
}

export const handle: Handle = async ({ event, resolve }) => {
	const PROTECTED_ENDPOINTS = ['/parking-manager', '/admin', '/user'];
	const authToken = event.cookies.get('Authorization');
	const xsrfToken = event.cookies.get('X-CSRF-TOKEN');

	// Check if user is on login page
	if (event.url.pathname.endsWith('/login')) {
		const userRole = await verifyAndGetRole(authToken, xsrfToken);
		if (userRole) {
			throw redirect(303, getRedirectPath(userRole));
		}
		return resolve(event);
	}

	const isProtected = PROTECTED_ENDPOINTS.some((pattern) =>
		matchesPattern(event.url.pathname, pattern)
	);

	if (!isProtected) {
		return resolve(event);
	}

	if (!authToken) {
		throw redirect(303, '/');
	}

	const userRole = await verifyAndGetRole(authToken, xsrfToken);
	if (!userRole) {
		throw redirect(303, '/');
	}

	const currentPath = event.url.pathname;
	const routeBase = getRoleFromPath(currentPath);

	if (!routeBase || !ROLE_ROUTES[routeBase].includes(userRole)) {
		throw redirect(303, getRedirectPath(userRole));
	}

	return resolve(event);
};
