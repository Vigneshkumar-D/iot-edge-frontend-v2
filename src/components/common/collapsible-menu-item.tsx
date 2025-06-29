// "use client";
// import {Link} from "react-router-dom";
// import { cn } from "../../lib/utils";
// import { useState } from "react";
// import MenuIcon from "./menu-icon";
// import { ChevronDown } from "lucide-react";
// import { usePathname } from "next/navigation";
// import { Button } from "../ui/button";
// import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
// import { DropdownMenu, DropdownMenuArrow, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@components/ui/dropdown-menu";

// type CollapsibleMenuItemProps = {
// 	menuItem: MenuItem;
// 	sidebarIsOpen?: boolean;
// };

// const CollapsibleMenuItem = ({ menuItem, sidebarIsOpen = true }: CollapsibleMenuItemProps) => {
// 	const path = usePathname();
// 	const [isCollapsibleOpen, setIsCollapsibleOpen] = useState<boolean>(false);

// 	return sidebarIsOpen ? (
// 		<Collapsible open={isCollapsibleOpen} onOpenChange={setIsCollapsibleOpen} className="w-full">
// 			<CollapsibleTrigger asChild>
// 				<Button className={cn("w-full justify-start", !path.includes(menuItem?.src) && "text-foreground")} size={"default"} variant={path.includes(menuItem?.src) ? "default" : "ghost"}>
// 					<MenuIcon name={menuItem?.src} />
// 					<span className="w-full truncate text-left transition-transform duration-300 ease-in-out">{menuItem?.name}</span>
// 					<ChevronDown className={cn("transition-transform duration-300", isCollapsibleOpen ? "rotate-180" : "rotate-0")} />
// 				</Button>
// 			</CollapsibleTrigger>
// 			<CollapsibleContent className="ml-5 my-1 space-y-1">
// 				{menuItem?.subMenus?.map((subMenuItem: SubMenuItem) => (
// 					<Button className={cn("w-full justify-start", !path.includes(subMenuItem?.src) && "text-foreground")} key={subMenuItem?.uuid} variant={path.includes(subMenuItem?.src) ? "default" : "ghost"} asChild>
// 						<Link href={subMenuItem?.src}>
// 							<MenuIcon name={subMenuItem?.src} />
// 							<span className="w-full truncate transition-transform duration-300 ease-in-out">{subMenuItem?.name}</span>
// 						</Link>
// 					</Button>
// 				))}
// 			</CollapsibleContent>
// 		</Collapsible>
// 	) : (
// 		<DropdownMenu>
// 			<TooltipProvider disableHoverableContent>
// 				<Tooltip delayDuration={100}>
// 					<TooltipTrigger asChild>
// 						<DropdownMenuTrigger asChild>
// 							<Button className={cn(!path.includes(menuItem?.src) && "text-foreground")} size={"icon"} variant={path.includes(menuItem?.src) ? "default" : "ghost"}>
// 								<MenuIcon name={menuItem?.src} />
// 							</Button>
// 						</DropdownMenuTrigger>
// 					</TooltipTrigger>
// 					<TooltipContent side="right">{menuItem?.name}</TooltipContent>
// 				</Tooltip>
// 			</TooltipProvider>
// 			<DropdownMenuContent side="right">
// 				<DropdownMenuLabel className="max-w-36 truncate">{menuItem?.name}</DropdownMenuLabel>
// 				<DropdownMenuSeparator />
// 				{menuItem?.subMenus?.map((subMenuItem: SubMenuItem) => (
// 					<DropdownMenuItem key={subMenuItem?.uuid} asChild>
// 						<Link className="cursor-pointer" href={subMenuItem?.src}>
// 							<p className="max-w-36 truncate">{subMenuItem?.name}</p>
// 						</Link>
// 					</DropdownMenuItem>
// 				))}
// 				<DropdownMenuArrow className="fill-accent" />
// 			</DropdownMenuContent>
// 		</DropdownMenu>
// 	);
// };

// export default CollapsibleMenuItem;


"use client";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../lib/utils";
import { useState } from "react";
import MenuIcon from "./menu-icon";
import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "../ui/collapsible";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../ui/tooltip";
import {
	DropdownMenu,
	DropdownMenuArrow,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";

// ✅ Import shared menu item type
import type { MenuItemType } from "./menu-item";

type CollapsibleMenuItemProps = {
	menuItem: MenuItemType;
	sidebarIsOpen?: boolean;
};

const CollapsibleMenuItem = ({
	menuItem,
	sidebarIsOpen = true,
}: CollapsibleMenuItemProps) => {
	const location = useLocation();
	const path = location.pathname;
	const [isCollapsibleOpen, setIsCollapsibleOpen] = useState<boolean>(false);

	return sidebarIsOpen ? (
		<Collapsible
			open={isCollapsibleOpen}
			onOpenChange={setIsCollapsibleOpen}
			className="w-full"
		>
			<CollapsibleTrigger asChild>
				<Button
					className={cn(
						"w-full justify-start",
						!path.includes(menuItem?.src) && "text-foreground"
					)}
					size="default"
					variant={path.includes(menuItem?.src) ? "default" : "ghost"}
				>
					<MenuIcon name={menuItem?.src} />
					<span className="w-full truncate text-left transition-transform duration-300 ease-in-out">
						{menuItem?.name}
					</span>
					<ChevronDown
						className={cn(
							"transition-transform duration-300",
							isCollapsibleOpen ? "rotate-180" : "rotate-0"
						)}
					/>
				</Button>
			</CollapsibleTrigger>
			<CollapsibleContent className="ml-5 my-1 space-y-1">
				{menuItem?.subMenus?.map((subMenuItem) => (
					<Button
						key={subMenuItem?.uuid}
						className={cn(
							"w-full justify-start",
							!path.includes(subMenuItem?.src) && "text-foreground"
						)}
						variant={path.includes(subMenuItem?.src) ? "default" : "ghost"}
						asChild
					>
						<Link to={subMenuItem?.src}>
							<MenuIcon name={subMenuItem?.src} />
							<span className="w-full truncate transition-transform duration-300 ease-in-out">
								{subMenuItem?.name}
							</span>
						</Link>
					</Button>
				))}
			</CollapsibleContent>
		</Collapsible>
	) : (
		<DropdownMenu>
			<TooltipProvider disableHoverableContent>
				<Tooltip delayDuration={100}>
					<TooltipTrigger asChild>
						<DropdownMenuTrigger asChild>
							<Button
								className={cn(
									!path.includes(menuItem?.src) && "text-foreground"
								)}
								size="icon"
								variant={path.includes(menuItem?.src) ? "default" : "ghost"}
							>
								<MenuIcon name={menuItem?.src} />
							</Button>
						</DropdownMenuTrigger>
					</TooltipTrigger>
					<TooltipContent side="right">
						{menuItem?.name}
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
			<DropdownMenuContent side="right">
				<DropdownMenuLabel className="max-w-36 truncate">
					{menuItem?.name}
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{menuItem?.subMenus?.map((subMenuItem) => (
					<DropdownMenuItem key={subMenuItem?.uuid} asChild>
						<Link className="cursor-pointer" to={subMenuItem?.src}>
							<p className="max-w-36 truncate">{subMenuItem?.name}</p>
						</Link>
					</DropdownMenuItem>
				))}
				<DropdownMenuArrow className="fill-accent" />
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default CollapsibleMenuItem;
