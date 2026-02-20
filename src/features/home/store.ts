import { writable } from 'svelte/store';
import type { Attendance, Meeting, Meta } from './types';

interface StudentState {
	selectedSubjectId: string | null;
	studentAttendance: {
		items: (Meeting & {
			attendances: Attendance[];
		})[];
		meta: Meta;
	};
}

const initialState: StudentState = {
	selectedSubjectId: null,
	studentAttendance: {
		items: [],
		meta: {
			currentPage: 1,
			itemsPerPage: 10,
			totalItems: 1,
			totalPages: 1
		}
	}
};

function createStudentStore() {
	const { subscribe, set, update } = writable<StudentState>(initialState);

	return {
		subscribe,

		setStore: (data: StudentState) => set(data),

		updateState: (partial: Partial<StudentState>) =>
			update((state) => ({
				...state,
				...partial
			})),

		setSelectedSubjectId: (id: string | null) =>
			update((state) => ({
				...state,
				selectedSubjectId: id
			})),

		setItems: (items: StudentState['studentAttendance']['items']) =>
			update((state) => ({
				...state,
				studentAttendance: {
					...state.studentAttendance,
					items
				}
			})),

		setMeta: (meta: Meta) =>
			update((state) => ({
				...state,
				studentAttendance: {
					...state.studentAttendance,
					meta
				}
			})),

		setStudentAttendance: (data: StudentState['studentAttendance']) =>
			update((state) => ({
				...state,
				studentAttendance: data
			})),

		clear: () => set(initialState)
	};
}

export const studentStore = createStudentStore();
