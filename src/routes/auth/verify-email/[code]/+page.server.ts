import type { PageServerLoad } from './$types';
import { API_AUTH_VERIFY_EMAIL, API_AUTH_ROOT } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import axiosInstance from '$lib/utils/function/validators/axios-config';

export const load: PageServerLoad = async ({ params }) => {
    axiosInstance.patch(`${API_AUTH_ROOT}${API_AUTH_VERIFY_EMAIL}`, {
        verification_token: params.code
    });
    redirect(303, '/');
};
