<script lang="ts">
	import BaseNavbarUser from '$lib/components/BaseNavbarUser.svelte';

	let { children, data } = $props();
</script>

<BaseNavbarUser
	title="Hogwarts App"
	avatarUrl={data.user.profileImage}
	userName={data.user.username}
	nis={data.user.nis}
/>

<div class="content">
	{@render children()}
</div>

<style>
	.content {
		padding: 24px 0;
		max-width: 90vw;
		width: 1280px;
		margin: 0 auto;
	}
</style>
