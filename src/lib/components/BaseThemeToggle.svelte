<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Sun, Moon } from 'lucide-svelte';
	import { themeStore } from '$lib/stores/theme';
	import { onMount } from 'svelte';

	let theme = 'light';

	onMount(() => {
		return themeStore.subscribe((t) => (theme = t));
	});
</script>

<Button variant="outline" size="icon" onclick={() => themeStore.toggle()}>
	{#if theme === 'dark'}
		<Sun />
	{:else}
		<Moon />
	{/if}
</Button>
