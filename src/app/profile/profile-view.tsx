"use client";
import { format, parse } from "date-fns";
import { Badge } from "../../components/ui/badge";
import { Dispatch, SetStateAction } from "react";
import { Separator } from "../../components/ui/separator";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "../../components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../components/ui/tooltip";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { CalendarDays, CheckCheck, Compass, Crown, Dna, Earth, Flag, LocateFixed, Mail, Map, MapPinned, Phone, Timer, UserRound, VenusAndMars } from "lucide-react";

type ViewDialogProps = {
	openDialog: boolean;
	setOpenDialog: Dispatch<SetStateAction<boolean>>;
	kid: Kid;
};

const ViewDialog = ({ openDialog, setOpenDialog, kid }: ViewDialogProps) => {
	return (
		<Dialog open={openDialog} onOpenChange={setOpenDialog}>
			<DialogContent className="max-w-xl" onOpenAutoFocus={event => event.preventDefault()}>
				<DialogHeader>
					<DialogTitle>{`View Kid`}</DialogTitle>
					<DialogDescription>{"View kid details"}</DialogDescription>
				</DialogHeader>
				<ScrollArea className="max-h-96 w-full px-2">
					<div className="xs:grid-cols-2 grid grid-cols-1 gap-2">
						<Avatar className="border-secondary xs:col-span-2 my-2 size-24 self-center justify-self-center border-2 p-0.5">
							<AvatarImage alt={kid?.firstName} className="rounded-full object-cover" src={kid?.user?.avatarUrl || undefined} />
							<AvatarFallback className="text-secondary text-4xl font-light">{kid?.firstName?.at(0)}</AvatarFallback>
						</Avatar>
						{kid?.title && kid?.firstName && kid?.lastName && (
							<div className="flex w-full gap-2">
								<UserRound className="stroke-secondary stroke-1" size={32} />
								<div className="flex w-full flex-col">
									<h1 className="text-muted-foreground text-xs">Name</h1>
									<p className="text-sm font-medium break-all">{kid?.middleName ? `${kid?.title} ${kid?.firstName} ${kid?.middleName} ${kid?.lastName}` : `${kid?.title} ${kid?.firstName} ${kid?.lastName}`}</p>
								</div>
							</div>
						)}
						{kid?.gender && (
							<div className="flex w-full gap-2">
								<VenusAndMars className="stroke-secondary stroke-1" size={32} />
								<div className="flex w-full flex-col">
									<h1 className="text-muted-foreground text-xs">Gender</h1>
									<p className="text-sm font-medium break-all">{kid?.gender}</p>
								</div>
							</div>
						)}
						{kid?.dateOfBirth && (
							<div className="flex w-full gap-2">
								<CalendarDays className="stroke-secondary stroke-1" size={32} />
								<div className="flex w-full flex-col">
									<h1 className="text-muted-foreground text-xs">Date of Birth</h1>
									<p className="text-sm font-medium break-all">{format(parse(kid?.dateOfBirth, "yyyy-MM-dd", new Date()), "MMM do, yyyy")}</p>
								</div>
							</div>
						)}
						{kid?.user?.email && (
							<div className="flex w-full gap-2">
								<Mail className="stroke-secondary stroke-1" size={32} />
								<div className="flex w-full flex-col">
									<h1 className="text-muted-foreground text-xs">Email</h1>
									<p className="text-sm font-medium break-all">{kid?.user?.email}</p>
								</div>
							</div>
						)}
						{kid?.user?.contactNo && (
							<div className="flex w-full gap-2">
								<Phone className="stroke-secondary stroke-1" size={32} />
								<div className="flex w-full flex-col">
									<h1 className="text-muted-foreground text-xs">Contact No</h1>
									<p className="text-sm font-medium break-all">{kid?.user?.contactNo}</p>
								</div>
							</div>
						)}
						{kid?.ethnicity && (
							<div className="flex w-full gap-2">
								<Dna className="stroke-secondary stroke-1" size={32} />
								<div className="flex w-full flex-col">
									<h1 className="text-muted-foreground text-xs">Ethnicity</h1>
									<p className="text-sm font-medium break-all">{kid?.ethnicity}</p>
								</div>
							</div>
						)}
						{kid?.nationality && (
							<div className="flex w-full gap-2">
								<Flag className="stroke-secondary stroke-1" size={32} />
								<div className="flex w-full flex-col">
									<h1 className="text-muted-foreground text-xs">Nationality</h1>
									<p className="text-sm font-medium break-all">{kid?.nationality}</p>
								</div>
							</div>
						)}
						{kid?.address?.addressLine1 && (
							<div className="flex w-full gap-2">
								<Compass className="stroke-secondary stroke-1" size={32} />
								<div className="flex w-full flex-col">
									<h1 className="text-muted-foreground text-xs">Address</h1>
									<p className="text-sm font-medium break-all">{kid?.address?.addressLine2 ? `${kid?.address?.addressLine1}, ${kid?.address?.addressLine2}` : kid?.address?.addressLine1}</p>
								</div>
							</div>
						)}
						{kid?.address?.city && (
							<div className="flex w-full gap-2">
								<MapPinned className="stroke-secondary stroke-1" size={32} />
								<div className="flex w-full flex-col">
									<h1 className="text-muted-foreground text-xs">City</h1>
									<p className="text-sm font-medium break-all">{kid?.address?.city}</p>
								</div>
							</div>
						)}
						{kid?.address?.province && (
							<div className="flex w-full gap-2">
								<Map className="stroke-secondary stroke-1" size={32} />
								<div className="flex w-full flex-col">
									<h1 className="text-muted-foreground text-xs">Province</h1>
									<p className="text-sm font-medium break-all">{kid?.address?.province}</p>
								</div>
							</div>
						)}
						{kid?.address?.country && (
							<div className="flex w-full gap-2">
								<Earth className="stroke-secondary stroke-1" size={32} />
								<div className="flex w-full flex-col">
									<h1 className="text-muted-foreground text-xs">Country</h1>
									<p className="text-sm font-medium break-all">{kid?.address?.country}</p>
								</div>
							</div>
						)}
						{kid?.address?.zipCode && (
							<div className="flex w-full gap-2">
								<LocateFixed className="stroke-secondary stroke-1" size={32} />
								<div className="flex w-full flex-col">
									<h1 className="text-muted-foreground text-xs">ZIP Code</h1>
									<p className="text-sm font-medium break-all">{kid?.address?.zipCode}</p>
								</div>
							</div>
						)}
					</div>
					{kid?.languages?.length !== 0 && (
						<>
							<Separator className="my-2" />
							<div className="flex w-full flex-col justify-center gap-2">
								<h1 className="text-muted-foreground text-xs">Known Languages</h1>
								<div className="flex w-full flex-wrap items-center gap-2">
									{kid?.languages?.map(language => (
										<Badge key={language} variant="secondary">
											{language}
										</Badge>
									))}
								</div>
							</div>
						</>
					)}
					{kid?.guardians?.length !== 0 && (
						<>
							<Separator className="my-2" />
							<div className="flex w-full flex-col justify-center gap-2">
								<h1 className="text-muted-foreground text-xs">Guardians</h1>
								<div className="xs:grid-cols-2 grid grid-cols-1 gap-2">
									{kid?.guardians?.map(guardian => (
										<div className="flex w-full items-center justify-center gap-2" key={guardian?.user?.uuid}>
											<div className="relative p-2">
												{guardian?.guardianType === "PRIMARY" && <Crown className="fill-secondary stroke-secondary absolute top-0 left-0 z-10 -rotate-45" size={16} />}
												<Avatar className="size-14 rounded-xl">
													<AvatarImage alt={guardian?.firstName} className="rounded-xl object-cover" src={guardian?.user?.avatarUrl || undefined} />
													<AvatarFallback className="rounded-xl">{guardian?.firstName?.at(0)}</AvatarFallback>
												</Avatar>
											</div>
											<div className="flex w-full flex-col items-start justify-center gap-0.5">
												<h6 className="line-clamp-1 text-left text-sm font-medium break-all">
													{guardian?.middleName ? `${guardian?.title} ${guardian?.firstName} ${guardian?.middleName} ${guardian?.lastName}` : `${guardian?.title} ${guardian?.firstName} ${guardian?.lastName}`}
												</h6>
												<p className="text-muted-foreground line-clamp-1 text-left text-xs break-all">{guardian?.user?.email}</p>
												<Badge variant="secondary">{guardian?.relationship}</Badge>
											</div>
										</div>
									))}
								</div>
							</div>
						</>
					)}
					{kid?.organizations?.length !== 0 && (
						<>
							<Separator className="my-2" />
							<div className="flex w-full flex-col justify-center gap-2">
								<h1 className="text-muted-foreground text-xs">Schools / Universities</h1>
								<div className="xs:grid-cols-2 grid grid-cols-1 gap-2">
									{kid?.organizations?.map(organization => (
										<div className="flex w-full items-center justify-center gap-2" key={organization?.uuid}>
											<Avatar className="size-14 rounded-xl">
												<AvatarImage alt={organization?.name} className="rounded-xl object-cover" src={organization?.logoUrl || undefined} />
												<AvatarFallback className="rounded-xl">{organization?.name?.at(0)}</AvatarFallback>
											</Avatar>
											<div className="flex w-full flex-col items-start justify-center">
												<h6 className="line-clamp-1 text-left text-sm font-medium break-all">{organization?.name}</h6>
												<p className="text-muted-foreground line-clamp-1 text-left text-xs break-all">{organization?.identificationNo || "N.A"}</p>
												<Badge variant="secondary">{organization?.type}</Badge>
											</div>
											{organization?.inviteStatus === "APPROVED" && (
												<TooltipProvider>
													<Tooltip>
														<TooltipTrigger asChild>
															<div className="flex size-12 shrink-0 items-center justify-center gap-1 rounded-xl">
																<CheckCheck className="stroke-success" size={24} />
															</div>
														</TooltipTrigger>
														<TooltipContent>
															<span>APPROVED</span>
														</TooltipContent>
													</Tooltip>
												</TooltipProvider>
											)}
											{organization?.inviteStatus === "PENDING" && (
												<TooltipProvider>
													<Tooltip>
														<TooltipTrigger asChild>
															<div className="flex size-12 shrink-0 items-center justify-center gap-1 rounded-xl">
																<Timer className="stroke-warning" size={24} />
															</div>
														</TooltipTrigger>
														<TooltipContent>
															<span>PENDING</span>
														</TooltipContent>
													</Tooltip>
												</TooltipProvider>
											)}
										</div>
									))}
								</div>
							</div>
						</>
					)}
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
};

export default ViewDialog;
