import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(302, '/login');
	}

	if (locals.user.role !== 'Siswa') {
		throw redirect(302, '/dashboard');
	}

	return { user: locals.user, token: locals.token };
};
