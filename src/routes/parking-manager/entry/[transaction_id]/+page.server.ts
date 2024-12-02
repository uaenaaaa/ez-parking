import type { PageServerLoad } from './$types';
import {
	API_PARKING_MANAGER_ROOT,
	API_BASE_URL,
	API_ESTABLISHMENT_ENTRY_VALIDATE
} from '$env/static/private';
import { httpsAgent } from '$lib/server/http-config';
import axios from 'axios';

export const load: PageServerLoad = async ({ params, cookies }) => {
	const shortenedTransactionId = params.transaction_id.slice(0, 48) + '...';
	const Authorization = cookies.get('Authorization');
	const XSRFToken = cookies.get('X-CSRF-Token');
	// return {
	// 	transaction: {
	// 		id: shortenedTransactionId,
	// 		status: 'reserved',
	// 		payment_status: 'PAID',
	// 		created_at: new Date().toISOString(),
	// 		vehicle: {
	// 			plate_number: 'ABC 123',
	// 			type: 'Sedan',
	// 			size: 'MEDIUM'
	// 		},
	// 		slot: {
	// 			code: 'SLOT-007',
	// 			floor_level: 2,
	// 			section: 'B',
	// 			features: 'standard'
	// 		},
	// 		customer: {
	// 			name: 'John Doe',
	// 			email: 'john@example.com',
	// 			phone: '+1234567890'
	// 		},
	// 		payment: {
	// 			amount: 150.0,
	// 			method: 'Credit Card',
	// 			reference: 'PAY-123456'
	// 		},
	// 		booking: {
	// 			entry_time: new Date().toISOString(),
	// 			duration: '2 hours'
	// 		}
	// 	}
	// };
	const response = await axios.get(
		`${API_BASE_URL}${API_PARKING_MANAGER_ROOT}${API_ESTABLISHMENT_ENTRY_VALIDATE}/${params.transaction_id}`,
		{
			headers: {
				Authorization: 'Bearer ' + Authorization,
				'X-CSRF-Token': XSRFToken
			},
			withCredentials: true,
			withXSRFToken: true,
			httpsAgent
		}
	);

	const transaction = response.data;
	return { transaction };
};
