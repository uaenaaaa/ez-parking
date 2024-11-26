import { establishmentInfo } from '$lib/server/establishment/slot/slots.js';
import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = async ({ params }) => {
	return {
		get: await establishmentInfo({ uuid: params.uuid })
	};
};
