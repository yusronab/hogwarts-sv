<script lang="ts">
	import BaseChipStatus from '$lib/components/BaseChipStatus.svelte';
	import type { DetailMeeting } from '../types';

	let { meeting } = $props<{ meeting: DetailMeeting }>();
</script>

<section class="bg-card p-4 rounded-3xl border space-y-6">
	<h2>Informasi Umum</h2>

	<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
		{#if meeting?.status}
			<div class="flex flex-col gap-1">
				<small>Status</small>
				<BaseChipStatus status={meeting.status} />
			</div>
		{/if}

		<div>
			<small>Kelas</small>
			<p>{meeting?.schedule?.class?.name || '-'}</p>
		</div>

		<div>
			<small>Tanggal Pertemuan</small>
			<p>{meeting?.date || '-'}</p>
		</div>

		<div>
			<small>Jam Mulai</small>
			<p>{meeting?.schedule?.hour_start?.slice(0, 5) || '-'}</p>
		</div>

		<div>
			<small>Jam Selesai</small>
			<p>{meeting?.schedule?.hour_end?.slice(0, 5) || '-'}</p>
		</div>

		<div>
			<small>Mata Pelajaran</small>
			<p>{meeting?.schedule?.subject?.name || '-'}</p>
		</div>

		<div>
			<small>Judul Pertemuan</small>
			<p>{meeting?.title || '-'}</p>
		</div>

		<div>
			<small>Keterangan</small>
			<p>{meeting?.description || '-'}</p>
		</div>
	</div>
</section>
