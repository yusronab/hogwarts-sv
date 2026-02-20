import { z } from 'zod/v3';

export const profileSchema = z.object({
	email: z.string(),

	fullName: z.string().min(1, 'Nama lengkap wajib diisi'),
	username: z.string().min(1, 'Username wajib diisi'),
	phone: z.string().min(1, 'No. Hp wajib diisi').startsWith('08', 'No. Hp harus diawali dengan 08')
});

export const changePasswordSchema = z.object({
	oldPassword: z.string().min(1, 'Password lama wajib diisi').min(6, 'Password minimal 6 karakter'),
	newPassword: z.string().min(1, 'Password baru wajib diisi').min(6, 'Password minimal 6 karakter')
});
