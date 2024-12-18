import type { PageServerLoad } from './$types';
import axiosInstance from '$lib/utils/function/validators/axios-config';
import { API_ESTABLISHMENT_ROOT, API_ESTABLISHMENT_GET_DOCUMENT } from '$env/static/private';
import credentialsManager from '$lib/utils/function/credentials-manager';
export const load: PageServerLoad = async ({ cookies, params }) => {
    try {
        const credentials = credentialsManager(cookies);
        const response = await axiosInstance.get(
            `${API_ESTABLISHMENT_ROOT}${API_ESTABLISHMENT_GET_DOCUMENT}?document_uuid=${params.uuid}`,
            {
                headers: {
                    Authorization: credentials.Authorization,
                    'X-CSRF-TOKEN': credentials['X-CSRF-TOKEN'],
                    csrf_refresh_token: credentials.csrf_refresh_token,
                    refresh_token_cookie: credentials.refresh_token_cookie
                },
                responseType: 'arraybuffer'
            }
        );

        const base64String = btoa(
            new Uint8Array(response.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ''
            )
        );

        return {
            fileData: base64String,
            contentType: response.headers['content-type']
        };
    } catch (error) {
        return {
            status: 404,
            error: 'Document not found'
        };
    }
};
