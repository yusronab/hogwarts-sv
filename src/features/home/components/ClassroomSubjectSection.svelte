<script lang="ts">
	import type { User } from '$features/auth/types';
	import type { Subject } from '../types';
	import ClassroomSubjectItem from './ClassroomSubjectItem.svelte';

	const { subjects } = $props<{ subjects: (Subject & { teachers: User[] })[] }>();
</script>

<section>
	<h3 class="text-xl font-bold">Mata Pelajaran</h3>
	<p>Cek kehadiran kamu disetiap mata pelajaran.</p>

	{#if subjects.length === 0}
		<p>Belum ada mata pelajaran</p>
	{:else}
		<div class="scroll">
			{#each subjects as subject}
				<ClassroomSubjectItem {...subject} />
			{/each}
		</div>
	{/if}
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.scroll {
		display: flex;
		gap: 24px;
		overflow-x: auto;
		padding-bottom: 8px;
	}

	.scroll::-webkit-scrollbar {
		display: none;
	}
</style>
