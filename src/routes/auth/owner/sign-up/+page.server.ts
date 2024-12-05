import type { Actions } from '@sveltejs/kit';
import { httpsAgent } from '$lib/server/http-config';
import axios from 'axios';
import validateFile from '$lib/utils/function/validators/files-validators';
import { fail } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request }) => {
		try {
			const formData = await request.formData();

			// Basic form data
			const ownerType = formData.get('ownerType') as string;
			const businessName = formData.get('businessName') as string;
			const email = formData.get('email') as string;
			const contactNumber = formData.get('contactNumber') as string;
			const tin = formData.get('tin') as string;

			// Files validation
			const govIdUpload = formData.get('govIdUpload') as File;
			const parkingPhotos = formData.get('parkingPhotos') as File;
			const proofOfOwnership = formData.get('proofOfOwnership') as File;
			const birCert = formData.get('birCert') as File;
			const liabilityInsurance = formData.get('liabilityInsurance') as File;

			// Validate required files
			const maxFileSize = 5 * 1024 * 1024;
			const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];

			const filesValid = [govIdUpload, parkingPhotos, proofOfOwnership, birCert].every((file) =>
				validateFile(file, allowedFileTypes[0], maxFileSize)
			);

			if (!filesValid) {
				fail(400, { success: false, error: 'Invalid file type or size' });
			}

			if (new RegExp(/^[0-9]{3}-[0-9]{3}-[0-9]{3}-[0-9]{3}$/).test(tin) === false) {
				fail(400, { success: false, error: 'Invalid TIN format' });
			}

			// Structure the data
			const ownerData = {
				ownerType,
				businessName,
				contact: {
					email,
					phone: contactNumber
				},
				documents: {
					tin,
					govId: govIdUpload,
					proofOfOwnership,
					birCert,
					liabilityInsurance
				},
				location: {
					street: formData.get('streetAddress'),
					barangay: formData.get('barangay'),
					city: formData.get('city'),
					province: formData.get('province'),
					postalCode: formData.get('postalCode')
				},
				parkingDetails: {
					type: formData.get('spaceType'),
					layout: formData.get('spaceLayout'),
					dimensions: formData.get('spaceDimensions'),
					photos: parkingPhotos
				}
			};

			// TODO: Add API call to save data
			// const response = await axios.post('/api/owners/register', ownerData, { httpsAgent });
			return {
				success: true,
				data: {
					ownerData
				}
			};

			return {
				success: true,
				message: 'Registration submitted successfully'
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
