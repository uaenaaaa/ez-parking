import type { Actions } from '@sveltejs/kit';
import axiosInstance from '$lib/utils/function/validators/axios-config';
import validateFile from '$lib/utils/function/validators/files-validators';
import { fail } from '@sveltejs/kit';
import {
    API_PARKING_MANAGER_INDIVIDUAL_ACCOUNT_CREATE,
    API_PARKING_MANAGER_COMPANY_ACCOUNT_CREATE,
    API_PARKING_MANAGER_ROOT
} from '$env/static/private';
import {
    validateSchedule,
    type OperatingHours
} from '$lib/utils/function/validators/schedule-validator';
import {
    validatePricing,
    type PricingConfig
} from '$lib/utils/function/validators/pricing-validator';
import buildRequestPayload from '$lib/utils/function/request-builder';
import { email } from '$lib/state/account-email-registration-data';

export const actions: Actions = {
    default: async ({ request }) => {
        try {
            const formData = await request.formData();
            const { signUpData, files } = buildRequestPayload(formData);
            const OWNER_TYPE = (formData.get('ownerType') as string).toLowerCase();
            const MAX_FILE_SIZE = 5 * 1024 * 1024;
            const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];
            const ZONING_COMPLIANCE = formData.get('zoningCompliance') === 'true';
            if (OWNER_TYPE === 'company') {
                if (!formData.has('companyName')) {
                    return fail(400, {
                        success: false,
                        error: 'Company name is required'
                    });
                }
                if (!formData.has('companyRegistrationNumber')) {
                    return fail(400, {
                        success: false,
                        error: 'Company registration number is required'
                    });
                }
                signUpData.user.first_name = '';
                signUpData.user.last_name = '';
                signUpData.user.suffix = '';
                signUpData.user.middle_name = '';
            } else {
                if (!formData.has('firstName')) {
                    return fail(400, {
                        success: false,
                        error: 'First name is required'
                    });
                }
                if (!formData.has('lastName')) {
                    return fail(400, {
                        success: false,
                        error: 'Last name is required'
                    });
                }
                signUpData.company_profile.company_name = '';
                signUpData.company_profile.company_reg_number = '';
            }

            if (!ZONING_COMPLIANCE) {
                return fail(400, {
                    success: false,
                    error: 'Zoning compliance is required'
                });
            }
            const filesValid = files
                .getAll('files')
                .every(
                    (file) =>
                        file instanceof File &&
                        validateFile(file, ALLOWED_FILE_TYPES, MAX_FILE_SIZE)
                );
            if (!filesValid) {
                fail(400, { success: false, error: 'Invalid file type or size' });
            }
            files.append('sign_up_data', JSON.stringify(signUpData));

            const PARKING_SPACE_TYPE = ['indoor', 'outdoor', 'covered', 'uncovered'];
            if (!PARKING_SPACE_TYPE.includes(signUpData.parking_establishment.space_type)) {
                return fail(400, {
                    success: false,
                    error: 'Invalid parking space type'
                });
            }
            const ACCESS_INFORMATION = [
                'gate_code',
                'key_pickup',
                'no_special_access',
                'other',
                'security_check'
            ];
            if (!ACCESS_INFORMATION.includes(signUpData.parking_establishment.access_info)) {
                return fail(400, {
                    success: false,
                    error: 'Invalid access information'
                });
            }
            const SPACE_LAYOUT = ['parallel', 'perpendicular', 'angled', 'other'];
            if (!SPACE_LAYOUT.includes(signUpData.parking_establishment.space_layout)) {
                return fail(400, {
                    success: false,
                    error: 'Invalid space layout'
                });
            }

            if (!signUpData.parking_establishment.is24_7) {
                const scheduleErrors = validateSchedule(
                    signUpData.operating_hour as unknown as Record<string, OperatingHours>
                );
                if (scheduleErrors.length > 0) {
                    return fail(400, {
                        success: false,
                        errors: {
                            schedule: scheduleErrors
                        }
                    });
                }
            }

            const pricingErrors = validatePricing(
                signUpData.pricing_plan as unknown as Record<string, PricingConfig>
            );
            if (pricingErrors.length > 0) {
                return fail(400, {
                    success: false,
                    errors: {
                        pricing: pricingErrors
                    }
                });
            }

            if (
                new RegExp(/^[0-9]{3}-[0-9]{3}-[0-9]{3}-[0-9]{3}$/).test(
                    signUpData.company_profile.tin
                ) === false
            ) {
                fail(400, { success: false, error: 'Invalid TIN format' });
            }

            const response = axiosInstance.post(
                `${API_PARKING_MANAGER_ROOT}${
                    OWNER_TYPE === 'individual'
                        ? API_PARKING_MANAGER_INDIVIDUAL_ACCOUNT_CREATE
                        : API_PARKING_MANAGER_COMPANY_ACCOUNT_CREATE
                }`,
                files,
                {
                    headers: { 'Content-Type': 'multipart/form-data' }
                }
            );
            email.set(formData.get('email') as string);
            return (await response).data;
        } catch (error) {
            console.error('Registration error:', error);
            return {
                success: false,
                error: 'Registration failed. Please try again.'
            };
        }
    }
};
