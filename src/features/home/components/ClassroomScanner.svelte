<script lang="ts">
	import BaseButton from '$lib/components/BaseButton.svelte';
	import { ScanQrCode } from 'lucide-svelte';
	import ScanDialog from './ScanDialog.svelte';
	import { authStore } from '$features/auth/store';
	import { scanQrCode } from '../api';
	import { alertStore } from '$lib/stores/alert.store';

	let { disableScan = false }: { disableScan: boolean } = $props();

	let open = $state<boolean>(false);

	async function handleScanSuccess(value: string) {
		console.log('QR RESULT:', value);
		const token = value.split('token=')[1];

		if ($authStore.token) {
			await scanQrCode($authStore.token, token);

			alertStore.success('Sukses', 'Kamu berhasil melakukan presensi');
		}
	}
</script>

<BaseButton variant="contained" on:click={() => (open = true)} disabled={disableScan}>
	<ScanQrCode />
	Scan QR
</BaseButton>

{#if open}
	<ScanDialog onClose={() => (open = false)} onSuccess={handleScanSuccess} />
{/if}
