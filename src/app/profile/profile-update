// "use client";
// import { z } from "zod";
// import axios from "../../config/axios";
// import { format } from "date-fns";
// import { AxiosError } from "axios";
// import { KidSchema } from "@schemas/kid";
// import useSession from "@stores/session";
// import { Input } from "../../components/ui/input";
// import { toast } from "../../components/ui/toaster";
// import { Button } from "../../components/ui/button";
// import { Combobox } from "../../components/ui/combobox";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { ScrollArea } from "../../components/ui/scroll-area";
// import { DatePicker } from "../../components/ui/date-picker";
// import { useFieldArray, useForm } from "react-hook-form";
// import { Dispatch, SetStateAction, useState } from "react";
// import { generateIdentificationNo } from "../lib/generateIdentificationNo";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form";
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion";
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../components/ui/dialog";
// import { DEFAULT_SCHOOL_UNIVERSITY_UUID, ethnicities, genders, languages, nationalities, relationships, titles } from "@data";
// import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../../components/ui/select";
// import { ContactRound, Handshake, Mail, X, Plus, UsersRound, CalendarDays, Flag, Languages, GraduationCap, Hash, Pencil, Dna, VenusAndMars, Loader2, PersonStanding } from "lucide-react";

// type UpsertDialogProps = {
// 	openDialog: boolean;
// 	setOpenDialog: Dispatch<SetStateAction<boolean>>;
// 	kid?: Kid;
// };

// const UpsertDialog = ({ openDialog, setOpenDialog, kid }: UpsertDialogProps) => {
// 	const queryClient = useQueryClient();
// 	const { session } = useSession();
// 	const [onUpsertToast, setOnUpsertToast] = useState<string | number>();
// 	const [activeSection, setActiveSection] = useState<string>("basic_details");

// 	const defaultValues: z.infer<typeof KidSchema> = {
// 		title: kid?.title || "",
// 		firstName: kid?.firstName || "",
// 		middleName: kid?.middleName || "",
// 		lastName: kid?.lastName || "",
// 		gender: kid?.gender || "",
// 		dateOfBirth: kid?.dateOfBirth ? new Date(kid?.dateOfBirth) : undefined,
// 		email: kid?.user?.email || "",
// 		languages: kid?.languages || [],
// 		ethnicity: kid?.ethnicity || "",
// 		nationality: kid?.nationality || "",
// 		guardians: kid?.guardians
// 			? kid?.guardians?.map(guardian => ({
// 					uuid: guardian?.user?.uuid,
// 					relationship: guardian?.relationship || "",
// 					guardianType: guardian?.guardianType || "SECONDARY",
// 				}))
// 			: [{ uuid: session?.uuid || "", relationship: "", guardianType: "PRIMARY" }],
// 		organizations: kid?.organizations
// 			? kid?.organizations?.map(organization => ({
// 					uuid: organization?.uuid,
// 					identificationNo: organization?.identificationNo || generateIdentificationNo(),
// 					isDefault: organization?.isDefault || true,
// 				}))
// 			: [{ uuid: DEFAULT_SCHOOL_UNIVERSITY_UUID, identificationNo: generateIdentificationNo(), isDefault: true }],
// 	};

// 	const getAllOrganizations = async () => {
// 		try {
// 			const response = await axios.get(`/api/organization/get-all?isPaged=false`);
// 			return response?.data as Organization[];
// 		} catch (error: unknown) {
// 			console.info(((error as AxiosError)?.response?.data as string) ?? "Internal server error!");
// 			return [];
// 		}
// 	};

// 	const getAllGuardians = async () => {
// 		try {
// 			const response = await axios.get(`/api/profile/get-all-guardians?isPaged=false`);
// 			return response?.data as Guardian[];
// 		} catch (error: unknown) {
// 			console.info(((error as AxiosError)?.response?.data as string) ?? "Internal server error!");
// 			return [];
// 		}
// 	};

// 	const { data: organizations, isLoading: organizationIsLoading } = useQuery<Organization[]>({
// 		queryKey: ["organizations"],
// 		queryFn: getAllOrganizations,
// 		retry: 0,
// 	});

