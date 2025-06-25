type Token = {
	uuid: string | null;
	avatarUrl: string | null;
	name: string | null;
	email: string | null;
	contactNo: string | null;
	organization: {
		uuid: string | null;
		logoUrl: string | null;
		name: string | null;
		email: string | null;
		contactNo: string | null;
		website: string | null;
	};
	roles: string[];
	exp: number;
	iat: number;
	sub: string;
};
