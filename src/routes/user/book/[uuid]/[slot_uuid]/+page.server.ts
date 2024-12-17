import type { PageServerLoad } from './$types.js';
import {
    API_TRANSACTION_ROOT,
    API_TRANSACTION_GET_ESTABLISHMENT_INFO_SLOT_FORM
} from '$env/static/private';
import credentialsManager from '$lib/utils/function/credentials-manager.js';
import axiosInstance from '$lib/utils/function/validators/axios-config.js';

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
                },
                withCredentials: true
            }
        );
        return response.data;
    } catch (error) {
        console.error('Failed to fetch transaction details:', error);
    }
};