// 	const { data: guardians, isLoading: guardianIsLoading } = useQuery<Guardian[]>({
// 		queryKey: ["guardians"],
// 		queryFn: getAllGuardians,
// 		retry: 0,
// 	});

// 	const form = useForm<z.infer<typeof KidSchema>>({
// 		defaultValues: defaultValues,
// 		mode: "onTouched",
// 		resolver: zodResolver(KidSchema),
// 	});

// 	const { fields: guardianFields, insert: insertGuardian, remove: removeGuardian } = useFieldArray({ name: "guardians", control: form.control });
// 	const { fields: organizationFields, insert: insertOrganization, remove: removeOrganization } = useFieldArray({ name: "organizations", control: form.control });

// 	const onClear = () => {
// 		form.reset(defaultValues);
// 		form.clearErrors();
// 	};

// 	const onOpenChange = (open: boolean) => {
// 		onClear();
// 		setOpenDialog(open);
// 	};

// 	const onAdd = async (values: z.infer<typeof KidSchema>) => {
// 		setOnUpsertToast(toast.loading("Loading...", { description: "Please wait while we add your kid!" }));
// 		const dateOfBirth = format(values?.dateOfBirth as Date, "yyyy-MM-dd");
// 		const { title, firstName, middleName, lastName, gender, email, languages, ethnicity, nationality, guardians, organizations } = values;
// 		await axios.post("/api/profile/create-child", {
// 			title,
// 			firstName,
// 			middleName,
// 			lastName,
// 			gender,
// 			dateOfBirth,
// 			email,
// 			languages,
// 			ethnicity,
// 			nationality,
// 			guardians,
// 			organizations,
// 		});
// 	};

// 	const onUpdate = async (values: z.infer<typeof KidSchema>) => {
// 		setOnUpsertToast(toast.loading("Loading...", { description: "Please wait while we update your kid!" }));
// 		const dateOfBirth = format(values?.dateOfBirth as Date, "yyyy-MM-dd");
// 		const { title, firstName, middleName, lastName, gender, email, languages, ethnicity, nationality, guardians, organizations } = values;
// 		await axios.put(`/api/profile/update-child?childUuid=${kid?.user?.uuid}`, {
// 			title,
// 			firstName,
// 			middleName,
// 			lastName,
// 			gender,
// 			dateOfBirth,
// 			email,
// 			languages,
// 			ethnicity,
// 			nationality,
// 			guardians,
// 			organizations,
// 		});
// 	};

// 	const { mutate, isPending } = useMutation({
// 		mutationFn: kid?.user?.uuid ? onUpdate : onAdd,
// 		onSuccess: () => {
// 			queryClient.refetchQueries({ queryKey: ["kids"] });
// 			if (kid?.user?.uuid) {
// 				toast.success("Success!", { id: onUpsertToast, description: "You've successfully updated your kid!" });
// 			} else {
// 				toast.success("Success!", { id: onUpsertToast, description: "You've successfully added your kid!" });
// 			}
// 			onOpenChange(false);
// 		},
// 		onError: (error: unknown) => {
// 			toast.error("Error!", { id: onUpsertToast, description: ((error as AxiosError)?.response?.data as string) ?? "An error occurred!" });
// 		},
// 	});

