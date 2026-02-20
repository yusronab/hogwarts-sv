<script lang="ts">
	import type { User } from '$features/auth/types';
	import { buildExpiredAt, isCurrentMeeting } from '../utils';
	import type { Schedule } from '../types';
	import ClassroomCountdown from './ClassroomCountdown.svelte';
	import ClassroomScanner from './ClassroomScanner.svelte';
	import BaseAvatar from '$lib/components/BaseAvatar.svelte';

	interface Props {
		teacher: User;
		meetingDate?: string;
		schedule: Schedule;
	}

	let { teacher, meetingDate, schedule }: Props = $props();

	const expiredAt = $derived(buildExpiredAt(meetingDate, schedule?.hour_end));

	const isCurrent = $derived(isCurrentMeeting(schedule.hour_start, schedule.hour_end));
</script>

<section class="bg-card p-4 rounded-3xl border flex flex-col gap-6 items-center">
	<BaseAvatar image={teacher.profileImage} alt={teacher.fullName} width="80px" height="80px" />

	<div class="text-center">
		<h2>{teacher?.fullName}</h2>
		<small>{teacher?.role || '-'}</small>
	</div>

	<div class="text-center">
		<small>Sisa Waktu Pertemuan:</small>
		<ClassroomCountdown {expiredAt} />
	</div>

	<ClassroomScanner disableScan={!isCurrent} />
</section>
