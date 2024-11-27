export interface VehicleType {
	base_rate: number;
	size_category: 'SMALL' | 'MEDIUM' | 'LARGE';
	type_name: string;
	vehicle_id: number;
}

export interface ParkingSlot {
	created_at: string;
	establishment_id: number;
	floor_level: number;
	is_active: boolean;
	is_premium: boolean;
	slot_code: string;
	slot_features: string;
	slot_id: number;
	slot_multiplier: string;
	slot_status: 'open' | 'reserved' | 'occupied';
	updated_at: string;
	vehicle_type: VehicleType;
	vehicle_type_id: number;
}

export interface Establishment {
	address: string;
	closing_time: string;
	contact_number: string;
	created_at: string;
	establishment_id: number;
	hourly_rate: number;
	is_24_hours: boolean;
	latitude: number;
	longitude: number;
	name: string;
	opening_time: string;
	slots: ParkingSlot[];
	slot_statistics?: {
		open_slots: number;
		total_slots: number;
		reserved: number;
	};
	updated_at: string;
	uuid: string;
}

export interface ApiResponse {
	get: {
		code: string;
		establishment: Establishment;
		message: string;
	};
}
