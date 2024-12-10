import type { Actions } from '@sveltejs/kit';
import axiosInstance from '$lib/utils/function/validators/axios-config';
import validateFile from '$lib/utils/function/validators/files-validators';
import { fail } from '@sveltejs/kit';
import {
    API_PARKING_MANAGER_INDIVIDUAL_ACCOUNT_CREATE,
    API_PARKING_MANAGER_COMPANY_ACCOUNT_CREATE,
    API_PARKING_MANAGER_ROOT,
    API_BASE_URL
} from '$env/static/private';
import { validateSchedule } from '$lib/utils/function/validators/schedule-validator';
import { validatePricing } from '$lib/utils/function/validators/pricing-validator';
import newParkingManagerRequestBody from '$lib/utils/function/parking-manager-request-body';

export const actions: Actions = {
    default: async ({ request }) => {
        try {
            const formData = await request.formData();
            const REQUEST_BODY = newParkingManagerRequestBody(formData);
            const OWNER_TYPE = formData.get('ownerType') as string;
            const MAX_FILE_SIZE = 5 * 1024 * 1024;
            const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];

            const SIGN_UP_BODY =
                OWNER_TYPE === 'individual'
                    ? { ...REQUEST_BODY, ownerInfo: REQUEST_BODY.ownerInfo.individual }
                    : { ...REQUEST_BODY, ownerInfo: REQUEST_BODY.ownerInfo.company };

            const PARKING_SPACE_TYPE = ['indoor', 'outdoor', 'covered', 'uncovered'];
            if (!PARKING_SPACE_TYPE.includes(SIGN_UP_BODY.parkingDetails.space_type)) {
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
            if (!ACCESS_INFORMATION.includes(SIGN_UP_BODY.parkingDetails.access_information)) {
                return fail(400, {
                    success: false,
                    error: 'Invalid access information'
                });
            }
            const SPACE_LAYOUT = ['parallel', 'perpendicular', 'angled', 'other'];
            if (!SPACE_LAYOUT.includes(SIGN_UP_BODY.parkingDetails.space_layout)) {
                return fail(400, {
                    success: false,
                    error: 'Invalid space layout'
                });
            }

            if (!SIGN_UP_BODY.parkingDetails.is_24_7) {
                const scheduleErrors = validateSchedule(SIGN_UP_BODY.operatingHours);
                if (scheduleErrors.length > 0) {
                    return fail(400, {
                        success: false,
                        errors: {
                            schedule: scheduleErrors
                        }
                    });
                }
            }

            const pricingErrors = validatePricing(SIGN_UP_BODY.paymentInfo.pricing);
            if (pricingErrors.length > 0) {
                return fail(400, {
                    success: false,
                    errors: {
                        pricing: pricingErrors
                    }
                });
            }

            const filesValid = SIGN_UP_BODY.documents.document.every((file) =>
                validateFile(file.file, ALLOWED_FILE_TYPES[0], MAX_FILE_SIZE)
            );
            if (!filesValid) {
                fail(400, { success: false, error: 'Invalid file type or size' });
            }
            if (
                new RegExp(/^[0-9]{3}-[0-9]{3}-[0-9]{3}-[0-9]{3}$/).test(
                    SIGN_UP_BODY.contactInfo.tax_identification_number
                ) === false
            ) {
                fail(400, { success: false, error: 'Invalid TIN format' });
            }

            if (OWNER_TYPE == 'individual') {
                console.log('Individual:', SIGN_UP_BODY);
                console.log('fILES:', SIGN_UP_BODY.documents.document);
            } else if (OWNER_TYPE == 'company') {
                console.log('Company:', SIGN_UP_BODY);
            } else {
                return fail(400, { success: false, error: 'Invalid owner type' });
            }
        } catch (error) {
            console.error('Registration error:', error);
            return {
                success: false,
                error: 'Registration failed. Please try again.'
            };
        }
    }
};
