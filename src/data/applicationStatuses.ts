type ApplicationStatus = {
	uuid: string;
	label: string;
	value: string;
};

export const applicationStatuses: ApplicationStatus[] = [
	{
		uuid: "9e75c206-321a-44e7-9ac4-44c9114260d6",
		label: "All",
		value: "ALL",
	},
	{
		uuid: "9e75c206-3226-4a8f-adc3-2ba810cec374",
		label: "Approved",
		value: "APPROVED",
	},
	{
		uuid: "9e75c206-3228-41fa-959a-b2f7c93ebdcc",
		label: "Pending",
		value: "PENDING",
	},
	{
		uuid: "9e75c206-322a-4989-8455-9166291520d9",
		label: "Rejected",
		value: "REJECTED",
	},
];
