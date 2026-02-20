<script lang="ts">
	import { alertStore } from '$lib/stores/alert.store.js';
	import { superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { profileSchema } from '$features/home/schema.js';
	import { goto } from '$app/navigation';

	import ProfileUserPassword from '$features/home/components/ProfileUserPassword.svelte';
	import BaseInputText from '$lib/components/BaseInputText.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import BaseButton from '$lib/components/BaseButton.svelte';
	import BaseProfileImageUploader from '$lib/components/BaseProfileImageUploader.svelte';

	const { data } = $props();

	let menu = $state<'account' | 'password'>('account');

	const menuClass = (name: string) =>
		`flex-1 md:w-full text-primary hover:bg-muted ${menu === name ? 'bg-muted' : 'bg-transparent'}`;

	const { form, errors, constraints, submitting, enhance } = superForm(data.form, {
		validators: zod(profileSchema),
		onResult: ({ result }) => {
			if (result.type === 'success') {
				alertStore.success('Sukses', 'Berhasil mengubah profil', () => goto('/profile'));
			}
		},
		onError: ({ result }) => {
			alertStore.error('Gagal', result.error.message || 'Terjadi kesalahan');
		}
	});
</script>

<svelte:head>
	<title>{data.title} | Hogwarts App</title>
</svelte:head>

<div class="grid grid-cols-5 gap-6">
	<section class="col-span-5 md:col-span-1 flex flex-row md:flex-col gap-2 h-fit">
		<Button onclick={() => (menu = 'account')} class={menuClass('account')}>Informasi Umum</Button>

		<Button onclick={() => (menu = 'password')} class={menuClass('password')}>Keamanan Akun</Button>
	</section>

	<section class="col-span-5 md:col-span-4">
		{#if menu === 'account'}
			<div class="space-y-6">
				<h2>Informasi Umum</h2>
				<form
					class="grid grid-cols-1 md:grid-cols-2 gap-6"
					use:enhance
					method="POST"
					enctype="multipart/form-data"
				>
					<div class="md:col-span-2">
						<BaseProfileImageUploader currentImage={data.user.profileImage} />
					</div>

					<BaseInputText
						label="Nama Lengkap"
						id="fullName"
						name="fullName"
						bind:value={$form.fullName}
						placeholder="Masukkan nama lengkap"
						error={!!$errors.fullName}
						helperText={$errors.fullName}
						required
						{...$constraints.fullName}
					/>

					<BaseInputText
						label="Username"
						id="username"
						name="username"
						bind:value={$form.username}
						placeholder="Masukkan username"
						error={!!$errors.username}
						helperText={$errors.username}
						required
						{...$constraints.username}
					/>

					<BaseInputText
						label="Email"
						id="email"
						name="email"
						placeholder="Masukkan email"
						readonly
						bind:value={$form.email}
					/>

					<BaseInputText
						label="No. Hp"
						id="phone"
						name="phone"
						bind:value={$form.phone}
						placeholder="Masukkan no. hp"
						error={!!$errors.phone}
						helperText={$errors.phone}
						required
						{...$constraints.phone}
					/>

					<div class="place-self-end md:col-span-2">
						<BaseButton
							loading={$submitting}
							disabled={$submitting}
							type="submit"
							width="fit-content"
						>
							Simpan
						</BaseButton>
					</div>
				</form>
			</div>
		{:else}
			<ProfileUserPassword token={data.token} />
		{/if}
	</section>
</div>
