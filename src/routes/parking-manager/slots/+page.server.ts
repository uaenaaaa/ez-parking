import type { PageServerLoad } from './$types';
import credentialsManager from '$lib/utils/function/credentials-manager';
import axiosInstance from '$lib/utils/function/validators/axios-config';
import {
    API_PARKING_MANAGER_ROOT,
    API_PARKING_MANAGER_GET_ALL_SLOTS,
    API_VEHICLE_TYPE_GET_ALL_VEHICLE_TYPES,
    API_PARKING_MANAGER_CREATE_SLOT
} from '$env/static/private';
import { fail } from '@sveltejs/kit';
import { isAxiosError } from 'axios';
import type { Actions } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies }) => {
    const cookiesObject = credentialsManager(cookies);
    try {
        const response = await axiosInstance.get(
            `${API_PARKING_MANAGER_ROOT}${API_PARKING_MANAGER_GET_ALL_SLOTS}`,
            {
                headers: {
                    Authorization: cookiesObject.Authorization,
                    'X-CSRF-TOKEN': cookiesObject['X-CSRF-TOKEN'],
                    csrf_refresh_token: cookiesObject.csrf_refresh_token,
                    refresh_token_cookie: cookiesObject.refresh_token_cookie
                }
            }
        );

        const vehicleTypes = await axiosInstance.get(
            `${API_PARKING_MANAGER_ROOT}${API_VEHICLE_TYPE_GET_ALL_VEHICLE_TYPES}`,
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
            data: { slots: response.data.data, vehicleTypes: vehicleTypes.data.data }
        };
    } catch (error) {
        if (isAxiosError(error)) {
            return fail(
                error.response?.status || 500,
                error.response?.data || 'Internal Server Error'
            );
        }
        return fail(500, { error: 'Internal Server Error' });
    }
};

export const actions: Actions = {
    default: async ({ request, cookies }) => {
        const formData = await request.formData();
        const vehicleTypeId = formData.get('vehicle_type_id');
        const slotCode = formData.get('slot_code');
        const slotFeatures = formData.get('slot_features');
        const slotStatus = formData.get('slot_status');
        const isActive = formData.get('is_active') === 'true';
        const baseRate = formData.get('base_rate');
        const slotMultiplier = formData.get('slot_multiplier');
        const floorLevel = formData.get('floor_level');
        const isPremium = formData.get('is_premium') === 'true';
        const credentials = credentialsManager(cookies);
        try {
            const response = await axiosInstance.post(
                `${API_PARKING_MANAGER_ROOT}${API_PARKING_MANAGER_CREATE_SLOT}`,
                {
                    vehicle_type_id: vehicleTypeId,
                    slot_code: slotCode,
                    slot_features: slotFeatures,
                    slot_status: slotStatus,
                    is_active: isActive,
                    base_rate: baseRate,
                    slot_multiplier: slotMultiplier,
                    floor_level: floorLevel,
                    is_premium: isPremium
                },
                {
                    headers: {
                        Authorization: credentials.Authorization,
                        'X-CSRF-TOKEN': credentials['X-CSRF-TOKEN'],
                        csrf_refresh_token: credentials.csrf_refresh_token,
                        refresh_token_cookie: credentials.refresh_token_cookie
                    }
                }
            );
            console.log(response);
            return {
                status: 'success',
                body: response.data
            };
        } catch (error) {
            if (isAxiosError(error)) {
                return fail(400, {
                    error: error.response?.data.message || 'Failed to add new slot'
                });
            }
            return fail(500, { error: 'Internal Server Error' });
        }
    }
};
