import type { ColumnDef } from '@tanstack/table-core';
import type { Attendance, Meeting } from './types';
import { renderComponent } from '$lib/components/ui/data-table';
import BaseChipStatus from '$lib/components/BaseChipStatus.svelte';
import { formatDateTime } from './utils';

export const MAX_UPLOAD_SIZE = 1024 * 1024 * 1;
export const ACCEPTED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];

export const STUDENT_COLUMNS: ColumnDef<
	Meeting & {
		attendances: Attendance[];
	}
>[] = [
	{
		accessorKey: 'teacher',
		header: 'Guru Pengajar',
		cell: ({ row }) => row.original.teacher.fullName
	},
	{
		accessorKey: 'startHour',
		header: 'Jam Mulai',
		cell: ({ row }) => row.original.schedule.hour_start.slice(0, 5)
	},
	{
		accessorKey: 'endHour',
		header: 'Jam Selesai',
		cell: ({ row }) => row.original.schedule.hour_end.slice(0, 5)
	},
	{
		accessorKey: 'status',
		header: 'Keterangan',
		cell: ({ row }) =>
			renderComponent(BaseChipStatus, { status: row.original.attendances[0].status })
	},
	{
		accessorKey: 'timePresent',
		header: 'Waktu Kehadiran',
		cell: ({ row }) => formatDateTime(row.original.attendances[0].presentTime)
	}
];
