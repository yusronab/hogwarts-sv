import { baseUrl } from '$lib/config/env';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('access_token');
	event.locals.token = token ?? null;

	if (token) {
		try {
			const response = await fetch(baseUrl + '/auth/profile', {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});

			if (response.ok) {
				const { data } = await response.json();
				event.locals.user = data;
			} else {
				event.locals.user = null;
			}
		} catch {
			event.locals.user = null;
		}
	} else {
		event.locals.user = null;
	}

	return resolve(event);
};
