import type { PageServerLoad } from './$types';
import { API_TRANSACTION_ROOT, API_TRANSACTION_ALL_TRANSACTIONS } from '$env/static/private';
import credentialsManager from '$lib/utils/function/credentials-manager';
import axiosInstance from '$lib/utils/function/validators/axios-config';

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
                },
                withCredentials: true
            }
        );

        console.log(response.data);
        return { success: true, data: response.data.transactions };
    } catch (error) {
        console.error('Failed to fetch transactions:', error);
        throw new Error('Failed to fetch transactions');
    }
};
