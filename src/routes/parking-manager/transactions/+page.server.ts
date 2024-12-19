import type { PageServerLoad } from './$types';
import axiosInstance from '$lib/utils/function/validators/axios-config';
import credentialsManager from '$lib/utils/function/credentials-manager';
import {
    API_PARKING_MANAGER_ROOT,
    API_PARKING_MANAGER_GET_ALL_TRANSACTIONS
} from '$env/static/private';
import { isAxiosError } from 'axios';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies }) => {
    const cookiesObj = credentialsManager(cookies);
    try {
        const response = await axiosInstance.get(
            `${API_PARKING_MANAGER_ROOT}${API_PARKING_MANAGER_GET_ALL_TRANSACTIONS}`,
            {
                headers: {
                    Authorization: cookiesObj.Authorization,
                    'X-CSRF-TOKEN': cookiesObj['X-CSRF-TOKEN'],
                    csrf_refresh_token: cookiesObj.csrf_refresh_token,
                    refresh_token_cookie: cookiesObj.refresh_token_cookie
                }
            }
        );

        return {
            success: true,
            data: response.data.data
        };
    } catch (error) {
        if (isAxiosError(error)) {
            return fail(
                error.response?.status || 500,
                error.response?.data || 'Internal Server Error'
            );
        }
        return fail(500, { error: 'Internal Server Error' });
    }
};
