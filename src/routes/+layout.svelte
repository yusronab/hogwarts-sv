<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import BaseAlertDialog from '$lib/components/BaseAlertDialog.svelte';
	import { themeStore } from '$lib/stores/theme';
	import { onMount } from 'svelte';

	let { children } = $props();

	onMount(() => {
		themeStore.init();

		const unsubscribe = themeStore.subscribe((theme) => {
			document.documentElement.classList.remove('light', 'dark');
			document.documentElement.classList.add(theme);
		});

		return unsubscribe;
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="min-h-screen bg-background text-foreground">
	{@render children()}
	<BaseAlertDialog />
</div>
