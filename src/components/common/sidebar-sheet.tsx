// "use client";
// import {Link} from "react-router-dom";
// import { useRouter } from "next/navigation";
// import { logo } from "../../assets";
// import axios from "../../config/axios";
// import MenuItem from "./menu-item";
// import { AxiosError } from "axios";
// import { LogOut } from "lucide-react";
// import { APP_DESCRIPTION } from "../../data";
// import useSession from "../../stores/session";

// import { toast } from "../ui/toaster";
// import { Button } from "../ui/button";
// import { useMutation } from "@tanstack/react-query";
// import { ScrollArea } from "../ui/scroll-area";
// import CollapsibleMenuItem from "./collapsible-menu-item";
// import { Dispatch, SetStateAction, useState } from "react";
// import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../ui/sheet";

// type SidebarSheetProps = {
// 	openSheet: boolean;
// 	setOpenSheet: Dispatch<SetStateAction<boolean>>;
// 	menuItems: MenuItem[];
// };

// const SidebarSheet = ({ openSheet, setOpenSheet, menuItems }: SidebarSheetProps) => {
// 	const router = useRouter();
// 	const { setSession } = useSession();
// 	const [onLogoutToast, setOnLogoutToast] = useState<string | number>();

// 	async function onLogout() {
// 		setOnLogoutToast(toast.loading("Loading...", { description: "Please wait while we log you out!" }));
// 		await axios.post("/api/auth/logout");
// 	}

// 	const { mutate, isPending } = useMutation({
// 		mutationFn: onLogout,
// 		onSuccess: () => {
// 			toast.success("Success!", { id: onLogoutToast, description: "You've successfully logged out!" });
// 			router.replace("/auth/login");
// 			setSession(null);
// 		},
// 		onError: (error: unknown) => {
// 			toast.error("Error!", { id: onLogoutToast, description: ((error as AxiosError)?.response?.data as string) ?? "An error occurred!" });
// 		},
// 	});

// 	return (
// 		<Sheet open={openSheet} onOpenChange={setOpenSheet}>
// 			<SheetContent side="left" className="flex h-full w-full max-w-72 flex-col justify-between">
// 				<SheetHeader>
// 					<SheetTitle asChild>
// 						<Button asChild className="mt-2" size="default" variant="ghost">
// 							<Link to="/">
// 								<img alt="Logo" height={40} src={logo} />
// 							</Link>
// 						</Button>
// 					</SheetTitle>
// 					<SheetDescription className="hidden">{APP_DESCRIPTION}</SheetDescription>
// 				</SheetHeader>
// 				<ScrollArea className="flex w-full flex-col items-center justify-center gap-2">
// 					<ul className="flex w-full flex-col items-center justify-center gap-1 p-1">
// 						{menuItems?.map((item: MenuItem) => (
// 							<li className="flex w-full items-center justify-center gap-1" key={item?.uuid}>
// 								{item?.subMenus?.length ? <CollapsibleMenuItem menuItem={item} /> : <MenuItem menuItem={item} />}
// 							</li>
// 						))}
// 					</ul>
// 				</ScrollArea>
// 				<Button disabled={isPending} onClick={() => mutate()} size="default" variant="ghost">
// 					<LogOut />
// 					Logout
// 				</Button>
// 			</SheetContent>
// 		</Sheet>
// 	);
// };

// export default SidebarSheet;



"use client";
import { Link, useNavigate } from "react-router-dom";
import { logo } from "../../assets";
import axios from "../../config/axios";
import MenuItem from "./menu-item";
import { AxiosError } from "axios";
import { LogOut } from "lucide-react";
import { APP_DESCRIPTION } from "../../data";
import useSession from "../../stores/session";

import { toast } from "../ui/toaster";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { ScrollArea } from "../ui/scroll-area";
import type { MenuItemType } from "./menu-item"; // or from 'types.ts' if defined there
import CollapsibleMenuItem from "./collapsible-menu-item";
import { Dispatch, SetStateAction, useState } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../ui/sheet";

type SidebarSheetProps = {
	openSheet: boolean;
	setOpenSheet: Dispatch<SetStateAction<boolean>>;
	menuItems: MenuItemType[];
};

const SidebarSheet = ({ openSheet, setOpenSheet, menuItems }: SidebarSheetProps) => {
	const navigate = useNavigate();
	const { setSession } = useSession();
	const [onLogoutToast, setOnLogoutToast] = useState<string | number>();

	async function onLogout() {
		setOnLogoutToast(toast.loading("Loading...", { description: "Please wait while we log you out!" }));
		await axios.post("/api/auth/logout");
	}

	const { mutate, isPending } = useMutation({
		mutationFn: onLogout,
		onSuccess: () => {
			toast.success("Success!", { id: onLogoutToast, description: "You've successfully logged out!" });
			navigate("/auth/login", { replace: true });
			setSession(null);
		},
		onError: (error: unknown) => {
			toast.error("Error!", {
				id: onLogoutToast,
				description: ((error as AxiosError)?.response?.data as string) ?? "An error occurred!",
			});
		},
	});

	return (
		<Sheet open={openSheet} onOpenChange={setOpenSheet}>
			<SheetContent side="left" className="flex h-full w-full max-w-72 flex-col justify-between">
				<SheetHeader>
					<SheetTitle asChild>
						<Button asChild className="mt-2" size="default" variant="ghost">
							<Link to="/">
								<img alt="Logo" height={40} src={logo} />
							</Link>
						</Button>
					</SheetTitle>
					<SheetDescription className="hidden">{APP_DESCRIPTION}</SheetDescription>
				</SheetHeader>
				<ScrollArea className="flex w-full flex-col items-center justify-center gap-2">
					<ul className="flex w-full flex-col items-center justify-center gap-1 p-1">
						{menuItems?.map((item: MenuItemType) => (
							<li className="flex w-full items-center justify-center gap-1" key={item?.uuid}>
								{item?.subMenus?.length ? <CollapsibleMenuItem menuItem={item} /> : <MenuItem menuItem={item} />}
							</li>
						))}
					</ul>
				</ScrollArea>
				<Button disabled={isPending} onClick={() => mutate()} size="default" variant="ghost">
					<LogOut />
					Logout
				</Button>
			</SheetContent>
		</Sheet>
	);
};

export default SidebarSheet;
