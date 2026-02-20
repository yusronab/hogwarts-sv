import type { User } from '$features/auth/types';

export interface Meeting {
	id: string;
	date: string;
	status: string;
	title: string;
	description: string;
	subject: Subject;
	teacher: User;
	schedule: Schedule;
	attendance: Attendance;
}

export interface Report {
	id: string;
	notes: string;
	reason: string;
	reportlevel: string;
	status: string;
	createdAt: string;
	teacher: User;
}

export interface Meta {
	totalItems: number;
	currentPage: number;
	itemsPerPage: number;
	totalPages: number;
}

export interface Subject {
	id: string;
	createdAt: string;
	updatedAt: string;
	name: string;
	description: string;
	category: string;
	teacherId: string;
}

export interface Classroom {
	id: string;
	createdAt: string;
	updatedAt: string;
	name: string;
	level: string;
	room: string;
	description: string;
	capacity: number;
	advisorId: string;
}

export interface Schedule {
	id: string;
	createdAt: string;
	updatedAt: string;
	day: string;
	hour_start: string;
	hour_end: string;
	teacherId: string;
	classId: string;
	subjectId: string;
	class: Classroom;
	subject: Subject;
	teacher: User;
}

export interface Attendance {
	id: string;
	createdAt: string;
	updatedAt: string;
	status: string;
	presentTime: null | string;
	meetingId: string;
	student: User;
	class: Classroom;
}

export interface DetailMeeting {
	id: string;
	createdAt: string;
	updatedAt: string;
	date: string;
	title: string;
	description: string;
	scheduleId: string;
	teacherId: string;
	status: string;
	schedule: Schedule;
	attendances: Attendance[];
}

export interface DetailMeetingResponse {
	data: DetailMeeting;
}

export interface ReportsResponse {
	data: {
		items: Report[];
		meta: Meta;
	};
}

export interface MeetingsResponse {
	data: Meeting[];
}

export interface StudentSubjectsResponse {
	data: (Subject & { teachers: User[] })[];
}

export interface StudentAttendanceResponse {
	data: {
		items: (Meeting & {
			attendances: Attendance[];
		})[];
		meta: Meta;
	};
}

export interface StudentSubjectPercentageResponse {
	data: {
		total: number;
		records: {
			subject: string;
			count: number;
			percentage: number;
		}[];
	};
}

export interface StudentMonthlyAttendanceResponse {
	data: {
		total: number;
		records: {
			month: string;
			present: number;
			late: number;
			absent: number;
			sick: number;
			excused: number;
			null: number;
		}[];
	};
}
