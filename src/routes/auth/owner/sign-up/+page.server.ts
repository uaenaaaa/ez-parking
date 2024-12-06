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
			const PARKINGSPACETYPE = ['indoor', 'outdoor', 'covered', 'uncovered'];
			const ACCESSINFORMATION = [
				'gate_code',
				'key_pickup',
				'no_special_access',
				'other',
				'security_check'
			];
			const SPACELAYOUT = ['parallel', 'perpendicular', 'angled', 'other'];
			const formData = await request.formData();

			// Basic form data
			const ownerType = formData.get('ownerType') as string;
			const firstName = formData.get('firstName') as string;
			const lastName = formData.get('lastName') as string;
			const middleName = formData.get('middleName') as string;
			const suffix = formData.get('suffix') as string;
			const companyName = formData.get('companyName') as string;
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

			// Files validation
			const govId = formData.get('govId') as File;
			const parkingPhotos = formData.get('parkingPhotos') as File;
			const proofOfOwnership = formData.get('proofOfOwnership') as File;
			const birCert = formData.get('birCert') as File;
			const liabilityInsurance = formData.get('liabilityInsurance') as File;
			const businessCert = formData.get('businessCert') as File;

			// Validate required files
			const maxFileSize = 5 * 1024 * 1024;
			const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];

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
					enabled: formData.get('monday.enabled') === 'true',
					open: formData.get('monday.open') as string,
					close: formData.get('monday.close') as string
				},
				tuesday: {
					enabled: formData.get('tuesday.enabled') === 'true',
					open: formData.get('tuesday.open') as string,
					close: formData.get('tuesday.close') as string
				},
				wednesday: {
					enabled: formData.get('wednesday.enabled') === 'true',
					open: formData.get('wednesday.open') as string,
					close: formData.get('wednesday.close') as string
				},
				thursday: {
					enabled: formData.get('thursday.enabled') === 'true',
					open: formData.get('thursday.open') as string,
					close: formData.get('thursday.close') as string
				},
				friday: {
					enabled: formData.get('friday.enabled') === 'true',
					open: formData.get('friday.open') as string,
					close: formData.get('friday.close') as string
				},
				saturday: {
					enabled: formData.get('saturday.enabled') === 'true',
					open: formData.get('saturday.open') as string,
					close: formData.get('saturday.close') as string
				},
				sunday: {
					enabled: formData.get('sunday.enabled') === 'true',
					open: formData.get('sunday.open') as string,
					close: formData.get('sunday.close') as string
				}
			};
			const cash = formData.get('cash') === 'true';
			const mobile = formData.get('mobile') === 'true';
			const otherPayment = formData.get('otherPayment') as string;
			const pricing = {
				hourly: {
					enabled: formData.get('hourly.enabled') === 'true',
					rate: parseFloat(formData.get('hourly.rate') as string)
				},
				daily: {
					enabled: formData.get('daily.enabled') === 'true',
					rate: parseFloat(formData.get('daily.rate') as string)
				},
				monthly: {
					enabled: formData.get('monthly.enabled') === 'true',
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

			const filesValid = [govId, parkingPhotos, proofOfOwnership, birCert].every((file) =>
				validateFile(file, allowedFileTypes[0], maxFileSize)
			);
			if (!filesValid) {
				fail(400, { success: false, error: 'Invalid file type or size' });
			}
			if (new RegExp(/^[0-9]{3}-[0-9]{3}-[0-9]{3}-[0-9]{3}$/).test(tin) === false) {
				fail(400, { success: false, error: 'Invalid TIN format' });
			}

			const scheduleErrors = validateSchedule(operatingHours);
			if (scheduleErrors.length > 0) {
				return fail(400, {
					success: false,
					errors: {
						schedule: scheduleErrors
					}
				});
			}
			const COMMON_REQUEST_BODY = {
				first_name: firstName,
				last_name: lastName,
				middle_name: middleName,
				suffix: suffix,
				email,
				contact_number: contactNumber
			};
			if (ownerType == 'individual') {
				// Request for individual account creation
				const requestBody = {
					first_name: firstName,
					last_name: lastName,
					middle_name: middleName,
					suffix: suffix
				};
			} else if (ownerType == 'company') {
				if (companyName === '') {
					fail(400, { success: false, error: 'Company name is required' });
				}
			}

			// Structure the data
			const ownerData = {
				ownerType,
				companyName,
				tin,
				contact: {
					email,
					phone: contactNumber
				},
				documents: {
					govId,
					parkingPhotos,
					proofOfOwnership,
					birCert,
					liabilityInsurance,
					businessCert
				},
				location: {
					street: formData.get('streetAddress'),
					barangay: formData.get('barangay'),
					city: formData.get('city'),
					province: formData.get('province'),
					postalCode: formData.get('postalCode')
				},
				parkingDetails: {
					type: formData.get('spaceType') as string as 'open' | 'covered' | 'underground',
					layout: formData.get('spaceLayout'),
					dimensions: formData.get('spaceDimensions'),
					photos: parkingPhotos
				}
			};

			// TODO: Add API call to save data
			// const response = await axios.post('/api/owners/register', ownerData, { httpsAgent });
			console.log('Owner data:', ownerData);
			return {
				success: true,
				data: {
					ownerData
				}
			};
		} catch (error) {
			console.error('Registration error:', error);
			return {
				success: false,
				error: 'Registration failed. Please try again.'
			};
		}
	}
};
