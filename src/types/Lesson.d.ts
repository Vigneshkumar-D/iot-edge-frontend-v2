type Lesson = {
	uuid: string;
	no: string;
	name: string;
	description: string;
	duration: string;
	noOfSections: number;
	course?: Course;
	publicationStatus?: "PUBLISHED" | "UNPUBLISHED";
	status?: "COMPLETED" | "IN_PROGRESS" | "READY";
	sections?: Section[];
};
