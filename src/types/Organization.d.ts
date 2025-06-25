type Organization = {
	uuid: string;
	logoUrl: string;
	name: string;
	registrationNo: string;
	dateOfEstablishment: string;
	website: string;
	email: string;
	contactNo: string;
	address: Address;
	type: "SCHOOL" | "UNIVERSITY" | "CORPORATE";
	verificationStatus: "APPROVED" | "PENDING" | "REJECTED";
	identificationNo?: string;
	isDefault?: boolean;
	inviteStatus?: "APPROVED" | "PENDING" | "REJECTED";
};
