import type { PageServerLoad } from './$types';
import { API_ADMIN_ROOT, API_GET_ALL_USER } from '$env/static/private';
import axiosInstance from '$lib/utils/function/validators/axios-config';
import credentialsManager from '$lib/utils/function/credentials-manager';
import { fail, type Actions } from '@sveltejs/kit';
import { isAxiosError } from 'axios';
export const load: PageServerLoad = async ({ cookies }) => {
    try {
        const credentials = credentialsManager(cookies);
        const users = await axiosInstance.get(`${API_ADMIN_ROOT}${API_GET_ALL_USER}`, {
            headers: {
                Authorization: credentials.Authorization,
                'X-CSRF-TOKEN': credentials['X-CSRF-TOKEN'],
                csrf_refresh_token: credentials.csrf_refresh_token,
                refresh_token_cookie: credentials.refresh_token_cookie
            }
        });
        return {
            success: true,
            response: {
                users: users.data
            }
        };
    } catch (error) {
        if (isAxiosError(error)) {
            return fail(500, { error: error.response?.data });
        }
        return fail(599, { message: 'Failed to fetch data' });
    }
};

export const actions: Actions = {
    default: async ({ request, cookies }) => {
        try {
            const formData = await request.formData();
            const credentials = credentialsManager(cookies);
            const banReason = formData.get('ban_reason');
            const isPermanent = formData.get('is_permanent') === 'true';
            const banStart = formData.get('ban_start');
            const banEnd = formData.get('ban_end');
        } catch {
            return fail(599, { message: 'Failed to fetch data' });
        }
    }
};
