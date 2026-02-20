import { superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { loginSchema } from '$features/auth/schema';
import { fail, error, redirect } from '@sveltejs/kit';
import { loginApi } from '$features/auth/api';

export const load = async ({ locals }) => {
	if (locals.user && locals.user.role === 'Siswa') {
		throw redirect(302, '/home');
	} else if (locals.user) {
		throw redirect(302, '/dashboard');
	}

	const form = await superValidate(zod(loginSchema));
	return { title: 'Login', form };
};

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await superValidate(request, zod(loginSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const { email, password } = form.data;

			const response = await loginApi(email, password);
			const { access_token, user } = response.data;

			cookies.set('access_token', access_token, {
				path: '/',
				httpOnly: true,
				sameSite: 'lax',
				secure: process.env.NODE_ENV === 'production',
				maxAge: 60 * 60 * 24 // 1 hari
			});

			return { form, access_token, user };
		} catch (err: unknown) {
			const { statusCode, message } = err as { statusCode: number; message: string };
			throw error(statusCode, message);
		}
	}
};
