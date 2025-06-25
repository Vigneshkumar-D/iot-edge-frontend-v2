type Employee = {
	uuid: string;
	title: string;
	firstName: string;
	middleName: string;
	lastName: string;
	gender: "MALE" | "FEMALE" | "OTHER";
	dateOfBirth: string;
	user: User;
	joiningDate: string;
	position: string;
	languages: string[];
	ethnicity: string;
	nationality: string;
	address: Address;
	status: "ACTIVE" | "INACTIVE";
};
