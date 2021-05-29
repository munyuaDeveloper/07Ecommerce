export interface User_role {
	id: string;
	name: string;
}

export interface UserDetails {
	id: number;
	email: string;
	name: string;
	user_roles: User_role[];
}