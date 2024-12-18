import type { PageServerLoad } from './$types.js';
import {
    API_TRANSACTION_ROOT,
    API_TRANSACTION_GET_ESTABLISHMENT_INFO_SLOT_FORM,
    API_TRANSACTION_CREATE_TRANSACTION
} from '$env/static/private';
import credentialsManager from '$lib/utils/function/credentials-manager.js';
import axiosInstance from '$lib/utils/function/validators/axios-config.js';
import { fail, type Actions } from '@sveltejs/kit';
import { isAxiosError } from 'axios';

export const load: PageServerLoad = async ({ params, cookies }) => {
    const cookieObject = credentialsManager(cookies);
    try {
        const response = await axiosInstance.get(
            `${API_TRANSACTION_ROOT}${API_TRANSACTION_GET_ESTABLISHMENT_INFO_SLOT_FORM}`,
            {
                params: {
                    establishment_uuid: params.uuid,
                    slot_uuid: params.slot_uuid
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
            return fail(300, { message: 'Either the establishment or the slot does not exist' });
        }
    }
};

export const actions: Actions = {
    default: async ({ params, request, cookies }) => {
        const cookiesObject = credentialsManager(cookies);
        try {
            const formData = await request.formData();
            const terms = formData.get('terms') === 'true';
            const agreed = formData.get('agreed') === 'true';
            const slot_uuid = params.slot_uuid;
            const duration = Number(formData.get('duration'));
            const duration_type = formData.get('pricingType');
            const amount_due = Number(formData.get('amountDue'));
            if (!terms || !agreed) {
                return fail(400, { message: 'Please agree to the terms and conditions' });
            }

            const response = await axiosInstance.post(
                `${API_TRANSACTION_ROOT}${API_TRANSACTION_CREATE_TRANSACTION}`,
                {
                    slot_uuid,
                    duration,
                    duration_type,
                    amount_due
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
            return { success: true, data: response.data };
        } catch (error) {
            if (isAxiosError(error)) {
                return fail(500, { error: error.response?.data });
            }
            return fail(500, { error: 'Failed to create transaction' });
        }
    }
};
