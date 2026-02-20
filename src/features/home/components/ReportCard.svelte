<script lang="ts">
	import BaseChipStatus from '$lib/components/BaseChipStatus.svelte';
	import type { Report } from '../types';

	let { report } = $props<{ report: Report }>();
</script>

<div class="p-4 rounded-xl hover:bg-muted relative">
	<b>Pemanggilan Siswa ke Guru BK</b>

	<p>
		Harap segera menuju ruang BK untuk alasan
		{report.reason || 'keperluan pendampingan'}.
	</p>

	<div class="absolute top-2 right-2">
		<BaseChipStatus status={report.reportlevel} />
	</div>
</div>
