import type { PageServerLoad } from './$types.js';
import { API_SLOT_GET_BY_SLOT_CODE, API_BASE_URL, API_SLOTS_ROOT } from '$env/static/private';
import axios from 'axios';
import { httpsAgent } from '$lib/server/http-config.js';

export const load: PageServerLoad = async ({ params }) => {
	try {
		const queryUrl = `${API_BASE_URL}${API_SLOTS_ROOT}${API_SLOT_GET_BY_SLOT_CODE}`;

		const response = await axios.get(queryUrl, {
			params: {
				slot_code: params.code,
				establishment_uuid: params.uuid
			},
			withCredentials: true,
			httpsAgent
		});

		return {
			get: response.data as APISlotBaseResponse
		};
	} catch (error) {
		console.error('Failed to fetch slot info:', error);
		throw error;
	}
};

interface SlotInfoInterface {
	slot_id: number;
	establishment_name: string;
	slot_code: string;
	vehicle_type_id: number;
	vehicle_type_code: string;
	vehicle_type_description: string;
	vehicle_type_name: string;
	size_category: 'SMALL' | 'MEDIUM' | 'LARGE';
	status: 'open' | 'reserved' | 'occupied';
	is_active: boolean;
	slot_multiplier: number;
	is_premium: boolean;
	slot_features: 'STANDARD' | 'COVERED' | 'VIP' | 'DISABLED' | 'EV CHARGING';
	floor_level: number;
	created_at: string;
	updated_at: string;
}

interface APISlotBaseResponse {
	get: {
		code: string;
		message: string;
		slot: SlotInfoInterface;
	};
}
