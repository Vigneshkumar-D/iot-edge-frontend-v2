type Invite = {
	uuid: string;
	name: string;
	email: string;
	status: "INVITED" | "ACCEPTED";
	time: string;
	date: string;
};
