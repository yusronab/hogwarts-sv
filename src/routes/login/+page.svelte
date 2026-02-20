<script lang="ts">
	import BaseInputText from '$lib/components/BaseInputText.svelte';
	import BaseButton from '$lib/components/BaseButton.svelte';
	import { alertStore } from '$lib/stores/alert.store';
	import { goto } from '$app/navigation';
	import { superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { loginSchema } from '$features/auth/schema.js';
	import type { LoginResponse } from '$features/auth/types.js';

	let { data } = $props();

	const { form, errors, constraints, submitting, enhance } = superForm(data.form, {
		validators: zod(loginSchema),
		onResult: ({ result }) => {
			if (result.type === 'success') {
				const { user } = result.data as LoginResponse;
				alertStore.success('Login berhasil', `Selamat datang ${user.fullName}`, () => goto('/'));
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

<div class="login-container">
	<div class="card space-y-6">
		<h2 class="text-center">Login</h2>

		<form method="POST" use:enhance class="flex flex-col gap-4">
			<BaseInputText
				label="Email"
				id="email"
				name="email"
				bind:value={$form.email}
				placeholder="Masukkan email"
				error={!!$errors.email}
				helperText={$errors.email}
				required
				{...$constraints.email}
			/>

			<BaseInputText
				label="Password"
				id="password"
				name="password"
				type="password"
				bind:value={$form.password}
				placeholder="Masukkan password"
				error={!!$errors.password}
				helperText={$errors.password}
				required
				{...$constraints.password}
			/>

			<BaseButton loading={$submitting} disabled={$submitting} type="submit">Login</BaseButton>
		</form>
	</div>
</div>

<style>
	.login-container {
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		background: var(--background);
	}

	.card {
		max-width: 90vw;
		width: 480px;
		background: var(--card);
		padding: 16px;
		border-radius: 24px;
		border: 1px solid var(--border);
	}
</style>
