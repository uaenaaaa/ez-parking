import type { PageServerLoad } from './$types.js';
import axios from 'axios';
import {
	API_BASE_URL,
	API_TRANSACTION_ROOT,
	API_TRANSACTION_GET_ESTABLISHMENT_INFO_SLOT_FORM
} from '$env/static/private';
import https from 'https';

const agent = new https.Agent({
	rejectUnauthorized: false
});

export const load: PageServerLoad = async ({ params, cookies }) => {
	try {
		const token = cookies.get('Authorization');
		const xsrfToken = cookies.get('X-CSRF-TOKEN');
		const response = await axios.get(
			`${API_BASE_URL}${API_TRANSACTION_ROOT}${API_TRANSACTION_GET_ESTABLISHMENT_INFO_SLOT_FORM}`,
			{
				params: {
					establishment_uuid: params.uuid,
					slot_code: params.code
				},
				headers: {
					Authorization: `Bearer ${token}`
				},
				httpsAgent: agent,
				withCredentials: true,
				withXSRFToken: xsrfToken
			}
		);
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.error('Failed to fetch transaction details:', error);
		return {
			establishment: {
				name: 'SM Fairview Novaliches Parking Space',
				address: 'Novaliches, Quezon City, Metro Manila',
				hourly_rate: 60,
				uuid: params.uuid
			},
			slot: {
				slot_code: params.code,
				floor_level: 1,
				vehicle_type: {
					name: 'Sedan',
					base_rate: 1.4,
					size_category: 'MEDIUM',
					description: 'Standard four-door sedan'
				},
				is_premium: false,
				slot_features: 'standard',
				slot_status: 'open'
			},
			booking_config: {
				min_hours: 1,
				max_hours: 24,
				cancellation_policy: 'Free cancellation up to 1 hour before booking time',
				terms_conditions: [
					'Payment is required upon parking',
					'Vehicle must match registered type',
					'Please arrive within 30 minutes of booking time',
					'Rate changes may apply for extended stays'
				]
			}
		};
	}
};
