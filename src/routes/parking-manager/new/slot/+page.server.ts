import type { PageLoad } from './$types';
import axios from 'axios';
import https from 'https';

const agent = new https.Agent({
	rejectUnauthorized: false
});

export const load: PageLoad = async () => {
	try {
		const response = await axios.get(
			'https://localhost:5000/api/v1/vehicle-type/get-all-vehicle-types',
			{
				httpsAgent: agent
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
