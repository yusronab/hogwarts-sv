<script lang="ts">
	const STATUS: Record<string, string> = {
		DIBATALKAN: 'dibatalkan',
		MENUNGGU_WALI_KELAS: 'menunggu wali kelas',
		DITOLAK: 'ditolak',
		SELESAI: 'selesai',
		MENUNGGU_GURU_BK: 'menunggu guru bk',
		DIPROSES_GURU_BK: 'diproses guru bk',
		PRESENT: 'present',
		EXCUSED: 'excused',
		SICK: 'sick',
		ABSENT: 'absent',
		NULL: 'null',
		SP1: 'sp1',
		SP2: 'sp2',
		SP3: 'sp3',
		PLANNED: 'planned',
		ONGOING: 'ongoing',
		FINISHED: 'finished',
		REPORTED: 'reported'
	};

	const MAPPED_STATUS: Record<string, string> = {
		DIBATALKAN: 'Dibatalkan',
		MENUNGGU_WALI_KELAS: 'Menunggu Wali Kelas',
		DITOLAK: 'Ditolak',
		SELESAI: 'Selesai',
		MENUNGGU_GURU_BK: 'Menunggu Guru BK',
		DIPROSES_GURU_BK: 'Diproses Guru BK',
		PRESENT: 'Hadir',
		EXCUSED: 'Ijin',
		SICK: 'Sakit',
		ABSENT: 'Alfa',
		NULL: 'Alfa',
		SP1: 'SP 1',
		SP2: 'SP 2',
		SP3: 'SP 3',
		PLANNED: 'Terjadwal',
		ONGOING: 'Sedang Berlangsung',
		FINISHED: 'Selesai',
		REPORTED: 'Dikirim ke BK'
	};

	let { status = '' } = $props();

	const lowerCaseStatus = $derived(status?.toLowerCase() || '');

	const variant = $derived(() => {
		switch (lowerCaseStatus) {
			case STATUS.DIBATALKAN:
			case STATUS.DITOLAK:
			case STATUS.ABSENT:
				 case STATUS.NULL:
				return 'danger';

			case STATUS.MENUNGGU_WALI_KELAS:
				return 'primary';

			case STATUS.MENUNGGU_GURU_BK:
				return 'olive';

			case STATUS.DIPROSES_GURU_BK:
				return 'magenta';

			case STATUS.EXCUSED:
				return 'purple';

			case STATUS.SICK:
				return 'orange';

			case STATUS.SELESAI:
			case STATUS.PRESENT:
				return 'success';

			case STATUS.SP1:
				return 'sp1';

			case STATUS.SP2:
				return 'sp2';

			case STATUS.SP3:
				return 'sp3';

			case STATUS.PLANNED:
				return 'planned';

			case STATUS.ONGOING:
				return 'ongoing';

			case STATUS.FINISHED:
				return 'finished';

			case STATUS.REPORTED:
				return 'reported';

			default:
				return 'default';
		}
	});

	const displayText = $derived(MAPPED_STATUS[status?.toUpperCase()] || status);
</script>

<div class={`chip ${variant()}`}>
	{displayText}
</div>

<style>
	.chip {
		display: inline-block;
		padding: 2px 12px;
		border-radius: 999px;
		font-size: 14px;
		font-weight: 700;
		text-align: center;
		width: fit-content;
	}

	/* DEFAULT */
	.default {
		background: #e0e7ff;
		color: #3730a3;
	}

	/* SOLID COLORS */
	.danger {
		background: #e33a3a;
		color: white;
	}

	.primary {
		background: #4979e2;
		color: white;
	}

	.olive {
		background: #97a837;
		color: white;
	}

	.magenta {
		background: #a83786;
		color: white;
	}

	.purple {
		background: #7657ff;
		color: white;
	}

	.orange {
		background: #ffad23;
		color: white;
	}

	.success {
		background: #279b24;
		color: white;
	}

	/* BORDERED VARIANTS */
	.sp1 {
		color: #f2b705;
		border: 1px solid #f2b705;
	}

	.sp2 {
		color: #f97316;
		border: 1px solid #f97316;
	}

	.sp3 {
		color: #dc2626;
		border: 1px solid #dc2626;
	}

	.planned {
		color: #0284c7;
		border: 1px solid #0284c7;
	}

	.ongoing {
		color: #eab308;
		border: 1px solid #eab308;
	}

	.finished {
		color: #16a34a;
		border: 1px solid #16a34a;
	}

	.reported {
		color: #7c3aed;
		border: 1px solid #7c3aed;
	}
</style>
