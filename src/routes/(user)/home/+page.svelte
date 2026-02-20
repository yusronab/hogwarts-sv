<script>
	import HomeMonthlySection from '$features/home/components/HomeMonthlySection.svelte';
	import HomePercentageSection from '$features/home/components/HomePercentageSection.svelte';
	import ReportSection from '$features/home/components/ReportSection.svelte';
	import TodayMeetings from '$features/home/components/TodayMeetings.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.title} | Hogwarts App</title>
</svelte:head>

<div class="grid grid-cols-3 gap-6">
	<div class="col-span-3 md:col-span-3">
		<TodayMeetings meetings={data.meetings} />
	</div>

	<div class="col-span-3 md:col-span-2">
		<ReportSection token={data.token} />
	</div>

	<div class="col-span-3 md:col-span-1">
		<HomePercentageSection records={data.percentage.records} />
	</div>

	<div class="col-span-3 md:col-span-1">
		<section class="card">CalendarCard</section>
	</div>

	<div class="col-span-3 md:col-span-2">
		<HomeMonthlySection records={data.monthly.records} />
	</div>
</div>
