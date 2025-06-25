type UserType = {
	uuid: string;
	label: string;
	value: string;
};
export const userTypes: UserType[] = [
	{
		uuid: "9de7507e-6140-4f59-be77-4204b932526c",
		label: "Creator",
		value: "CREATOR",
	},
	{
		uuid: "9de7507e-614d-437d-8bbb-f3a0ecabd651",
		label: "Learner",
		value: "LEARNER",
	},
	{
		uuid: "9de7507e-6152-4146-9e24-8c0f026898c6",
		label: "Parent / Guardian",
		value: "GUARDIAN",
	},
];
