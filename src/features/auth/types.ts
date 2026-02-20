import type { Classroom } from "$features/home/types";

export interface User {
	id: string;
	createdAt: string;
	updatedAt: string;
	fullName: string;
	email: string;
	profileImage: string | null;
	username: string;
	gender: string | null;
	placeOfBirth: string | null;
	dateOfBirth: string | null;
	religion: string | null;
	phone: string | null;
	address: string | null;
	nip: string | null;
	title: string | null;
	educationLevel: string | null;
	subject: string | null;
	advisoryClass: string | null;
	nis: string | null;
	class: string | null;
	classId: string | null;
	parentName: string | null;
	parentPhone: string | null;
	role: string;
	status: string;
	lastLoginAt: string;
	classRelation: Classroom | null;
}

export interface LoginResponse {
	access_token: string;
	user: User;
}
