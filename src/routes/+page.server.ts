import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	if (locals.user && locals.user.role === 'Siswa') {
		throw redirect(302, '/home');
	} else if (locals.user) {
		throw redirect(302, '/dashboard');
	}

	throw redirect(302, '/login');
};
