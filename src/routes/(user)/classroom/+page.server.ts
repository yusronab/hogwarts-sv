import { getStudentSubjects } from '$features/home/api';

export const load = async (event) => {
	const res = await getStudentSubjects(event);

	return {
		subjects: res.data,
		token: event.locals.token,
		title: `Kelas ${event.locals.user?.classRelation?.name}`
	};
};
