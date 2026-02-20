<script lang="ts">
	let { children } = $props();
</script>

<div class="app">
	<aside class="sidebar">
		<h2>Admin Panel</h2>
		<a href="/dashboard">Dashboard</a>
	</aside>

	<div class="main">
		<header class="navbar">Admin Navbar</header>

		<div class="content">
			{@render children()}
		</div>
	</div>
</div>
