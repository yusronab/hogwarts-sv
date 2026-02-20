import { writable } from 'svelte/store';

type AlertType = 'success' | 'error' | 'confirm';

interface AlertState {
	isOpen: boolean;
	type: AlertType;
	title?: string;
	description?: string;
	onConfirm?: () => void;
	onCancel?: () => void;
	textPositive?: string;
	textNegative?: string;
}

const initialState: AlertState = {
	isOpen: false,
	type: 'success'
};

function createAlertStore() {
	const { subscribe, set, update } = writable<AlertState>(initialState);

	return {
		subscribe,

		show(payload: Partial<AlertState>) {
			set({
				...initialState,
				...payload,
				isOpen: true
			});
		},

		close() {
			update((state) => ({ ...state, isOpen: false }));
		},

		success(title: string, description?: string, onConfirm?: () => void) {
			this.show({
				type: 'success',
				title,
				description,
				textPositive: 'OK',
				onConfirm
			});
		},

		error(title: string, description?: string) {
			this.show({
				type: 'error',
				title,
				description,
				textPositive: 'OK'
			});
		},

		confirm(title: string, description: string, onConfirm: () => void) {
			this.show({
				type: 'confirm',
				title,
				description,
				onConfirm,
				textPositive: 'Yakin',
				textNegative: 'Kembali'
			});
		}
	};
}

export const alertStore = createAlertStore();
