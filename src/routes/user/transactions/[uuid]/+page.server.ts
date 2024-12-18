import type { PageServerLoad } from './$types';
import { isAxiosError } from 'axios';
import {
    API_TRANSACTION_ROOT,
    API_TRANSACTION_TRANSACTION_OVERVIEW,
    API_TRANSACTION_CANCEL_TRANSACTION
} from '$env/static/private';
import credentialsManager from '$lib/utils/function/credentials-manager';
import type { Actions } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import axiosInstance from '$lib/utils/function/validators/axios-config';

export const load: PageServerLoad = async ({ params, cookies }) => {
    const cookieObject = credentialsManager(cookies);
    try {
        const response = await axiosInstance.get(
            `${API_TRANSACTION_ROOT}${API_TRANSACTION_TRANSACTION_OVERVIEW}`,
            {
                params: {
                    transaction_uuid: params.uuid
                },
                headers: {
                    Authorization: cookieObject.Authorization,
                    'X-CSRF-TOKEN': cookieObject['X-CSRF-TOKEN'],
                    csrf_refresh_token: cookieObject.csrf_refresh_token,
                    refresh_token_cookie: cookieObject.refresh_token_cookie
                }
            }
        );
        return response.data;
    } catch (error) {
        if (isAxiosError(error)) {
            return fail(500, { error: error.response?.data });
        }
        return fail(500, { error: 'Failed to fetch transaction' });
    }
};

export const actions: Actions = {
    default: async ({ params, cookies }) => {
        const cookieObject = credentialsManager(cookies);
        try {
            await axiosInstance.patch(
                `${API_TRANSACTION_ROOT}${API_TRANSACTION_CANCEL_TRANSACTION}`,
                {
                    transaction_uuid: params.uuid
                },
                {
                    headers: {
                        Authorization: cookieObject.Authorization,
                        'X-CSRF-TOKEN': cookieObject['X-CSRF-TOKEN'],
                        csrf_refresh_token: cookieObject.csrf_refresh_token,
                        refresh_token_cookie: cookieObject.refresh_token_cookie
                    }
                }
            );
        } catch (error) {
            if (isAxiosError(error)) {
                return fail(500, { success: false, message: error.response?.data });
            }
            return fail(500, { success: false, message: 'Failed to cancel transaction' });
        }
    }
};
