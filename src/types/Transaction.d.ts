type Transaction = {
	uuid: string;
	referenceNo: string;
	course: Course;
	user: User;
	subtotal: number;
	tax: number;
	total: number;
	currency: string;
	status: "FAILED" | "PENDING" | "SUCCESS";
	createdDate: Date;
};
