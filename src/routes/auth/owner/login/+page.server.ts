import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
	},
	otp: async ({ request }) => {
		const formData = await request.formData();
	}
};
