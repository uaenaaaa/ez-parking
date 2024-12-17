import type { Actions } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import {
    API_ESTABLISHMENT_ROOT,
    API_ESTABLISHMENT_QUERY
} from '$env/static/private';
import axiosInstance from '$lib/utils/function/validators/axios-config';
import { isAxiosError } from 'axios';

export const actions: Actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        try {
            const response = await axiosInstance.get(
                `${API_ESTABLISHMENT_ROOT}${API_ESTABLISHMENT_QUERY}`,
                {
                    params: {
                        user_longitude: Number(data.get('user_longitude')),
                        user_latitude: Number(data.get('user_latitude')),
                        establishment_name: data.get(
                            'establishment_name'
                        ) as string
                    }
                }
            );
            console.log(response.data);
            return { status: 200, data: response.data.establishments };
        } catch (error) {
            if (isAxiosError(error)) {
                return fail(500, { error: error.response?.data });
            }
            return fail(401, {
                success: false,
                message: 'Invalid credentials'
            });
        }
    }
};
