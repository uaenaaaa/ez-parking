import type { PageServerLoad } from './$types';
import axiosInstance from '$lib/utils/function/validators/axios-config';
import { API_USER_AUTH_ROOT, API_USER_PROFILE, API_UPDATE_USER_PROFILE } from '$env/static/private';
import credentialsManager from '$lib/utils/function/credentials-manager';
import { isAxiosError } from 'axios';
import { fail, type Actions } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies }) => {
    try {
        const cookiesObj = credentialsManager(cookies);
        const response = await axiosInstance.get(`${API_USER_AUTH_ROOT}${API_USER_PROFILE}`, {
            headers: {
                Authorization: cookiesObj.Authorization,
                'X-CSRF-TOKEN': cookiesObj['X-CSRF-TOKEN'],
                csrf_refresh_token: cookiesObj.csrf_refresh_token,
                refresh_token_cookie: cookiesObj.refresh_token_cookie
            }
        });
        return {
            success: true,
            data: response.data.message
        };
    } catch (error) {
        if (isAxiosError(error)) {
            return fail(500, { error: error.response?.data });
        }
        return fail(500, { error: 'Failed to fetch user profile' });
    }
};

export const actions: Actions = {
    default: async ({ cookies, request }) => {
        try {
            const cookiesObject = credentialsManager(cookies);
            const formData = await request.formData();
            const firstName = formData.get('firstName') as string;
            const lastName = formData.get('lastName') as string;
            const middleName = formData.get('middleName') as string;
            const nickname = formData.get('nickname') as string;
            const suffix = formData.get('suffix') as string;
            const phoneNumber = formData.get('phoneNumber') as string;
            const response = await axiosInstance.patch(
                `${API_USER_AUTH_ROOT}${API_UPDATE_USER_PROFILE}`,
                {
                    first_name: firstName,
                    last_name: lastName,
                    middle_name: middleName,
                    nickname,
                    suffix,
                    phone_number: phoneNumber
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
            return {
                success: true,
                data: response.data.message
            };
        } catch (error) {
            if (isAxiosError(error)) {
                return fail(500, { success: false, message: error.response?.data });
            }
            return fail(500, { success: false, message: 'Failed to update user profile' });
        }
    }
};
