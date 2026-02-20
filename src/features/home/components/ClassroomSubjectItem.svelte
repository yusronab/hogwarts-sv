<script lang="ts">
	import type { User } from '$features/auth/types';
	import BaseAvatar from '$lib/components/BaseAvatar.svelte';
	import { studentStore } from '../store';

	const { id, name, description, teachers } = $props<{
		isActive: boolean;
		name: string;
		description: string;
		teachers: User[];
	}>();

	const handleSelected = () => {
		if (id === $studentStore.selectedSubjectId) return studentStore.clear();

		studentStore.setSelectedSubjectId(id);
	};

	const isActive = $derived($studentStore.selectedSubjectId === id);
</script>

<button type="button" class="card" class:active={isActive} onclick={handleSelected}>
	<b>{name ?? '-'}</b>

	<div>{description ?? '-'}</div>

	<div class="footer">
		<BaseAvatar image={teachers[0]?.profileImage} alt={teachers[0]?.fullName} />
		<div class="teacher">
			{teachers[0]?.fullName}
			{teachers.length > 1 ? ` dan ${teachers.length - 1} lainnya` : ''}
		</div>
	</div>
</button>

<style>
	.card {
		all: unset; /* reset default button */
		min-width: 260px;
		background: var(--card);
		padding: 16px;
		border-radius: 16px;
		display: flex;
		gap: 12px;
		flex-direction: column;
		box-shadow: 0 1px 2px rgba(3, 18, 26, 0.2);
		border: 1px solid var(--border);
		cursor: pointer;
	}

	.card:focus-visible {
		outline: 2px solid var(--color-destructive);
		outline-offset: 2px;
	}

	.card.active {
		border-color: var(--color-destructive);
	}

	.footer {
		display: flex;
		gap: 8px;
		align-items: center;
		margin-top: 16px;
	}
</style>
