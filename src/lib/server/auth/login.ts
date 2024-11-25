import axios from 'axios';
import { config } from '$lib/server/config/environment.js';
import https from 'https';

const agent = new https.Agent({
	rejectUnauthorized: false
});

interface LoginParams {
	email: string;
	rememberMe: boolean;
}

export async function login({ email, rememberMe }: LoginParams) {
	const loginUrl = `${config.api.baseUrl}:${config.api.port}/${config.api.version}${config.api.endpoints.auth.endpoints.login}`;

	const response = axios.post(
		loginUrl,
		{ email, rememberMe },
		{ withCredentials: true, httpsAgent: agent }
	);
	return (await response).data;
}
