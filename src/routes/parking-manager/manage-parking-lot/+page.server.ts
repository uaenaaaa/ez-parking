import type { PageServerLoad } from './$types';
import credentialsManager from '$lib/utils/function/credentials-manager';
import axiosInstance from '$lib/utils/function/validators/axios-config';

export const load: PageServerLoad = async ({ cookies }) => {
    const cookiesObject = credentialsManager(cookies);
    try {
        const response = await axiosInstance.get(
            'https://localhost:5000/api/v1/parking-manager/get-all-establishments-info',
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
            establishmentInfo: response.data
        };
    } catch {
        return {
            establishmentInfo: null,
            error: 'Failed to load data'
        };
    }
};
