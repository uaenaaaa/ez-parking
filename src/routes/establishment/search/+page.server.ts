import type { Actions } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import { API_BASE_URL, API_ESTABLISHMENT_ROOT, API_ESTABLISHMENT_QUERY } from '$env/static/private';
import axios from 'axios';
import https from 'https';
import type { Establishment } from '$lib/models/establishment/establishment.js';

const agent = new https.Agent({
	rejectUnauthorized: false
});

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		try {
			const queryUrl = `${API_BASE_URL}${API_ESTABLISHMENT_ROOT}${API_ESTABLISHMENT_QUERY}`;

			const response = await axios.get(queryUrl, {
				params: {
					longitude: Number(data.get('longitude')),
					latitude: Number(data.get('latitude')),
					establishment_id: Number(data.get('establishment_id')),
					establishment_name: data.get('establishment_name') as string,
					vehicle_type_id: Number(data.get('vehicle_type_id')),
					is_24_hours: data.get('is_24_hours') === 'true'
				},
				withCredentials: true,
				httpsAgent: agent
			});

			return { status: 200, data: response.data as Establishment };
		} catch (error) {
			console.error('Search failed:', error);
			return fail(401, { success: false, message: 'Invalid credentials' });
		}
	}
};
