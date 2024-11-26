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
				root: import.meta.env.VITE_API_AUTH_ROOT || '/api/v1/auth',
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
					query: import.meta.env.VITE_API_ESTABLISHMENT_QUERY || '/query'
				}
			}
		}
	}
};
