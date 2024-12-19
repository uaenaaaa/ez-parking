import type { PageServerLoad } from './$types';
import {
    API_PARKING_MANAGER_ROOT,
    API_ESTABLISHMENT_ENTRY_VALIDATE,
    API_QR_CODE_TRANSACTION_OVERVIEW
} from '$env/static/private';
import credentialsManager from '$lib/utils/function/credentials-manager';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import axiosInstance from '$lib/utils/function/validators/axios-config';
import { isAxiosError } from 'axios';

export const load: PageServerLoad = async ({ params, cookies }) => {
    if (
        !params.transaction_id ||
        params.transaction_id.length < 100 ||
        params.transaction_id.length > 1024
    ) {
        redirect(303, '/parking-manager/entry');
    }
    const cookiesObject = credentialsManager(cookies);
    try {
        const response = await axiosInstance.get(
            `${API_PARKING_MANAGER_ROOT}${API_QR_CODE_TRANSACTION_OVERVIEW}`,
            {
                params: {
                    qr_content: params.transaction_id
                },
                headers: {
                    Authorization: cookiesObject.Authorization,
                    'X-CSRF-TOKEN': cookiesObject['X-CSRF-TOKEN'],
                    csrf_refresh_token: cookiesObject.csrf_refresh_token,
                    refresh_token_cookie: cookiesObject.refresh_token_cookie
                }
            }
        );

        return { success: true, transaction: response.data };
    } catch (error) {
        if (isAxiosError(error)) {
            return fail(500, { error: error.response?.data });
        }
        return fail(500, { error: 'Failed to load transaction' });
    }
};

export const actions: Actions = {
    default: async ({ cookies, request, params }) => {
        const cookiesObject = credentialsManager(cookies);
        try {
            const formData = await request.formData();
            const payment_status = formData.get('payment_status');
            const response = await axiosInstance.patch(
                `${API_PARKING_MANAGER_ROOT}${API_ESTABLISHMENT_ENTRY_VALIDATE}`,
                {
                    qr_content: params.transaction_id,
                    payment_status
                },
                {
                    headers: {
                        Authorization: cookiesObject.Authorization,
                        'X-CSRF-TOKEN': cookiesObject['X-CSRF-TOKEN'],
                        csrf_refresh_token: cookiesObject.csrf_refresh_token,
                        refresh_token_cookie: cookiesObject.refresh_token_cookie
                    }
                }
            );

            return { status: response.status, data: response.data };
        } catch (error) {
            if (isAxiosError(error)) {
                return fail(500, { error: error.response?.data });
            }
            return fail(500, { error: 'Failed to validate transaction' });
        }
    }
};