// 	return (
// 		<Dialog open={openDialog} onOpenChange={onOpenChange}>
// 			<DialogContent onOpenAutoFocus={event => event.preventDefault()}>
// 				<DialogHeader>
// 					<DialogTitle>{kid?.uuid ? "Update Kid" : "New Kid"}</DialogTitle>
// 					<DialogDescription>{kid?.uuid ? "Update the kid details" : "Enter the kid details"}</DialogDescription>
// 				</DialogHeader>
// 				<Form {...form}>
// 					<form className="flex w-full flex-col items-center justify-center gap-3" onSubmit={form.handleSubmit(values => mutate(values))}>
// 						<ScrollArea className="max-h-96 w-full">
// 							<Accordion className="px-2" collapsible onValueChange={setActiveSection} type="single" value={activeSection}>
// 								<AccordionItem className="border-none" value="basic_details">
// 									<AccordionTrigger>Basic Details</AccordionTrigger>
// 									<AccordionContent>
// 										<div className="xs:grid-cols-2 grid grid-cols-1 gap-2 p-3">
// 											<FormField
// 												control={form.control}
// 												name="title"
// 												render={({ field }) => (
// 													<FormItem className="w-full">
// 														<FormLabel>
// 															Title
// 															<span className="text-destructive">*</span>
// 														</FormLabel>
// 														<FormControl>
// 															<Combobox emptyLabel="No Titles" label="Title" options={titles} placeholder="Select title" startContent={<Handshake size={16} />} {...field} />
// 														</FormControl>
// 														<FormMessage />
// 													</FormItem>
// 												)}
// 											/>
// 											<FormField
// 												control={form.control}
// 												name="firstName"
// 												render={({ field }) => (
// 													<FormItem className="w-full">
// 														<FormLabel>
// 															First Name
// 															<span className="text-destructive">*</span>
// 														</FormLabel>
// 														<FormControl>
// 															<Input placeholder="Enter first name" startContent={<ContactRound size={16} />} {...field} />
// 														</FormControl>
// 														<FormMessage />
// 													</FormItem>
// 												)}
// 											/>
// 											<FormField
// 												control={form.control}
// 												name="middleName"
// 												render={({ field }) => (
// 													<FormItem className="w-full">
// 														<FormLabel>Middle Name</FormLabel>
// 														<FormControl>
// 															<Input placeholder="Enter middle name" startContent={<ContactRound size={16} />} {...field} />
// 														</FormControl>
// 														<FormMessage />
// 													</FormItem>
// 												)}
// 											/>
// 											<FormField
// 												control={form.control}
// 												name="lastName"
// 												render={({ field }) => (
// 													<FormItem className="w-full">
// 														<FormLabel>
// 															Last Name
// 															<span className="text-destructive">*</span>
// 														</FormLabel>
// 														<FormControl>
// 															<Input placeholder="Enter last name" startContent={<ContactRound size={16} />} {...field} />
// 														</FormControl>
// 														<FormMessage />
// 													</FormItem>
// 												)}
// 											/>
// 											<FormField
// 												control={form.control}
// 												name="gender"
// 												render={({ field }) => (
// 													<FormItem className="w-full">
// 														<FormLabel>
// 															Gender
// 															<span className="text-destructive">*</span>
// 														</FormLabel>
// 														<FormControl>
// 															<Combobox emptyLabel="No Genders" label="Gender" options={genders} placeholder="Select gender" startContent={<VenusAndMars size={16} />} {...field} />
// 														</FormControl>
// 														<FormMessage />
// 													</FormItem>
// 												)}
// 											/>
// 											<FormField
// 												control={form.control}
// 												name="dateOfBirth"
// 												render={({ field }) => (
// 													<FormItem>
// 														<FormLabel>
// 															Date of Birth
// 															<span className="text-destructive">*</span>
// 														</FormLabel>
// 														<FormControl>
// 															<DatePicker disabledRange={date => date > new Date() || date < new Date("1900-01-01")} placeholder="Select date of birth" startContent={<CalendarDays size={16} />} {...field} />
// 														</FormControl>
// 														<FormMessage />
// 													</FormItem>
// 												)}
// 											/>
// 											<FormField
// 												control={form.control}
// 												name="email"
// 												render={({ field }) => (
// 													<FormItem className="w-full">
// 														<FormLabel>
// 															Email
// 															<span className="text-destructive">*</span>
// 														</FormLabel>
// 														<FormControl>
// 															<Input placeholder="Enter email" startContent={<Mail size={16} />} {...field} />
// 														</FormControl>
// 														<FormMessage />
// 													</FormItem>
// 												)}
// 											/>
// 											<FormField
// 												control={form.control}
// 												name="languages"
// 												render={({ field }) => (
// 													<FormItem className="w-full">
// 														<FormLabel>
// 															Languages
// 															<span className="text-destructive">*</span>
// 														</FormLabel>
// 														<FormControl>
// 															<Combobox emptyLabel="No Languages" label="Languages" multiple options={languages} placeholder="Select languages" startContent={<Languages size={16} />} variant="secondary" {...field} />
// 														</FormControl>
// 														<FormMessage />
// 													</FormItem>
// 												)}
// 											/>
// 											<FormField
// 												control={form.control}
// 												name="ethnicity"
// 												render={({ field }) => (
// 													<FormItem className="w-full">
// 														<FormLabel>
// 															Ethnicity
// 															<span className="text-destructive">*</span>
// 														</FormLabel>
// 														<FormControl>
// 															<Combobox emptyLabel="No Ethnicities" label="Ethnicity" options={ethnicities} placeholder="Select ethnicity" startContent={<Dna size={16} />} {...field} />
// 														</FormControl>
// 														<FormMessage />
// 													</FormItem>
// 												)}
// 											/>
// 											<FormField
// 												control={form.control}
// 												name="nationality"
// 												render={({ field }) => (
// 													<FormItem className="w-full">
// 														<FormLabel>
// 															Nationality
// 															<span className="text-destructive">*</span>
// 														</FormLabel>
// 														<FormControl>
// 															<Combobox emptyLabel="No Nationalities" label="Nationality" options={nationalities} placeholder="Select nationality" startContent={<Flag size={16} />} {...field} />
// 														</FormControl>
// 														<FormMessage />
// 													</FormItem>
// 												)}
// 											/>
// 										</div>
// 									</AccordionContent>
// 								</AccordionItem>
// 								<AccordionItem className="border-none" value="guardian_details">
// 									<AccordionTrigger>Guardian Details</AccordionTrigger>
// 									<AccordionContent>
// 										{guardianFields?.map((field, index) => (
// 											<div className="relative w-full pt-3" key={field.id}>
// 												<div className="absolute top-0 right-3 flex items-center justify-center gap-1">
// 													<Button className="size-8" disabled={guardianFields?.length >= (guardians?.length || 0)} onClick={() => insertGuardian(index + 1, { uuid: "", relationship: "", guardianType: "SECONDARY" })} size="icon" type="button" variant="ghost">
// 														<Plus size={16} />
// 													</Button>
// 													<Button className="size-8" disabled={index === 0} onClick={() => removeGuardian(index)} size="icon" type="button" variant="ghost">
// 														<X size={16} />
// 													</Button>
// 												</div>
// 												<div className="xs:grid-cols-2 grid grid-cols-1 gap-2 p-3">
// 													<FormField
// 														control={form.control}
// 														name={`guardians.${index}.uuid`}
// 														render={({ field }) => (
// 															<FormItem className="w-full">
// 																<FormLabel>
// 																	Guardian
// 																	<span className="text-destructive">*</span>
// 																</FormLabel>
// 																<Select disabled={form.watch("guardians")[index]?.guardianType === "PRIMARY"} name="guardianUuid" onValueChange={field.onChange} defaultValue={field.value}>
// 																	<FormControl>
// 																		<SelectTrigger startContent={guardianIsLoading ? <Loader2 className="animate-spin" size={16} /> : <PersonStanding size={16} />}>
// 																			<SelectValue placeholder="Select guardian" />
// 																		</SelectTrigger>
// 																	</FormControl>
// 																	<SelectContent>
// 																		<SelectGroup>
// 																			<SelectLabel>{guardians?.length ? "Guardian" : "No Guardians!"}</SelectLabel>
// 																			{guardians?.map((guardian: Guardian) => (
// 																				<SelectItem disabled={guardianFields?.some(field => field?.uuid === guardian?.user?.uuid)} key={guardian?.user?.uuid} value={guardian?.user?.uuid}>
// 																					{guardian?.middleName ? `${guardian?.title} ${guardian?.firstName} ${guardian?.middleName} ${guardian?.lastName}` : `${guardian?.title} ${guardian?.firstName} ${guardian?.lastName}`}
// 																				</SelectItem>
// 																			))}
// 																		</SelectGroup>
// 																	</SelectContent>
// 																</Select>
// 																<FormMessage />
// 															</FormItem>
// 														)}
// 													/>
// 													<FormField
// 														control={form.control}
// 														name={`guardians.${index}.relationship`}
// 														render={({ field }) => (
// 															<FormItem className="w-full">
// 																<FormLabel>
// 																	Relationship
// 																	<span className="text-destructive">*</span>
// 																</FormLabel>
// 																<FormControl>
// 																	<Combobox
// 																		disabled={form.watch("guardians")[index]?.guardianType === "PRIMARY" && !!kid?.user?.uuid}
// 																		emptyLabel="No Relationships"
// 																		label="Relationship"
// 																		options={relationships}
// 																		placeholder="Select relationship"
// 																		startContent={<UsersRound size={16} />}
// 																		{...field}
// 																	/>
// 																</FormControl>
// 																<FormMessage />
// 															</FormItem>
// 														)}
// 													/>
// 												</div>
// 											</div>
// 										))}
// 									</AccordionContent>
// 								</AccordionItem>
// 								<AccordionItem className="border-none" value="school_university_details">
// 									<AccordionTrigger>School / University Details</AccordionTrigger>
// 									<AccordionContent>
// 										{organizationFields?.map((field, index) => (
// 											<div className="relative w-full pt-3" key={field.id}>
// 												<div className="absolute top-0 right-3 flex items-center justify-center gap-1">
// 													<Button className="size-8" disabled={organizationFields?.length >= (organizations?.length || 0)} onClick={() => insertOrganization(index + 1, { uuid: "", identificationNo: "", isDefault: false })} size="icon" type="button" variant="ghost">
// 														<Plus size={16} />
// 													</Button>
// 													<Button className="size-8" disabled={index === 0} onClick={() => removeOrganization(index)} size="icon" type="button" variant="ghost">
// 														<X size={16} />
// 													</Button>
// 												</div>
// 												<div className="xs:grid-cols-2 grid grid-cols-1 gap-2 p-3">
// 													<FormField
// 														control={form.control}
// 														name={`organizations.${index}.uuid`}
// 														render={({ field }) => (
// 															<FormItem className="w-full">
// 																<FormLabel>
// 																	School / University
// 																	<span className="text-destructive">*</span>
// 																</FormLabel>
// 																<Select disabled={form.watch("organizations")[index]?.isDefault === true} name="organizationUuid" onValueChange={field.onChange} defaultValue={field.value}>
// 																	<FormControl>
// 																		<SelectTrigger startContent={organizationIsLoading ? <Loader2 className="animate-spin" size={16} /> : <GraduationCap size={16} />}>
// 																			<SelectValue placeholder="Select school / university" />
// 																		</SelectTrigger>
// 																	</FormControl>
// 																	<SelectContent>
// 																		<SelectGroup>
// 																			<SelectLabel>{guardians?.length ? "School / University" : "No Schools / Universities!"}</SelectLabel>
// 																			{organizations?.map((organization: Organization) => (
// 																				<SelectItem disabled={organizationFields?.some(field => field?.uuid === organization?.uuid)} key={organization?.uuid} value={organization?.uuid}>
// 																					{organization?.name}
// 																				</SelectItem>
// 																			))}
// 																		</SelectGroup>
// 																	</SelectContent>
// 																</Select>
// 																<FormMessage />
// 															</FormItem>
// 														)}
// 													/>
// 													<FormField
// 														control={form.control}
// 														name={`organizations.${index}.identificationNo`}
// 														render={({ field }) => (
// 															<FormItem className="w-full">
// 																<FormLabel>
// 																	Identification No.
// 																	<span className="text-destructive">*</span>
// 																</FormLabel>
// 																<FormControl>
// 																	<Input disabled={form.watch("organizations")[index]?.isDefault === true} placeholder="Enter identification no." startContent={<Hash size={16} />} {...field} />
// 																</FormControl>
// 																<FormMessage />
// 															</FormItem>
// 														)}
// 													/>
// 												</div>
// 											</div>
// 										))}
// 									</AccordionContent>
// 								</AccordionItem>
// 							</Accordion>
// 						</ScrollArea>
// 						<DialogFooter className="w-full gap-1">
// 							<Button disabled={isPending} onClick={() => onOpenChange(false)} type="button" variant="ghost">
// 								<X size={16} />
// 								Cancel
// 							</Button>
// 							<Button disabled={isPending} type="submit" variant={kid?.uuid ? "warning" : "success"}>
// 								{kid?.uuid ? <Pencil size={16} /> : <Plus size={16} />}
// 								{kid?.uuid ? "Update" : "Add"}
// 							</Button>
// 						</DialogFooter>
// 					</form>
// 				</Form>
// 			</DialogContent>
// 		</Dialog>
// 	);
// };

// export default UpsertDialog;
