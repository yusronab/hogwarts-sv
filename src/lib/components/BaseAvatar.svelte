<script lang="ts">
	import { baseImageUrl } from '$lib/config/env';
	import { CircleUser } from 'lucide-svelte';

	let {
		image,
		alt,
		width = '40px',
		height = '40px'
	}: { image: string | null; alt: string; width?: string; height?: string } = $props();

	let styleVars = $derived(`
		width: ${width};
		height: ${height};
	`);
</script>

{#if image}
	<img class="avatar border" src={baseImageUrl + image} {alt} style={styleVars} />
{:else}
	<CircleUser size={width} />
{/if}

<style>
	.avatar {
		object-fit: cover;
		border-radius: 100%;
	}
</style>
