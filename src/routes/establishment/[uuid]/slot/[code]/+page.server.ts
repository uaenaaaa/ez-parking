import { slotInfo } from '$lib/server/establishment/slot/slots.js';
import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = async ({ params }) => {
	return {
		get: await slotInfo({ slot_code: params.code, uuid: params.uuid })
	};
};
