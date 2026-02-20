<script>
	import { authStore } from '$features/auth/store.js';
	import ClassroomAttendee from '$features/home/components/ClassroomAttendee.svelte';
	import ClassroomGeneralInfo from '$features/home/components/ClassroomGeneralInfo.svelte';
	import ClassroomScan from '$features/home/components/ClassroomScan.svelte';

	let { data } = $props();

	$effect(() => {
		authStore.setAuth({ token: data.token, user: data.user });
	});
</script>

<div class="meeting-layout">
	<div class="general">
		<ClassroomGeneralInfo meeting={data.meeting} />
	</div>

	<div class="attendee">
		<ClassroomAttendee attendances={data.meeting.attendances} fetchMeeting={() => {}} />
	</div>

	<div class="scan">
		<ClassroomScan
			schedule={data.meeting.schedule}
			meetingDate={data.meeting.date}
			teacher={data.meeting.schedule.teacher}
		/>
	</div>
</div>

<style>
	.meeting-layout {
		display: grid;
		grid-template-columns: 1fr;
		gap: 24px;
	}

	@media (min-width: 768px) {
		.meeting-layout {
			grid-template-columns: repeat(3, 1fr);
		}

		.general {
			grid-column: 1 / -1;
		}

		.attendee {
			grid-column: span 2;
		}

		.scan {
			grid-column: span 1;
		}
	}
</style>
