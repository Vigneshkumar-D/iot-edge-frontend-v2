type Application = {
	uuid: string;
	student: Student;
	identificationNo?: string;
	inviteStatus: "PENDING" | "APPROVED" | "REJECTED";
	time: string;
	date: string;
};
