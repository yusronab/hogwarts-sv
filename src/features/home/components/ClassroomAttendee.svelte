<script lang="ts">
	import { authStore } from '$features/auth/store';
	import BaseButton from '$lib/components/BaseButton.svelte';
	import { RefreshCcw } from 'lucide-svelte';
	import type { Attendance } from '../types';
	import { formatDateTime } from '../utils';
	import BaseAvatar from '$lib/components/BaseAvatar.svelte';

	let { attendances = [], fetchMeeting }: { attendances: Attendance[]; fetchMeeting: () => void } =
		$props();

	let user = $derived($authStore.user);
</script>

<section class="bg-card p-4 rounded-3xl border">
	<div class="flex justify-between items-center mb-6">
		<h2>Siswa Hadir</h2>
		<BaseButton width="fit-content" variant="text" on:click={fetchMeeting}>
			<RefreshCcw />
		</BaseButton>
	</div>

	{#if attendances.length > 0}
		{#each attendances as item (item.id)}
			<div class="flex gap-2 p-2 rounded-xl {user?.id === item.student.id ? 'hover:bg-app/10' : 'hover:bg-muted'}">
				<BaseAvatar image={item.student.profileImage} alt={item.student.fullName} />

				<div class="flex flex-col md:flex-row justify-between md:items-center w-full">
					<div class="flex items-center justify-between gap-2">
						<p>{item.student.fullName}</p>

						{#if user?.id === item.student.id}
							<div class="bg-app px-2 rounded-full text-sm font-semibold">Kamu</div>
						{/if}
					</div>

					<span>
						{formatDateTime(item.presentTime)}
					</span>
				</div>
			</div>
		{/each}
	{:else}
		<p>Belum ada siswa yang hadir</p>
	{/if}
</section>
