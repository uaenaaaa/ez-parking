import type { Actions } from '@sveltejs/kit';
import { httpsAgent } from '$lib/server/http-config';
import axios from 'axios';
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

export const actions: Actions = {
	default: async ({ request }) => {
		try {
			const formData = await request.formData();
			const axiosObj = axios.create({
				baseURL: API_BASE_URL,
				httpsAgent
			});
			const PARKINGSPACETYPE = ['indoor', 'outdoor', 'covered', 'uncovered'];
			const ACCESSINFORMATION = [
				'gate_code',
				'key_pickup',
				'no_special_access',
				'other',
				'security_check'
			];
			const SPACELAYOUT = ['parallel', 'perpendicular', 'angled', 'other'];
			const maxFileSize = 5 * 1024 * 1024;
			const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];

			const companyRegNumber = formData.get('companyRegNumber') as string;
			const companyName = formData.get('companyName') as string;

			// Basic form data
			const ownerType = formData.get('ownerType') as string;
			const firstName = formData.get('firstName') as string;
			const lastName = formData.get('lastName') as string;
			const middleName = formData.get('middleName') as string;
			const suffix = formData.get('suffix') as string;
			const email = formData.get('email') as string;
			const contactNumber = formData.get('contactNumber') as string;
			const tin = formData.get('tin') as string;

			// Location Data
			const streetAddress = formData.get('streetAddress') as string;
			const barangay = formData.get('barangay') as string;
			const city = formData.get('city') as string;
			const province = formData.get('province') as string;
			const postalCode = formData.get('postalCode') as string;
			const longitude = formData.get('longitude') as string;
			const latitude = formData.get('latitude') as string;
			const landmarks = formData.get('landmarks') as string;

			// Facilities and Amenities
			const accessInformation = formData.get('accessInformation') as string;
			const spaceType = formData.get('spaceType') as string;
			const spaceLayout = formData.get('spaceLayout') as string;
			const spaceDimensions = formData.get('spaceDimensions') as string;
			const lightingAndSecurity = formData.get('lightingAndSecurity') as string;
			const accessibility = formData.get('accessibility') as string;
			const nearbyFacilities = formData.get('nearbyFacilities') as string;

			// Operating hours
			const operatingHours = {
				monday: {
					enabled: String(formData.get('monday.enabled')).toLowerCase() === 'true',
					open: formData.get('monday.open') as string,
					close: formData.get('monday.close') as string
				},
				tuesday: {
					enabled: String(formData.get('tuesday.enabled')).toLowerCase() === 'true',
					open: formData.get('tuesday.open') as string,
					close: formData.get('tuesday.close') as string
				},
				wednesday: {
					enabled: String(formData.get('wednesday.enabled')).toLowerCase() === 'true',
					open: formData.get('wednesday.open') as string,
					close: formData.get('wednesday.close') as string
				},
				thursday: {
					enabled: String(formData.get('thursday.enabled')).toLowerCase() === 'true',
					open: formData.get('thursday.open') as string,
					close: formData.get('thursday.close') as string
				},
				friday: {
					enabled: String(formData.get('friday.enabled')).toLowerCase() === 'true',
					open: formData.get('friday.open') as string,
					close: formData.get('friday.close') as string
				},
				saturday: {
					enabled: String(formData.get('saturday.enabled')).toLowerCase() === 'true',
					open: formData.get('saturday.open') as string,
					close: formData.get('saturday.close') as string
				},
				sunday: {
					enabled: String(formData.get('sunday.enabled')).toLowerCase() === 'true',
					open: formData.get('sunday.open') as string,
					close: formData.get('sunday.close') as string
				}
			};

			const scheduleErrors = validateSchedule(operatingHours);
			if (scheduleErrors.length > 0) {
				return fail(400, {
					success: false,
					errors: {
						schedule: scheduleErrors
					}
				});
			}
			const cash = formData.get('cash') === 'true';
			const mobile = formData.get('mobile') === 'true';
			const otherPayment = formData.get('otherPayment') as string;
			const pricing = {
				hourly: {
					enabled: String(formData.get('hourly.enabled')).toLowerCase() === 'true',
					rate: parseFloat(formData.get('hourly.rate') as string)
				},
				daily: {
					enabled: String(formData.get('daily.enabled')).toLowerCase() === 'true',
					rate: parseFloat(formData.get('daily.rate') as string)
				},
				monthly: {
					enabled: String(formData.get('monthly.enabled')).toLowerCase() === 'true',
					rate: parseFloat(formData.get('monthly.rate') as string)
				}
			};

			const pricingErrors = validatePricing(pricing);
			if (pricingErrors.length > 0) {
				return fail(400, {
					success: false,
					errors: {
						pricing: pricingErrors
					}
				});
			}

			// Files validation
			const govId = formData.get('govId') as File;
			const parkingPhotos = formData.get('parkingPhotos') as File;
			const proofOfOwnership = formData.get('proofOfOwnership') as File;
			const birCert = formData.get('birCert') as File;
			const liabilityInsurance = formData.get('liabilityInsurance') as File;
			const businessCert = formData.get('businessCert') as File;

			const filesValid = [govId, parkingPhotos, proofOfOwnership, birCert].every((file) =>
				validateFile(file, allowedFileTypes[0], maxFileSize)
			);
			if (!filesValid) {
				fail(400, { success: false, error: 'Invalid file type or size' });
			}
			if (new RegExp(/^[0-9]{3}-[0-9]{3}-[0-9]{3}-[0-9]{3}$/).test(tin) === false) {
				fail(400, { success: false, error: 'Invalid TIN format' });
			}

			const COMMON_REQUEST_BODY = {
				first_name: firstName,
				last_name: lastName,
				middle_name: middleName,
				suffix: suffix,
				email,
				contact_number: contactNumber,
				tin,
				street_address: streetAddress,
				barangay,
				city,
				province,
				postal_code: postalCode,
				landmarks,
				access_information: accessInformation,
				space_type: spaceType,
				space_layout: spaceLayout,
				space_dimensions: spaceDimensions,
				lighting_and_security: lightingAndSecurity,
				accessibility,
				nearby_facilities: nearbyFacilities,
				operating_hours: operatingHours,
				cash,
				mobile,
				other_payment: otherPayment,
				pricing,
				longitude,
				latitude,
				document: [
					{
						name: 'gov_id',
						file: govId
					},
					{
						name: 'parking_photos',
						file: parkingPhotos
					},
					{
						name: 'proof_of_ownership',
						file: proofOfOwnership
					},
					{
						name: 'bir_cert',
						file: birCert
					},
					{
						name: 'liability_insurance',
						file: liabilityInsurance
					},
					{
						name: 'business_cert',
						file: businessCert
					}
				]
			};
			const COMPANY_SPECIFIC_REQUEST_BODY = {
				company_name: companyName,
				company_registration_number: companyRegNumber
			}
			if (ownerType == 'individual') {
				const response = await axiosObj.post(API_PARKING_MANAGER_INDIVIDUAL_ACCOUNT_CREATE, COMMON_REQUEST_BODY);
				return {
					success: true,
					data: response.data
				};

			} else if (ownerType == 'company') {
				const response = await axiosObj.post(API_PARKING_MANAGER_COMPANY_ACCOUNT_CREATE, {
					...COMMON_REQUEST_BODY,
					...COMPANY_SPECIFIC_REQUEST_BODY
				});
				return {
					success: true,
					data: response.data
				};
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
