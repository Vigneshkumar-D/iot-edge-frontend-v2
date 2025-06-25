type Question = {
	uuid: string;
	title: string;
	answerType: "DESCRIPTIVE" | "MCQ" | "MCQ_DESCRIPTIVE" | "SCQ" | "SCQ_DESCRIPTIVE";
	options: Option[];
	note?: string;
	score?: string;
	answer?: Answer;
};
