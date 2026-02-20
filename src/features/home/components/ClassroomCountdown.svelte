<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	export let expiredAt: Date | null;

	let remaining = '';
	let interval: any;

	function update() {
		if (!expiredAt) {
			remaining = '-';
			return;
		}

		const diff = expiredAt.getTime() - Date.now();

		if (diff <= 0) {
			remaining = 'Telah berakhir';
			clearInterval(interval);
			return;
		}

		const hours = Math.floor(diff / (1000 * 60 * 60));
		const minutes = Math.floor((diff / (1000 * 60)) % 60);
		const seconds = Math.floor((diff / 1000) % 60);

		remaining = `${hours}j ${minutes}m ${seconds}d`;
	}

	onMount(() => {
		update();
		interval = setInterval(update, 1000);
	});

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<div class="countdown">
	{remaining}
</div>

<style>
	.countdown {
		font-weight: 600;
		font-size: 16px;
		color: tomato;
	}
</style>
