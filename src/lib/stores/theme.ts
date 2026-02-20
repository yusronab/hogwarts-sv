import { writable } from 'svelte/store';

export type Theme = 'light' | 'dark';

function createThemeStore() {
	const isBrowser = typeof window !== 'undefined';

	const stored = isBrowser ? (localStorage.getItem('theme') as Theme | null) : null;

	const { subscribe, set, update } = writable<Theme>(stored ?? 'light');

	return {
		subscribe,

		init() {
			if (!isBrowser) return;

			const saved = localStorage.getItem('theme');

			if (saved === 'light' || saved === 'dark') {
				set(saved);
			} else {
				const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

				set(prefersDark ? 'dark' : 'light');
			}
		},

		toggle() {
			update((current) => {
				const next = current === 'light' ? 'dark' : 'light';
				localStorage.setItem('theme', next);
				return next;
			});
		},

		setTheme(theme: Theme) {
			localStorage.setItem('theme', theme);
			set(theme);
		}
	};
}

export const themeStore = createThemeStore();
