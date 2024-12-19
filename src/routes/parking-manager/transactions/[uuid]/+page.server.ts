import type { PageServerLoad } from './$types';
import credentialsManager from '$lib/utils/function/credentials-manager';
import axiosInstance from '$lib/utils/function/validators/axios-config';
import {
    API_PARKING_MANAGER_ROOT,
    API_PARKING_MANAGER_GET_TRANSACTION_OVERVIEW
} from '$env/static/private';
import { fail } from '@sveltejs/kit';
import { isAxiosError } from 'axios';
export const load: PageServerLoad = async ({ cookies, params }) => {
    const cookiesObject = credentialsManager(cookies);
    try {
        const response = await axiosInstance.get(
            `${API_PARKING_MANAGER_ROOT}${API_PARKING_MANAGER_GET_TRANSACTION_OVERVIEW}?transaction_uuid=${params.uuid}`,
            {
                headers: {
                    Authorization: cookiesObject.Authorization,
                    'X-CSRF-TOKEN': cookiesObject['X-CSRF-TOKEN'],
                    csrf_refresh_token: cookiesObject.csrf_refresh_token,
                    refresh_token_cookie: cookiesObject.refresh_token_cookie
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
