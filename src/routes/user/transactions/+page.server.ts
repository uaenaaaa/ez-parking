import type { PageServerLoad } from './$types';
import { API_TRANSACTION_ROOT, API_TRANSACTION_ALL_TRANSACTIONS } from '$env/static/private';
import credentialsManager from '$lib/utils/function/credentials-manager';
import axiosInstance from '$lib/utils/function/validators/axios-config';
import { isAxiosError } from 'axios';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies }) => {
    const cookieObject = credentialsManager(cookies);
    try {
        const response = await axiosInstance.get(
            `${API_TRANSACTION_ROOT}${API_TRANSACTION_ALL_TRANSACTIONS}`,
            {
                headers: {
                    Authorization: cookieObject.Authorization,
                    'X-CSRF-TOKEN': cookieObject['X-CSRF-TOKEN'],
                    csrf_refresh_token: cookieObject.csrf_refresh_token,
                    refresh_token_cookie: cookieObject.refresh_token_cookie
                }
            }
        );
        return { success: true, data: response.data.transactions };
    } catch (error) {
        if (isAxiosError(error)) {
            return fail(500, { error: error.response?.data });
        }
    }
};
