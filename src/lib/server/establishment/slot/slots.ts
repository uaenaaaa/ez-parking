import axios from 'axios';
import { config } from '$lib/server/config/environment.js';
import https from 'https';
import type { ApiResponse } from '$lib/models/establishment/establishment.js';

const agent = new https.Agent({
	rejectUnauthorized: false
});

export async function establishmentInfo({ uuid }: { uuid: string }): Promise<ApiResponse> {
	const queryUrl = `${config.api.baseUrl}:${config.api.port}/${config.api.version}${config.api.endpoints.establishment.root}${config.api.endpoints.establishment.endpoints.info}`;

	const response = axios.get(queryUrl, {
		params: {
			establishment_uuid: uuid
		},
		withCredentials: true,
		httpsAgent: agent
	});
	return (await response).data;
}
