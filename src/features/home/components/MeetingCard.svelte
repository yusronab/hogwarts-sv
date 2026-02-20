<script lang="ts">
	import type { Meeting } from '../types';
	import { isCurrentMeeting } from '../utils';
	import { goto } from '$app/navigation';
	import BaseButton from '$lib/components/BaseButton.svelte';

	let { meeting }: { meeting: Meeting } = $props();

	const isCurrent = $derived(
		isCurrentMeeting(meeting.schedule.hour_start, meeting.schedule.hour_end)
	);
</script>

<div class="card" class:active={isCurrent}>
	<div class="time">
		⏰
		<span>
			{meeting.schedule.hour_start.slice(0, 5)} -
			{meeting.schedule.hour_end.slice(0, 5)}
		</span>
	</div>

	<div class="subject">
		{meeting.subject?.name ?? '-'}
	</div>

	<div class="desc">
		<b>{meeting.title}</b>
		{meeting.description ? ` - ${meeting.description}` : ''}
	</div>

	<div class="footer">
		<div class="teacher">
			{meeting.teacher.fullName}
		</div>

		{#if isCurrent}
			<BaseButton
				variant="text"
				width="fit-content"
				type="button"
				on:click={() => goto(`/classroom/${meeting.id}`)}
			>
				Hadiri
			</BaseButton>
		{/if}
	</div>
</div>

<style>
	.card {
		min-width: 260px;
		background: var(--card-bg);
		padding: 16px;
		border-radius: 16px;
		display: flex;
		gap: 12px;
		flex-direction: column;
		box-shadow: 0 1px 2px rgba(3, 18, 26, 0.2);
		border: 1px solid var(--border-color);
	}

	.card.active {
		border-color: var(--accent-color);
	}

	.time {
		font-size: 14px;
		color: var(--text-ternary);
		display: flex;
		gap: 6px;
	}

	.subject {
		font-weight: bold;
		font-size: 18px;
		margin-top: 4px;
		margin-bottom: 2px;
	}

	.desc {
		font-size: 14px;
		margin-top: 4px;
	}

	.footer {
		margin-top: auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
