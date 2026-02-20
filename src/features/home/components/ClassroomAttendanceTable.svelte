<script lang="ts">
	import { studentStore } from '../store';
	import BaseTable from '$lib/components/BaseTable.svelte';
	import type { Meeting, Attendance } from '../types';
	import type { ColumnDef } from '@tanstack/table-core';
	import { renderComponent } from '$lib/components/ui/data-table';
	import BaseTableAction from '$lib/components/BaseTableAction.svelte';
	import { goto } from '$app/navigation';
	import { STUDENT_COLUMNS } from '../constant';

	const { loading } = $props<{ loading: boolean }>();

	let attendances = $derived($studentStore.studentAttendance.items || []);

	const columns: ColumnDef<
		Meeting & {
			attendances: Attendance[];
		}
	>[] = [
		{
			accessorKey: 'action',
			header: 'Aksi',
			cell: ({ row }) =>
				renderComponent(BaseTableAction, {
					useDetailButton: true,
					onDetailClick: () => goto(`/classroom/${row.original.id}`)
				})
		},
		...STUDENT_COLUMNS
	];
</script>

<section class="space-y-2">
	<h3 class="text-xl font-bold">Detail Pelajaran</h3>
	{#if loading}
		<p>Loading...</p>
	{:else}
		<BaseTable {columns} data={attendances} />
	{/if}
</section>
