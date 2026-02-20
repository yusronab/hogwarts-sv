<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Html5Qrcode } from 'html5-qrcode';

	export let onClose: () => void;
	export let onSuccess: (value: string) => void;

	let scanner: Html5Qrcode | null = null;
	let readerId = 'qr-reader';

	async function startScanner() {
		scanner = new Html5Qrcode(readerId);

		await scanner.start(
			{ facingMode: 'environment' },
			{
				fps: 10,
				qrbox: 250
			},
			(decodedText) => {
				handleSuccess(decodedText);
			},
			() => {}
		);
	}

	async function handleSuccess(value: string) {
		await stopScanner();
		onSuccess?.(value);
		onClose?.();
	}

	async function stopScanner() {
		if (scanner) {
			await scanner.stop();
			await scanner.clear();
			scanner = null;
		}
	}

	function close() {
		stopScanner();
		onClose?.();
	}

	onMount(() => {
		startScanner();
	});

	onDestroy(() => {
		stopScanner();
	});
</script>

<div class="overlay">
	<div class="dialog">
		<h3>Scan QR Code</h3>

		<div id={readerId} class="reader"></div>

		<button onclick={close}>Tutup</button>
	</div>
</div>

<style>
	.overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 999;
	}

	.dialog {
		background: var(--card-bg);
		border: 1px solid var(--border-color);
		padding: 24px;
		border-radius: 16px;
		width: 360px;
		max-width: 90%;
	}

	h3 {
		margin-top: 0;
	}

	.reader {
		width: 100%;
		margin: 16px 0;
	}

	button {
		width: 100%;
		height: 48px;
		padding: 10px;
		border: none;
		font-size: 14px;
		font-weight: bold;
		border-radius: 8px;
		background: #d9534f;
		color: white;
		cursor: pointer;
	}
</style>
