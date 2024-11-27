interface AuthEndpoints {
	login: string;
	createAccount: string;
	generateOtp: string;
	verifyOtp: string;
	setNickname: string;
	logout: string;
	verifyToken: string;
}

interface EstablishmentEndpoints {
	query: string;
	info: string;
}

interface Config {
	api: {
		baseUrl: string;
		port: number;
		version: string;
		endpoints: {
			auth: {
				root: string;
				endpoints: AuthEndpoints;
			};
			establishment: {
				root: string;
				endpoints: EstablishmentEndpoints;
			};
			slots: {
				root: string;
				endpoints: {
					getByUUID: string;
					getByVehicleType: string;
					getBySlotCode: string;
				};
			};
			parkingManager: {
				root: string;
				endpoints: {
					getEstablishmentInfo: string;
					getAllSlots: string;
				};
			};
		};
	};
}

export const config: Config = {
	api: {
		baseUrl: import.meta.env.VITE_API_BASE_URL || 'https://localhost',
		port: Number(import.meta.env.VITE_API_PORT) || 5000,
		version: import.meta.env.VITE_API_VERSION || 'api/v1',
		endpoints: {
			auth: {
				root: import.meta.env.VITE_API_AUTH_ROOT || '/auth',
				endpoints: {
					login: import.meta.env.VITE_API_AUTH_LOGIN || '/login',
					createAccount: import.meta.env.VITE_API_AUTH_CREATE_ACCOUNT || '/create-new-account',
					generateOtp: import.meta.env.VITE_API_AUTH_GENERATE_OTP || '/generate-otp',
					verifyOtp: import.meta.env.VITE_API_AUTH_VERIFY_OTP || '/verify-otp',
					setNickname: import.meta.env.VITE_API_AUTH_SET_NICKNAME || '/set-nickname',
					logout: import.meta.env.VITE_API_AUTH_LOGOUT || '/logout',
					verifyToken: import.meta.env.VITE_API_VERIFY_JWT_TOKEN || '/verify-token'
				}
			},
			establishment: {
				root: import.meta.env.VITE_API_ESTABLISHMENT_ROOT || '/establishment',
				endpoints: {
					query: import.meta.env.VITE_API_ESTABLISHMENT_QUERY || '/query',
					info: import.meta.env.VITE_API_ESTABLISHMENT_QUERY_INFO || '/get-establishment-info'
				}
			},
			slots: {
				root: import.meta.env.VITE_API_SLOTS_ROOT || '/slots',
				endpoints: {
					getByUUID: import.meta.env.VITE_API_SLOT_GET_ALL_SLOTS || '/get-all-slots',
					getByVehicleType:
						import.meta.env.VITE_API_SLOT_GET_BY_VEHICLE_TYPE || '/get-slots-by-vehicle-type',
					getBySlotCode: import.meta.env.VITE_API_SLOT_GET_BY_SLOT_CODE || '/get-slot-by-slot-code'
				}
			},
			parkingManager: {
				root: import.meta.env.VITE_API_PARKING_MANAGER_ROOT || '/parking-manager',
				endpoints: {
					getEstablishmentInfo:
						import.meta.env.VITE_API_PARKING_MANAGER_GET_ESTABLISHMENT_INFO ||
						'/get-establishment-info',
					getAllSlots: import.meta.env.VITE_API_PARKING_MANAGER_GET_ALL_SLOTS || '/get-all-slots'
				}
			}
		}
	}
};
