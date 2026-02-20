import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(302, '/login');
	}

	if (locals.user.role !== 'Admin') {
		throw redirect(302, '/home');
	}

	return { user: locals.user };
};
