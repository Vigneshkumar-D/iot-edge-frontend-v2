type Section = {
	uuid: string;
	no: string;
	name: string;
	description: string;
	duration: string;
	type: "QUIZ" | "VIDEO";
	resourceUrl: string;
	questions: Question[];
	score: number;
	lesson?: Lesson;
	publicationStatus?: "PUBLISHED" | "UNPUBLISHED";
	status?: "COMPLETED" | "IN_PROGRESS" | "READY";
};