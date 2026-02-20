<script lang="ts">
	import { onMount } from 'svelte';
	import { getStudentReports } from '../api';
	import type { Meta, Report } from '../types';
	import ReportCard from './ReportCard.svelte';
	import BaseButton from '$lib/components/BaseButton.svelte';

	let { token } = $props<{ token: string | null }>();
	let reports = $state<Report[]>([]);
	let loading = $state<boolean>(false);
	let meta = $state<Meta>({
		currentPage: 1,
		totalPages: 1,
		itemsPerPage: 2,
		totalItems: 1
	});

	async function fetchReports(page: number, limit: number) {
		loading = true;

		try {
			const res = await getStudentReports(token, page, limit);
			reports = res.data.items;
			meta = res.data.meta;
		} finally {
			loading = false;
		}
	}

	async function changePage(page: number) {
		meta.currentPage = page;
		fetchReports(page, meta.itemsPerPage);
	}

	onMount(async () => {
		await fetchReports(meta.currentPage, meta.itemsPerPage);
	});
</script>

<section class="space-y-6">
	<h2>Papan Surat Peringatan</h2>

	<div class="list">
		{#if reports.length === 0}
			<div>Tidak ada laporan</div>
		{:else}
			{#each reports as report}
				<ReportCard {report} />
			{/each}
		{/if}
	</div>

	<div class="pagination">
		{#each Array(meta.totalPages) as _, i}
			<BaseButton
				width="32px"
				height="32px"
				variant={meta.currentPage === i + 1 ? 'contained' : 'outlined'}
				on:click={() => changePage(i + 1)}
			>
				{i + 1}
			</BaseButton>
		{/each}
	</div>
</section>

<style>
	.list {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.pagination {
		margin-top: 16px;
		display: flex;
		gap: 8px;
	}
</style>
