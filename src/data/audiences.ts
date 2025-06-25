type Audience = {
    uuid: string;
    label: string;
    value: string;
};

export const audiences: Audience[] = [
	{
		uuid: "9ed8e5c3-e0e7-46ba-9659-76efa4908470",
		label: "Everyone",
		value: "EVERYONE",
	},
	{
		uuid: "9ed8e5c3-e0f4-4374-b896-35b35200a1e3",
		label: "Parents",
		value: "GUARDIAN",
	},
	{
		uuid: "9ed8e5c3-e0f8-489a-905c-2c6695228da0",
		label: "Kids",
		value: "CHILD",
	},
	{
		uuid: "9ed8e5c3-e0fb-4907-9739-65cf7a6a7b45",
		label: "Employees",
		value: "EMPLOYEE",
	},
];