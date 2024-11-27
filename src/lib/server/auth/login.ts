import axios from 'axios';
import { config } from '$lib/server/config/environment.js';
import https from 'https';

const agent = new https.Agent({
	rejectUnauthorized: false
});

export async function login({ email }: { email: string }) {
	const loginUrl = `${config.api.baseUrl}:${config.api.port}/${config.api.version}${config.api.endpoints.auth.root}${config.api.endpoints.auth.endpoints.login}`;

	const response = axios.post(loginUrl, { email }, { withCredentials: true, httpsAgent: agent });
	return (await response).data;
}
