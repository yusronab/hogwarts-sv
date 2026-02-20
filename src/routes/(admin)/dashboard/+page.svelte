<script>
	import { goto } from '$app/navigation';
	import BaseButton from '$lib/components/BaseButton.svelte';
	import { alertStore } from '$lib/stores/alert.store';

	const handleLogout = async () => {
		alertStore.confirm('Konfirmasi', 'Apakah kamu yakin keluar dari akun ini?', async () => {
			await fetch('/logout', { method: 'POST' });
			goto('/login');
		});
	};
</script>

<section>
	<div style="width: 128px;">
		<BaseButton on:click={handleLogout}>Logout</BaseButton>
	</div>
</section>
