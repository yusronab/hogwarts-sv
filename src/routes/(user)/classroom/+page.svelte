<script lang="ts">
	import { getStudentAttendanceBySubjectId } from '$features/home/api.js';
	import ClassroomAttendanceTable from '$features/home/components/ClassroomAttendanceTable.svelte';
	import ClassroomSubjectSection from '$features/home/components/ClassroomSubjectSection.svelte';
	import { studentStore } from '$features/home/store.js';

	let { data } = $props();

	let loading = $state<boolean>(false);

	let selectedSubjectId = $derived($studentStore.selectedSubjectId);

	$effect(() => {
		if (!selectedSubjectId) return;

		loading = true;

		getStudentAttendanceBySubjectId(data.token || '', selectedSubjectId)
			.then((res) => {
				studentStore.setStudentAttendance(res.data);
			})
			.finally(() => (loading = false));
	});
</script>

<svelte:head>
	<title>{data.title} | Hogwarts App</title>
</svelte:head>

<div class="space-y-4">
	<ClassroomSubjectSection subjects={data.subjects} />

	<ClassroomAttendanceTable {loading} />
</div>
