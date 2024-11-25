export interface QuerySearchInterface {
	code: string;
	establishments: EstablishmentInterface[];
	message?: string;
	error?: string;
}

export interface EstablishmentInterface {
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
	slot_statistics: SlotStatisticInterface;
	updated_at: string;

	uuid: string;
}

export interface SlotStatisticInterface {
	occupied_slots: number;
	open_slots: number;
	reserved_slots: number;
	total_slots: number;
}
