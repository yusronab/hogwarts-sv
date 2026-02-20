<script lang="ts">
	import { PieChart, ArcChart, Text } from 'layerchart';
	import type { StudentSubjectPercentageResponse } from '../types';
	import * as Chart from '$lib/components/ui/chart/index.js';

	const { records = [] } = $props<{
		records: StudentSubjectPercentageResponse['data']['records'];
	}>();
</script>

<section>
	<h2>Persentase Kehadiran</h2>

	{#each records as record}
		<div class="flex justify-between items-center">
			<div>
				<p>{record.subject}</p>
				<small>{record.count} Pertemuan</small>
			</div>
			<div class="relative w-20 h-20">
				<Chart.Container
					config={{ [record.subject]: { label: record.subject, color: 'var(--chart-2)' } }}
					class="mx-auto aspect-square max-h-20"
				>
					<ArcChart
						label="subject"
						value="percentage"
						maxValue={100}
						cornerRadius={20}
						outerRadius={-10}
						innerRadius={-6}
						series={[
							{
								key: record.subject,
								color: `var(--color-${record.subject})`,
								data: [record]
							}
						]}
						props={{
							arc: { track: { fill: 'var(--muted)' }, motion: 'tween' },
							tooltip: { context: { hideDelay: 350 } }
						}}
					>
						{#snippet aboveMarks()}
							<Text
								value={String(record.percentage + '%')}
								textAnchor="middle"
								verticalAnchor="middle"
								class="fill-foreground text-lg font-bold"
							/>
						{/snippet}
					</ArcChart>
				</Chart.Container>
			</div>
		</div>
	{/each}
</section>
