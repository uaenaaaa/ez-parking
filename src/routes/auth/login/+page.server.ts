import type { Actions } from '@sveltejs/kit';
import { login } from '$lib/server/auth/login.js';
import { fail } from '@sveltejs/kit';

export const actions: Actions = {
	login: async ({ request }) => {
		const data = await request.formData();
		try {
			const result = await login({
				email: data.get('email') as string,
				rememberMe: data.get('remember') === 'on' ? true : false
			});
			return { status: 200, data: result };
		} catch {
			return fail(401, { success: false, message: 'Invalid credentials' });
		}
	}
};
