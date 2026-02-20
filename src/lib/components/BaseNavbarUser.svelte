<script lang="ts">
	import { goto } from '$app/navigation';
	import { alertStore } from '$lib/stores/alert.store';
	import { clickOutside } from '$lib/utils/clickOutside';
	import BaseThemeToggle from './BaseThemeToggle.svelte';
	import BaseAvatar from './BaseAvatar.svelte';

	interface Props {
		title: string | null;
		userName: string | null;
		nis: string | null;
		avatarUrl: string | null;
	}

	let { title, avatarUrl, userName, nis }: Props = $props();

	let open = $state(false);

	function toggle() {
		open = !open;
	}

	function close() {
		open = false;
	}

	async function handleLogout() {
		alertStore.confirm('Konfirmasi', 'Apakah kamu yakin keluar dari akun ini?', async () => {
			await fetch('/logout', { method: 'POST' });
			goto('/login');
		});
	}
</script>

<header class="h-16 flex items-center justify-between px-6 border-b border-border bg-sidebar">
	<button class="font-semibold text-lg cursor-pointer" onclick={() => goto('/home')}>
		{title}
	</button>

	<div class="relative" use:clickOutside={close}>
		<button
			class="w-10 h-10 rounded-full overflow-hidden border-2 border-foreground flex items-center justify-center cursor-pointer"
			onclick={toggle}
		>
			<BaseAvatar image={avatarUrl} alt="avatar" />
		</button>

		{#if open}
			<div
				class="absolute right-0 top-12 w-56 bg-card border border-border rounded-xl shadow-lg p-2 flex flex-col gap-1 z-50"
			>
				<div class="px-3 py-2 border-b border-border">
					<strong class="block">{userName}</strong>
					<span class="text-sm text-muted-foreground">{nis}</span>
				</div>

				<button
					class="px-3 py-2 rounded-md text-left hover:bg-accent"
					onclick={() => goto('/profile')}
				>
					User Profile
				</button>

				<button
					class="px-3 py-2 rounded-md text-left hover:bg-accent"
					onclick={() => goto('/classroom')}
				>
					Classroom
				</button>

				<div class="flex items-center justify-between px-3 py-2">
					<span class="text-sm">Dark Mode</span>
					<BaseThemeToggle />
				</div>

				<button
					class="px-3 py-2 rounded-md text-left text-destructive hover:bg-destructive/10 border-t border-border mt-1"
					onclick={handleLogout}
				>
					Logout
				</button>
			</div>
		{/if}
	</div>
</header>
