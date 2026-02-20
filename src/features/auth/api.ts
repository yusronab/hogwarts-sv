import { apiFetch } from '$lib/api/client';
import type { LoginResponse, User } from './types';

export function loginApi(email: string, password: string) {
	return apiFetch('/auth/login', {
		method: 'POST',
		body: JSON.stringify({ email, password })
	}) as Promise<{ data: LoginResponse }>;
}

export function getProfileApi() {
	return apiFetch('/auth/profile') as Promise<{ data: User }>;
}
