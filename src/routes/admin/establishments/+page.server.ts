import type { PageServerLoad } from './$types';
import axiosInstance from '$lib/utils/function/validators/axios-config';
import { API_ADMIN_ROOT, API_GET_PARKING_ESTABLISHMENTS } from '$env/static/private';
import credentialsManager from '$lib/utils/function/credentials-manager';
import { fail } from '@sveltejs/kit';
import { isAxiosError } from 'axios';

export const load: PageServerLoad = async ({ cookies }) => {
    try {
        const credentials = credentialsManager(cookies);

        const { data } = await axiosInstance.get(
            `${API_ADMIN_ROOT}${API_GET_PARKING_ESTABLISHMENTS}`,
            {
                headers: {
                    Authorization: credentials.Authorization,
                    'X-CSRF-TOKEN': credentials['X-CSRF-TOKEN'],
                    csrf_refresh_token: credentials.csrf_refresh_token,
                    refresh_token_cookie: credentials.refresh_token_cookie
                }
            }
        );

        return {
            success: true,
            establishments: data.data
        };
    } catch (error) {
        if (isAxiosError(error)) {
            return fail(500, { error: error.response?.data });
        }
        return fail(500, { error: 'Failed to fetch establishments' });
    }
};
