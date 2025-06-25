type OrganizationType = {
	uuid: string;
	label: string;
	value: string;
};

export const organizationTypes: OrganizationType[] = [
	{
		uuid: "9e07d973-4bfc-4828-b6f1-90c7c72b82a9",
		label: "Corporate",
		value: "CORPORATE",
	},
	{
		uuid: "9e07d973-4c0f-46f7-836f-c95af760d5c0",
		label: "School",
		value: "SCHOOL",
	},
	{
		uuid: "9e07d973-4c14-459a-8c2d-75d11d6ab1b9",
		label: "University",
		value: "UNIVERSITY",
	},
];
