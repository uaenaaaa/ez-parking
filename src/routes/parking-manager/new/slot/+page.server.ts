import type { PageServerLoad } from './$types';
import axiosInstance from '$lib/utils/function/validators/axios-config';

export const load: PageServerLoad = async () => {
    try {
        const response = await axiosInstance.get(
            'https://localhost:5000/api/v1/vehicle-type/get-all-vehicle-types'
        );

        return {
            vehicleTypes: response.data
        };
    } catch {
        return {
            vehicleTypes: null,
            error: 'Failed to load data'
        };
    }
};
