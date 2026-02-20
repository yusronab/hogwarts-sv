<script lang="ts">
	import { Plus, Pencil, Eye, Trash2 } from 'lucide-svelte';

	let {
		useCreateButton = false,
		useDeleteButton = false,
		useDetailButton = false,
		useUpdateButton = false,

		onCreateClick,
		onDeleteClick,
		onDetailClick,
		onUpdateClick
	} = $props<{
		useUpdateButton?: boolean;
		useDetailButton?: boolean;
		useDeleteButton?: boolean;
		useCreateButton?: boolean;

		onCreateClick?: () => void;
		onUpdateClick?: () => void;
		onDeleteClick?: () => void;
		onDetailClick?: () => void;
	}>();
</script>

<div class="flex gap-4">
	{#if useCreateButton}
		<button
			type="button"
			onclick={onCreateClick}
			class="bg-[#5053FF] size-6 rounded-full flex justify-center items-center p-1 cursor-pointer"
		>
			<Plus size={18} class="text-white" />
		</button>
	{/if}

	{#if useUpdateButton}
		<button
			type="button"
			onclick={onUpdateClick}
			class="bg-[#5053FF] size-6 rounded-full flex justify-center items-center p-1 cursor-pointer"
		>
			<Pencil size={18} class="text-white" />
		</button>
	{/if}

	{#if useDetailButton}
		<button
			type="button"
			onclick={onDetailClick}
			class="bg-[#5053FF] size-6 rounded-full flex justify-center items-center p-1 cursor-pointer"
		>
			<Eye size={18} class="text-white" />
		</button>
	{/if}

	{#if useDeleteButton}
		<button
			type="button"
			onclick={onDeleteClick}
			class="bg-[#FF1414] size-6 rounded-full flex justify-center items-center p-1 cursor-pointer"
		>
			<Trash2 size={18} class="text-white" />
		</button>
	{/if}
</div>
