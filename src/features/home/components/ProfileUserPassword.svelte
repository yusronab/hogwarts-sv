<script lang="ts">
	import BaseInputText from '$lib/components/BaseInputText.svelte';
	import { superForm } from 'sveltekit-superforms';
	import { changePasswordSchema } from '../schema';
	import { zod } from 'sveltekit-superforms/adapters';
	import BaseButton from '$lib/components/BaseButton.svelte';
	import { changePassword } from '../api';
	import { alertStore } from '$lib/stores/alert.store';
	import { goto } from '$app/navigation';

	const { token } = $props<{ token: string | null }>();

	const { form, errors, submitting, constraints, enhance } = superForm(
		{ oldPassword: '', newPassword: '' },
		{
			SPA: true,
			validators: zod(changePasswordSchema),
			onUpdate: async ({ form, cancel }) => {
				if (form.valid) {
					await changePassword(token, form.data);
					alertStore.success(
						'Berhasil',
						'Password berhasil diubah, silahkan login kembali untuk memperbarui data',
						async () => {
							await fetch('/logout', { method: 'POST' });
							goto('/login');
						}
					);
				} else {
					console.log('Form is invalid, check errors');
				}
			},
			resetForm: false,
			onError: ({ result }) => {
				alertStore.error('Gagal', result.error.message || 'Terjadi kesalahan');
			}
		}
	);
</script>

<div class="space-y-6">
	<h2>Ubah Password</h2>

	<form method="POST" use:enhance class="grid grid-cols-1 md:grid-cols-2 gap-6">
		<BaseInputText
			label="Password Lama"
			id="oldPassword"
			name="oldPassword"
			type="password"
			bind:value={$form.oldPassword}
			placeholder="Masukkan password lama"
			error={!!$errors.oldPassword}
			helperText={$errors.oldPassword}
			required
			{...$constraints.oldPassword}
		/>

		<BaseInputText
			label="Password Baru"
			id="newPassword"
			name="newPassword"
			type="password"
			bind:value={$form.newPassword}
			placeholder="Masukkan password Baru"
			error={!!$errors.newPassword}
			helperText={$errors.newPassword}
			required
			{...$constraints.newPassword}
		/>

		<div class="md:col-span-2 place-self-end">
			<BaseButton loading={$submitting} disabled={$submitting} type="submit" width="fit-content">
				Simpan
			</BaseButton>
		</div>
	</form>
</div>
