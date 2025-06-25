type AnswerType = {
	uuid: string;
	label: string;
	value: string;
};

export const answerTypes: AnswerType[] = [
	{
		uuid: "9f038039-cb29-4086-8c6c-948ef43efcd9",
		label: "Descriptive",
		value: "DESCRIPTIVE",
	},
	{
		uuid: "9f038039-cb32-4450-9635-d553941e5737",
		label: "Multiple Choice",
		value: "MCQ",
	},
	{
		uuid: "9f038039-cb35-4c10-96ef-41e6b2058de6",
		label: "Multiple Choice Descriptive",
		value: "MCQ_DESCRIPTIVE",
	},
	{
		uuid: "9f038039-cb37-4a81-93ce-81f17b42e979",
		label: "Single Choice",
		value: "SCQ",
	},
	{
		uuid: "9f038039-cb39-4b2d-b700-ac38fc4fcd94",
		label: "Single Choice Descriptive",
		value: "SCQ_DESCRIPTIVE",
	},
];
