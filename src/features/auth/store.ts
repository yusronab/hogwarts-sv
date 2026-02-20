import { writable } from 'svelte/store';
import type { User } from './types';

interface AuthState {
	token: string | null;
	user: User | null;
}

const initialState: AuthState = {
	token: null,
	user: null
};

function createAuthStore() {
	const { subscribe, set, update } = writable<AuthState>(initialState);

	return {
		subscribe,

		setAuth: (data: AuthState) => set(data),

		setToken: (token: string | null) => update((state) => ({ ...state, token })),

		setUser: (user: User | null) => update((state) => ({ ...state, user })),

		clear: () => set(initialState)
	};
}

export const authStore = createAuthStore();
