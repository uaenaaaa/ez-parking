import axios from 'axios';
import { config } from '$lib/server/config/environment.js';
import https from 'https';

const agent = new https.Agent({
	rejectUnauthorized: false
});

export async function verifyToken() {
	const verifyTokenUrl = `${config.api.baseUrl}:${config.api.port}/${config.api.version}${config.api.endpoints.auth.endpoints.verifyToken}`;

	const response = axios.get(verifyTokenUrl, { withCredentials: true, httpsAgent: agent });
	return (await response).data;
}
