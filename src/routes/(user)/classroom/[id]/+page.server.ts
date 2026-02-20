import { getMeetingById } from '$features/home/api.js';

export const load = async (event) => {
	const res = await getMeetingById(event, event.params.id);

	return {
		meeting: res.data,
		token: event.locals.token
	};
};
