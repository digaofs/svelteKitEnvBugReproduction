import { redirect, fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { PASSPHRASE } from '$env/static/private';

export const load: PageServerLoad = ({ cookies }) => {
	if (cookies.get('allowed')) {
		throw redirect(307, '/welcome');
	}
}

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();

		if (data.get('passphrase') === PASSPHRASE) {
			cookies.set('allowed', 'true', {
				path: '/'
			});

			throw redirect(303, '/welcome');
		}

		return fail(403, {
			incorrect: true
		});
	}
};
