<script lang="ts">
	import { onMount } from 'svelte';
	import BaseButton from './BaseButton.svelte';
	import { baseImageUrl } from '$lib/config/env';

	const { currentImage, name = 'profileImage' } = $props<{
		currentImage: string | null;
		name?: string;
	}>();

	let previewUrl = $state<string | null>(null);
	let fileInput = $state<HTMLInputElement>();
	let removeImage = $state<boolean>(false);

	// kalau user sudah punya foto
	onMount(() => {
		if (currentImage) {
			previewUrl = currentImage;
		}
	});

	function handleFileChange(event: Event) {
		const target = event.target as HTMLInputElement;
		const file = target.files?.[0];
		if (file) {
			if (previewUrl) {
				URL.revokeObjectURL(previewUrl);
			}
			previewUrl = URL.createObjectURL(file);
			previewUrl = previewUrl;
			removeImage = false;
		}
	}

	function triggerUpload() {
		fileInput?.click();
	}

	function handleRemove() {
		previewUrl = null;
		removeImage = true;

		if (fileInput) fileInput.value = '';
	}
</script>

<div class="flex flex-col items-center gap-3">
	<!-- Preview -->
	<div
		class="w-32 h-32 rounded-full overflow-hidden bg-muted flex items-center justify-center border"
	>
		{#if previewUrl}
			<img
				src={previewUrl.includes('blob:http:') ? previewUrl : baseImageUrl + previewUrl}
				alt="Profile"
				class="w-full h-full object-cover"
			/>
		{:else}
			<!-- icon default -->
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="w-12 h-12 text-gray-400"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M5.121 17.804A9 9 0 1118.88 17.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
				/>
			</svg>
		{/if}
	</div>

	<!-- Hidden input -->
	<input
		type="file"
		{name}
		accept="image/*"
		class="hidden"
		bind:this={fileInput}
		onchange={handleFileChange}
	/>

	<input type="hidden" name="removeProfileImage" value={removeImage ? 'true' : 'false'} />

	<!-- Button -->
	<div class="flex gap-2 w-full">
		<BaseButton type="button" on:click={triggerUpload} variant="text">Ubah Foto</BaseButton>

		<BaseButton
			type="button"
			on:click={handleRemove}
			variant="text"
			disabled={removeImage}
			color="tomato"
		>
			Hapus
		</BaseButton>
	</div>
</div>
