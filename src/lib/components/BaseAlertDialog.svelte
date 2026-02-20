<script lang="ts">
	import { alertStore } from '$lib/stores/alert.store';
	import iconSuccess from '$lib/assets/icons/ic-success.svg';
	import iconConfirm from '$lib/assets/icons/ic-warning.svg';
	import iconError from '$lib/assets/icons/ic-error.svg';
	import BaseButton from './BaseButton.svelte';
	import { onMount } from 'svelte';

	function handleClose() {
		$alertStore.onCancel?.();
		alertStore.close();
	}

	function handleConfirm() {
		$alertStore.onConfirm?.();
		alertStore.close();
	}

	$: renderIcon =
		$alertStore.type === 'success'
			? iconSuccess
			: $alertStore.type === 'confirm'
				? iconConfirm
				: iconError;

	let mounted = false;

	onMount(() => {
		mounted = true;
	});
</script>

{#if mounted && $alertStore.isOpen}
	<div class="overlay">
		<div class="dialog">
			<img src={renderIcon} alt="alert icon" />

			<div class="text-center">
				<h2>{$alertStore.title}</h2>
				<p>{$alertStore.description}</p>
			</div>

			<div class="actions w-full">
				{#if $alertStore.type === 'confirm'}
					<BaseButton variant="outlined" on:click={handleClose}>
						{$alertStore.textNegative}
					</BaseButton>
				{/if}

				<BaseButton on:click={handleConfirm}>
					{$alertStore.textPositive}
				</BaseButton>
			</div>
		</div>
	</div>
{/if}

<style>
	.overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.4);
		backdrop-filter: blur(4px);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 9999;
	}

	.dialog {
		background: var(--card);
		border: 1px solid var(--border);
		padding: 24px;
		border-radius: 16px;
		max-width: 90vw;
		width: 480px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 24px;
	}

	.actions {
		display: flex;
		gap: 12px;
		margin-top: 20px;
	}
</style>
