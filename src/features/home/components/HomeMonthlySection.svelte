<script lang="ts">
	import type { StudentMonthlyAttendanceResponse } from '../types';
	import * as Chart from '$lib/components/ui/chart/index.js';
	import { BarChart, type ChartContextValue } from 'layerchart';
	import { cubicInOut } from 'svelte/easing';

	const { records = [] } = $props<{
		records: StudentMonthlyAttendanceResponse['data']['records'];
	}>();

	const chartConfig = {
		present: { label: 'Hadir', color: 'var(--chart-2)' },
		late: { label: 'Telat', color: 'var(--chart-1)' },
		excused: { label: 'Ijin', color: 'var(--chart-3)' },
		sick: { label: 'Sakit', color: 'var(--chart-4)' },
		absent: { label: 'Alpa', color: 'var(--chart-5)' },
	} satisfies Chart.ChartConfig;

	const chartLegend = Object.entries(chartConfig).map(([key, config]) => ({
		key,
		label: config.label,
		color: config.color
	}));

	let context = $state<ChartContextValue>();
</script>

<section class="space-y-6">
	<h2>Statistik Bulanan</h2>
	<Chart.Container config={chartConfig}>
		<BarChart
			bind:context
			data={records}
			x="month"
			axis="x"
			series={chartLegend}
			seriesLayout="group"
			rule={false}
			props={{
				bars: {
					stroke: 'none',
					strokeWidth: 0,
					rounded: 'all',
					initialY: context?.height,
					initialHeight: 0,
					motion: {
						y: { type: 'tween', duration: 500, easing: cubicInOut },
						height: { type: 'tween', duration: 500, easing: cubicInOut }
					}
				},
				highlight: { area: { fill: 'none' } },
				xAxis: { format: (d) => d.slice(0, 3) }
			}}
		>
			{#snippet tooltip()}
				<Chart.Tooltip indicator="dashed" />
			{/snippet}
		</BarChart>
	</Chart.Container>
</section>
