import type { Actions } from '@sveltejs/kit';
import { search } from '$lib/server/establishment/search.js';
import { fail } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		try {
			const result = await search({
				longitude: Number(data.get('longitude')),
				latitude: Number(data.get('latitude')),
				establishment_id: Number(data.get('establishment_id')),
				establishment_name: data.get('establishment_name') as string,
				vehicle_type_id: Number(data.get('vehicle_type_id')),
				is_24_hours: data.get('is_24_hours') === 'true' ? true : false
			});
			return { status: 200, data: result };
		} catch {
			return fail(401, { success: false, message: 'Invalid credentials' });
		}
	}
};
