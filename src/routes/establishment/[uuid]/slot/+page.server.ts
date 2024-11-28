import type { PageServerLoad } from './$types.js';
import {
	API_BASE_URL,
	API_ESTABLISHMENT_ROOT,
	API_ESTABLISHMENT_QUERY_INFO
} from '$env/static/private';
import type { ApiResponse } from '$lib/models/establishment/establishment.js';
import axios from 'axios';
import https from 'https';

const agent = new https.Agent({
	rejectUnauthorized: false
});

export const load: PageServerLoad = async ({ params }) => {
	try {
		const queryUrl = `${API_BASE_URL}${API_ESTABLISHMENT_ROOT}${API_ESTABLISHMENT_QUERY_INFO}`;

		const response = await axios.get(queryUrl, {
			params: {
				establishment_uuid: params.uuid
			},
			withCredentials: true,
			httpsAgent: agent
		});

		return {
			get: response.data as ApiResponse
		};
	} catch (error) {
		console.error('Failed to fetch establishment info:', error);
		throw error;
	}
};
