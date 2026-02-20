import {
	getStudentMonthlyAttendance,
	getStudentSubjectPercentage,
	getTodayMeetings
} from '$features/home/api';

export const load = async (event) => {
	const today = new Date().toISOString().split('T')[0];

	const [meetingsRes, subjectRes, monthlyRes] = await Promise.all([
		getTodayMeetings(event, today),
		getStudentSubjectPercentage(event),
		getStudentMonthlyAttendance(event)
	]);

	return {
		meetings: meetingsRes.data,
		percentage: subjectRes.data,
		monthly: monthlyRes.data,
		title: `Beranda ${event.locals.user?.fullName}`
	};
};
