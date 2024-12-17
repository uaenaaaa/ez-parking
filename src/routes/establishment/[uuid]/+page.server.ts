import type { PageServerLoad } from './slot/$types.js';
import {
    API_ESTABLISHMENT_ROOT,
    API_ESTABLISHMENT_VIEW
} from '$env/static/private';
import axiosInstance from '$lib/utils/function/validators/axios-config.js';
import { fail } from '@sveltejs/kit';
import { isAxiosError } from 'axios';

export const load: PageServerLoad = async ({ params }) => {
    try {
        const response = await axiosInstance.get(
            `${API_ESTABLISHMENT_ROOT}${API_ESTABLISHMENT_VIEW}`,
            {
                params: {
                    establishment_uuid: params.uuid
                }
            }
        );

        return {
            success: true,
            data: response.data
        };
    } catch (error) {
        if (isAxiosError(error)) {
            return fail(500, { error: error.response?.data });
        }
        return fail(500, {
            error: "An error occurred while fetching the establishment's details."
        });
    }
};
