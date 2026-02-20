import { apiFetchServer } from '$lib/api/server';
import type { RequestEvent } from '@sveltejs/kit';
import type {
	DetailMeetingResponse,
	MeetingsResponse,
	ReportsResponse,
	StudentAttendanceResponse,
	StudentMonthlyAttendanceResponse,
	StudentSubjectPercentageResponse,
	StudentSubjectsResponse
} from './types';

export async function getTodayMeetings(
	event: RequestEvent,
	date: string
): Promise<MeetingsResponse> {
	return apiFetchServer(event, `/meetings/student?date=${date}`);
}

export async function getStudentSubjectPercentage(
	event: RequestEvent
): Promise<StudentSubjectPercentageResponse> {
	return apiFetchServer(event, `/attendance/my/subject-percentage`);
}

export async function getStudentMonthlyAttendance(
	event: RequestEvent
): Promise<StudentMonthlyAttendanceResponse> {
	return apiFetchServer(event, `/attendance/my/monthly`);
}

export async function getStudentReports(
	event: RequestEvent | string,
	page = 1,
	limit = 2
): Promise<ReportsResponse> {
	return apiFetchServer(event, `/reports/student?page=${page}&limit=${limit}`);
}

export async function getMeetingById(
	event: RequestEvent,
	id: string
): Promise<DetailMeetingResponse> {
	return apiFetchServer(event, `/meetings/${id}`);
}

export async function getStudentSubjects(event: RequestEvent): Promise<StudentSubjectsResponse> {
	return apiFetchServer(event, '/schedule/student/subjects');
}

export async function getStudentAttendanceBySubjectId(
	event: RequestEvent | string,
	subjectId: string
): Promise<StudentAttendanceResponse> {
	return apiFetchServer(event, `/meetings/subjects/${subjectId}`);
}

export async function scanQrCode(
	event: RequestEvent | string,
	token: string
): Promise<DetailMeetingResponse> {
	return apiFetchServer(event, `/attendance/scan/${token}`, {
		method: 'POST',
		body: JSON.stringify({})
	});
}

export async function changePassword(
	event: RequestEvent | string,
	body: { oldPassword: string; newPassword: string }
): Promise<DetailMeetingResponse> {
	return apiFetchServer(event, '/auth/reset-password', {
		method: 'POST',
		body: JSON.stringify(body)
	});
}
