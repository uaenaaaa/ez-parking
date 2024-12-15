import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import axiosInstance from '$lib/utils/function/validators/axios-config';
import { httpsAgent } from '$lib/server/http-config';
import credentialsManager from '$lib/utils/function/credentials-manager';
import { API_AUTH_ROOT, API_VERIFY_JWT_TOKEN } from '$env/static/private';

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
    for (const [route] of Object.entries(ROLE_ROUTES)) {
        if (matchesPattern(path, route)) {
            return route;
        }
    }
    return null;
}

async function verifyAndGetRole(
    authToken: string | undefined,
    xsrfToken: string | undefined,
    csrf_refresh_token: string | undefined,
    refresh_token_cookie: string | undefined
): Promise<UserRole | null> {
    if (!authToken) return null;

    try {
        const result = await axiosInstance.post(
            `${API_AUTH_ROOT}${API_VERIFY_JWT_TOKEN}`,
            {},
            {
                headers: {
                    Authorization: authToken,
                    'X-CSRF-TOKEN': xsrfToken || '',
                    refresh_token_cookie: refresh_token_cookie || '',
                    csrf_refresh_token: csrf_refresh_token || ''
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
    // const PROTECTED_ENDPOINTS = ['/parking-manager', '/user'];
    const cookiesObject = credentialsManager(event.cookies);
    const authToken = cookiesObject.Authorization;
    const xsrfToken = cookiesObject['X-CSRF-TOKEN'];
    const csrf_refresh_token = cookiesObject.csrf_refresh_token;
    const refresh_token_cookie = cookiesObject.refresh_token_cookie;

    if (event.url.pathname.endsWith('/login')) {
        const userRole = await verifyAndGetRole(
            authToken,
            xsrfToken,
            csrf_refresh_token,
            refresh_token_cookie
        );
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

    const userRole = await verifyAndGetRole(
        authToken,
        xsrfToken,
        csrf_refresh_token,
        refresh_token_cookie
    );
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
