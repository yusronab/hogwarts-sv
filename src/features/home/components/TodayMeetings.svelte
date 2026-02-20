<script lang="ts">
	import { Info } from 'lucide-svelte';
	import type { Meeting } from '../types';
	import MeetingCard from './MeetingCard.svelte';

	let { meetings, loading }: { meetings: Meeting[]; loading?: boolean } = $props();
</script>

<section class="space-y-6">
	<h2>Jadwal Hari Ini</h2>

	{#if loading}
		<div>Loading...</div>
	{:else if meetings.length === 0}
		<div class="flex gap-2 items-center">
			<Info />
			<p>Tidak ada pertemuan hari ini</p>
		</div>
	{:else}
		<div class="scroll">
			{#each meetings as meeting}
				<MeetingCard {meeting} />
			{/each}
		</div>
	{/if}
</section>

<style>
	.scroll {
		display: flex;
		gap: 16px;
		overflow-x: auto;
		padding-bottom: 8px;
	}

	.scroll::-webkit-scrollbar {
		display: none;
	}
</style>
