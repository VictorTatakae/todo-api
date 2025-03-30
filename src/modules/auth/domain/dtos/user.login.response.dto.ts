export type UserLoginResponseDTO = {
	user: {
		id: string;
		username: string;
		email: string;
	};
	token: string;
};
