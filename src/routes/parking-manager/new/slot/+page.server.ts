import type { PageServerLoad } from './$types';
import axios from 'axios';
import { httpsAgent } from '$lib/server/http-config';

export const load: PageServerLoad = async () => {
	try {
		const response = await axios.get(
			'https://localhost:5000/api/v1/vehicle-type/get-all-vehicle-types',
			{
				httpsAgent
			}
		);
		console.log('response', response);

		return {
			vehicleTypes: response.data
		};
	} catch {
		return {
			vehicleTypes: null,
			error: 'Failed to load data'
		};
	}
};
