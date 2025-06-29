// "use client";
// import React from "react";
// import Link from "next/link";
// import { cn } from "../../lib/utils";
// import MenuIcon from "./menu-icon";
// import { usePathname } from "next/navigation";
// import { Button } from "../../components/ui/button";
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@components/ui/tooltip";

// type MenuItemProps = {
// 	menuItem: MenuItem;
// 	sidebarIsOpen?: boolean;
// };

// const MenuItem = ({ menuItem, sidebarIsOpen = true }: MenuItemProps) => {
// 	const path = usePathname();

// 	return (
// 		<TooltipProvider disableHoverableContent>
// 			<Tooltip delayDuration={100}>
// 				<TooltipTrigger asChild>
// 					<Button className={cn(sidebarIsOpen && "w-full justify-start", !path.includes(menuItem?.src) && "text-foreground")} size={sidebarIsOpen ? "default" : "icon"} variant={path.includes(menuItem?.src) ? "default" : "ghost"} asChild>
// 						<Link href={menuItem?.src}>
// 							<MenuIcon name={menuItem?.src} />
// 							<span className={cn("w-full truncate transition-transform duration-300 ease-in-out", sidebarIsOpen ? "translate-x-0" : "hidden -translate-x-96")}>{menuItem?.name}</span>
// 						</Link>
// 					</Button>
// 				</TooltipTrigger>
// 				{sidebarIsOpen === false && <TooltipContent side="right">{menuItem?.name}</TooltipContent>}
// 			</Tooltip>
// 		</TooltipProvider>
// 	);
// };

// export default MenuItem;


"use client";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";
import MenuIcon from "./menu-icon";
import { useLocation } from "react-router-dom";

import { Button } from "../../components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../../components/ui/tooltip";

// ✅ Define and export this type if needed elsewhere
export type MenuItemType = {
	uuid: string;
	name: string;
	src: string;
	subMenus?: MenuItemType[];
};

type MenuItemProps = {
	menuItem: MenuItemType;
	sidebarIsOpen?: boolean;
};

const MenuItem = ({ menuItem, sidebarIsOpen = true }: MenuItemProps) => {
	// ✅ This must be called inside the component body
	const location = useLocation();
	const path = location.pathname;

	return (
		<TooltipProvider disableHoverableContent>
			<Tooltip delayDuration={100}>
				<TooltipTrigger asChild>
					<Button
						className={cn(
							sidebarIsOpen && "w-full justify-start",
							!path.includes(menuItem?.src) && "text-foreground"
						)}
						size={sidebarIsOpen ? "default" : "icon"}
						variant={path.includes(menuItem?.src) ? "default" : "ghost"}
						asChild
					>
						<Link to={menuItem?.src}>
							<MenuIcon name={menuItem?.src} />
							<span
								className={cn(
									"w-full truncate transition-transform duration-300 ease-in-out",
									sidebarIsOpen ? "translate-x-0" : "hidden -translate-x-96"
								)}
							>
								{menuItem?.name}
							</span>
						</Link>
					</Button>
				</TooltipTrigger>
				{!sidebarIsOpen && (
					<TooltipContent side="right">{menuItem?.name}</TooltipContent>
				)}
			</Tooltip>
		</TooltipProvider>
	);
};

export default MenuItem;
