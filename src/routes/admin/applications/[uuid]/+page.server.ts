import type { PageServerLoad } from './$types';
import axiosInstance from '$lib/utils/function/validators/axios-config';
import credentialsManager from '$lib/utils/function/credentials-manager';
import { API_GET_PARKING_ESTABLISHMENT, API_ADMIN_ROOT } from '$env/static/private';
import { isAxiosError } from 'axios';

export const load: PageServerLoad = async ({ params, cookies }) => {
    try {
        const credentials = credentialsManager(cookies);
        const { data } = await axiosInstance.get(
            `${API_ADMIN_ROOT}${API_GET_PARKING_ESTABLISHMENT}?establishment_uuid=${params.uuid}`,
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
            establishment: data.data
        };
    } catch (error) {
        if (isAxiosError(error)) {
            return {
                success: false,
                message: error.response?.data.message || 'Failed to fetch data'
            };
        }
    }
};
