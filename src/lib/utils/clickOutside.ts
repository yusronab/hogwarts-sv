import type { Action } from 'svelte/action';

export const clickOutside: Action<HTMLElement, () => void> = (node, callback) => {
	let current = callback;

	function handleClick(event: MouseEvent) {
		if (!node.contains(event.target as Node)) {
			current?.();
		}
	}

	document.addEventListener('click', handleClick, true);

	return {
		update(newCallback) {
			current = newCallback;
		},
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
};
