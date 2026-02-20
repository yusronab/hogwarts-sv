import { ACCEPTED_FILE_TYPES, MAX_UPLOAD_SIZE } from '$features/home/constant.js';
import { profileSchema } from '$features/home/schema';
import { apiFetchServer } from '$lib/api/server.js';
import { error } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async (event) => {
	const form = await superValidate(zod(profileSchema), {
		defaults: {
			fullName: event.locals.user?.fullName,
			phone: event.locals.user?.phone || undefined,
			username: event.locals.user?.username,
			email: event.locals.user?.email
		}
	});
	return { title: `Profile ${event.locals.user?.fullName}`, form };
};

export const actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, zod(profileSchema));

		if (!form.valid) {
			const message = Object.entries(form.errors).map(([field, error]) => `${field} ${error}`);
			return error(400, `${message.join(', ')}`);
		}

		const file = formData.get('profileImage');
		const removeProfileImage = formData.get('removeProfileImage') === 'true';
		let profileImage: string | File | undefined | null = locals.user?.profileImage;

		if (file instanceof File && file.size > 0) {
			if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
				return error(400, 'Format gambar tidak valid, gunakan JPEG, PNG, atau GIF');
			} else if (file.size > MAX_UPLOAD_SIZE) {
				return error(400, 'Ukuran file terlalu besar, gunakan file maksimal 1MB');
			}

			profileImage = file;
		}

		try {
			const payload = new FormData();
			payload.append('fullName', form.data.fullName);
			payload.append('username', form.data.username);
			payload.append('phone', form.data.phone);
			payload.append('email', form.data.email);
			if (!removeProfileImage) {
				payload.append('profileImage', profileImage as Blob);
			}

			await apiFetchServer(locals.token ?? '', `/users/${locals.user?.id}`, {
				method: 'PATCH',
				body: payload
			});

			return { form };
		} catch (err: unknown) {
			const { statusCode, message } = err as { statusCode: number; message: string };
			throw error(statusCode, message);
		}
	}
};
