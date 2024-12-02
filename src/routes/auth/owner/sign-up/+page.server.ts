import type { Actions } from '@sveltejs/kit';
export const actions: Actions = {
	default: async ({ request }) => {
		return {
			status: 200,
			data: {
				success: true,
				message: 'Welcome to the parking manager sign-up page!'
			}
		};
	}
};
