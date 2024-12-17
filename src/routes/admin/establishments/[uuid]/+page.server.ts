import type { PageServerLoad } from './$types';
import axiosInstance from '$lib/utils/function/validators/axios-config';
import credentialsManager from '$lib/utils/function/credentials-manager';
import {
    API_GET_PARKING_ESTABLISHMENT,
    API_ADMIN_ROOT,
    API_VEHICLE_TYPE_GET_ALL_VEHICLE_TYPES,
    API_SLOTS_ROOT,
    API_ADD_NEW_SLOT
} from '$env/static/private';
import { isAxiosError } from 'axios';
import { fail, type Actions } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, cookies }) => {
    try {
        const credentials = credentialsManager(cookies);
        const establishment = await axiosInstance.get(
            `${API_ADMIN_ROOT}${API_GET_PARKING_ESTABLISHMENT}?establishment_uuid=${params.uuid}`,
            {
                headers: {
                    Authorization: credentials.Authorization,
                    'X-CSRF-TOKEN': credentials['X-CSRF-TOKEN'],
                    csrf_refresh_token: credentials.csrf_refresh_token,
                    refresh_token_cookie: credentials.refresh_token_cookie
                },
                withCredentials: true
            }
        );
        const vehicleTypes = await axiosInstance.get(
            `${API_ADMIN_ROOT}${API_VEHICLE_TYPE_GET_ALL_VEHICLE_TYPES}`,
            {
                headers: {
                    Authorization: credentials.Authorization,
                    'X-CSRF-TOKEN': credentials['X-CSRF-TOKEN'],
                    csrf_refresh_token: credentials.csrf_refresh_token,
                    refresh_token_cookie: credentials.refresh_token_cookie
                },
                withCredentials: true
            }
        );
        return {
            success: true,
            response: {
                establishment: establishment.data,
                vehicleTypes: vehicleTypes.data
            }
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

export const actions: Actions = {
    default: async ({ request, cookies, params }) => {
        const formData = await request.formData();
        const vehicleTypeId = formData.get('vehicle_type_id');
        const slotCode = formData.get('slot_code');
        const slotFeatures = formData.get('slot_features');
        const slotStatus = formData.get('slot_status');
        const isActive = formData.get('is_active') === 'true';
        const establishmentUuid = params.uuid;
        const baseRate = formData.get('base_rate');
        const slotMultiplier = formData.get('slot_multiplier');
        const floorLevel = formData.get('floor_level');
        const isPremium = formData.get('is_premium') === 'true';
        const credentials = credentialsManager(cookies);
        try {
            const response = await axiosInstance.post(
                `${API_SLOTS_ROOT}${API_ADD_NEW_SLOT}`,
                {
                    vehicle_type_id: vehicleTypeId,
                    slot_code: slotCode,
                    slot_features: slotFeatures,
                    slot_status: slotStatus,
                    is_active: isActive,
                    establishment_uuid: establishmentUuid,
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
                    },
                    withCredentials: true
                }
            );
            console.log(response);
            return {
                status: 'success',
                body: response.data
            };
        } catch (error) {
            console.log(error);
            if (isAxiosError(error)) {
                return fail(400, {
                    error: error.response?.data.message || 'Failed to add new slot'
                });
            }
            return {
                status: 500,
                body: 'Failed to add new slot'
            };
        }
    }
};
