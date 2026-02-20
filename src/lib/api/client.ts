import { baseUrl } from '$lib/config/env';

export async function apiFetch(endpoint: string, options: RequestInit = {}, token?: string) {
	const headers: HeadersInit = {
		'Content-Type': 'application/json',
		...(token ? { Authorization: `Bearer ${token}` } : {}),
		...options.headers
	};

	const response = await fetch(`${baseUrl}${endpoint}`, {
		...options,
		headers
	});

	if (!response.ok) {
		const result = await response.json();
		throw result;
	}

	return response.json();
}
