import type { Actions } from '@sveltejs/kit';
import {
	API_PARKING_MANAGER_LOGIN,
	API_PARKING_MANAGER_ROOT,
	API_BASE_URL
} from '$env/static/private';

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
	},
	otp: async ({ request }) => {
		const formData = await request.formData();
	}
};
