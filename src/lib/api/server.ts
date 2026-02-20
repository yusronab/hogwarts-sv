import { baseUrl } from '$lib/config/env';
import type { RequestEvent } from '@sveltejs/kit';

export async function apiFetchServer(
	event: RequestEvent | string,
	endpoint: string,
	options: RequestInit = {}
) {
	const token = typeof event === 'string' ? event : event.locals.token;

	const isFormData = options.body instanceof FormData;

	const response = await fetch(`${baseUrl}${endpoint}`, {
		...options,
		headers: {
			...(isFormData ? {} : { 'Content-Type': 'application/json' }),
			...(token ? { Authorization: `Bearer ${token}` } : {}),
			...options.headers
		}
	});

	if (!response.ok) {
		throw await response.json();
	}

	return response.json();
}
