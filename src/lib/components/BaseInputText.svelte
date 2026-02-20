<script lang="ts">
	import { Eye, EyeOff } from 'lucide-svelte'; // optional icon library

	export let label: string = '';
	export let id: string = '';
	export let name: string = '';
	export let type: string = 'text';
	export let value: string = '';
	export let placeholder: string = '';
	export let error: boolean = false;
	export let helperText: string | string[] = '';
	export let required: boolean = false;
	export let disabled: boolean = false;
	export let readonly: boolean = false;

	let showPassword = false;

	$: isPassword = type === 'password';
	$: computedType = isPassword && showPassword ? 'text' : type;
</script>

<div class="wrapper">
	{#if label}
		<label for={id} class:error>
			{label}
			{#if required}<span class="required">*</span>{/if}
		</label>
	{/if}

	<div class="input-container">
		<input
			{id}
			{name}
			type={computedType}
			bind:value
			{placeholder}
			{required}
			{disabled}
			{readonly}
			class:error
			class:has-toggle={isPassword}
		/>

		{#if isPassword}
			<button type="button" class="toggle" on:click={() => (showPassword = !showPassword)}>
				{#if showPassword}
					<Eye size={20} />
				{:else}
					<EyeOff size={20} />
				{/if}
			</button>
		{/if}
	</div>

	{#if helperText}
		<small class:error class="font-normal">{helperText}</small>
	{/if}
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
	}

	label {
		font-size: 14px;
		margin-bottom: 6px;
	}

	.required {
		color: tomato;
	}

	.input-container {
		position: relative;
	}

	.input-container:before {
		transition: border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
		border-bottom: 1px solid rgba(0, 0, 0, 0.42);
	}

	.input-container:before,
	.input-container:after {
		content: '';
		left: 0;
		right: 0;
		position: absolute;
		pointer-events: none;
		bottom: -1px;
		z-index: 4;
		width: 100%;
	}

	.input-container:focus-within:before {
		border-bottom: 1px solid var(--app);
	}

	.input-container:before {
		transition: border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
		border-bottom: 1px solid rgba(0, 0, 0, 0.42);
	}

	.input-container:focus-within:before {
		border-bottom: 1px solid var(--app);
		transform: scaleX(1);
	}

	.input-container:focus-within:after {
		border-bottom: 2px solid var(--app);
		transform: scaleX(1);
	}

	.input-container:after {
		content: '';
		transform: scaleX(0);
		transition: transform 250ms cubic-bezier(0, 0, 0.2, 1) 0ms;
		will-change: transform;
		border-bottom: 2px solid var(--app);
		border-bottom-color: var(--app);
	}

	input::placeholder {
		transition: opacity 250ms cubic-bezier(0, 0, 0.2, 1) 0ms;
		opacity: 1;
		user-select: none;
		color: rgba(255, 255, 255, 0.582);
	}

	input:focus,
	input:active {
		outline: none;
	}

	.input-container:focus-within input,
	.input-container input:focus,
	.input-container input:active {
		background-color: #353535;
	}

	.input-container:focus-within input::placeholder {
		opacity: 0;
	}

	input {
		box-sizing: border-box;
		border-radius: 8px 8px 0px 0px;
		box-shadow: 0px 2px 5px rgb(35 35 35 / 30%);
		max-height: 44px;
		background-color: #252525;
		transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
		transition-duration: 200ms;
		transition-property: background-color;
		color: #e8e8e8;
		font-size: 14px;
		font-weight: 500;
		padding: 12px;
		width: 100%;
		border-top: 2px solid var(--input);
		border-left: none;
		border-bottom: none;
		border-right: none;
	}

	input.has-toggle {
		padding-right: 44px;
	}

	input.error {
		border-color: tomato;
	}

	.toggle {
		position: absolute;
		right: 10px;
		top: 50%;
		transform: translateY(-50%);
		background: none;
		border: none;
		cursor: pointer;
		color: var(--ring);
	}

	small.error {
		color: tomato;
	}
</style>
