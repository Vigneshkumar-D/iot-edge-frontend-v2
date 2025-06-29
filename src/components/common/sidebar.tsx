// "use client";
// import { Link } from 'react-router-dom';
// import Image from "next/image";
// import { cn } from "../../lib/utils";
// import { useState } from "react";
// import axios from "../../config/axios";
// import MenuItem from "./menu-item";
// import { AxiosError } from "axios";
// import { icon, logo } from "../../assets";
// import useSession from "@stores/session";
// import { useRouter } from "next/navigation";
// import { toast } from "../ui/toaster";
// import { Button } from "../ui/button";
// import { ChevronLeft, LogOut } from "lucide-react";
// import { useMutation } from "@tanstack/react-query";
// import { ScrollArea } from "../ui/scroll-area";
// import CollapsibleMenuItem from "./collapsible-menu-item";

// type SidebarProps = {
// 	menuItems: MenuItem[];
// };

// const Sidebar = ({ menuItems }: SidebarProps) => {
// 	const router = useRouter();
// 	const { setSession } = useSession();
// 	const [sidebarIsOpen, setSidebarIsOpen] = useState<boolean>(true);
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
// 		<aside
// 			className={cn(
// 				"border-border bg-background sticky inset-y-0 left-0 z-20 hidden h-screen shrink-0 -translate-x-full border-r py-5 transition-[width] duration-300 ease-in-out lg:flex lg:translate-x-0 lg:flex-col lg:items-center lg:justify-between",
// 				sidebarIsOpen ? "w-72 px-5" : "w-20 px-2"
// 			)}
// 		>
// 			<Button className="bg-accent absolute top-4 -right-4 hidden size-8 lg:flex" onClick={() => setSidebarIsOpen(!sidebarIsOpen)} size="icon" variant="ghost">
// 				<ChevronLeft className={cn("transition-transform duration-300 ease-in-out", sidebarIsOpen ? "rotate-0" : "rotate-180")} size={16} />
// 			</Button>
// 			<Button className="transition-transform duration-300 ease-in-out" size={sidebarIsOpen ? "default" : "icon"} variant="ghost" asChild>
// 				<Link href="/">
// 					{sidebarIsOpen ? (
// 						<Image alt="Logo" className={cn("transition-transform duration-300 ease-in-out", sidebarIsOpen ? "translate-x-0" : "hidden -translate-x-96")} height={40} priority src={logo} />
// 					) : (
// 						<Image alt="Logo" height={40} priority src={icon} width={40} />
// 					)}
// 				</Link>
// 			</Button>
// 			<ScrollArea className="flex w-full flex-col items-center justify-center gap-2">
// 				<ul className="flex w-full flex-col items-center justify-center gap-1 p-1">
// 					{menuItems?.map((item: MenuItem) => (
// 						<li className="flex w-full items-center justify-center gap-1" key={item?.uuid}>
// 							{item?.subMenus?.length ? <CollapsibleMenuItem menuItem={item} sidebarIsOpen={sidebarIsOpen} /> : <MenuItem menuItem={item} sidebarIsOpen={sidebarIsOpen} />}
// 						</li>
// 					))}
// 				</ul>
// 			</ScrollArea>
// 			<Button className="transition-transform duration-300 ease-in-out" disabled={isPending} onClick={() => mutate()} size={sidebarIsOpen ? "default" : "icon"} variant="ghost">
// 				<LogOut />
// 				<span className={cn("transition-transform duration-300 ease-in-out", sidebarIsOpen ? "translate-x-0" : "hidden -translate-x-96")}>Logout</span>
// 			</Button>
// 		</aside>
// 	);
// };

// export default Sidebar;


import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../config/axios";
import { toast } from "../ui/toaster";
import { Button } from "../ui/button";
import { ChevronLeft, LogOut } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { ScrollArea } from "../ui/scroll-area";
import CollapsibleMenuItem from "./collapsible-menu-item";
import { cn } from "../../lib/utils";
import useSession from "../../stores/session";
import { AxiosError } from "axios";
import { icon, logo } from "../../assets";
import MenuItem, { MenuItemType } from "./menu-item";

type SidebarProps = {
	menuItems: MenuItemType[];
};

const Sidebar = ({ menuItems }: SidebarProps) => {
  const navigate = useNavigate();
  const { setSession } = useSession();
  const [sidebarIsOpen, setSidebarIsOpen] = useState<boolean>(true);
  const [onLogoutToast, setOnLogoutToast] = useState<string | number>();

  async function onLogout() {
    setOnLogoutToast(toast.loading("Loading...", { description: "Please wait while we log you out!" }));
    await axios.post("/api/auth/logout");
  }

  const { mutate, isPending } = useMutation({
    mutationFn: onLogout,
    onSuccess: () => {
      toast.success("Success!", {
        id: onLogoutToast,
        description: "You've successfully logged out!",
      });
      navigate("/auth/login");
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
    <aside
      className={cn(
        "border-border bg-background sticky inset-y-0 left-0 z-20 hidden h-screen shrink-0 -translate-x-full border-r py-5 transition-[width] duration-300 ease-in-out lg:flex lg:translate-x-0 lg:flex-col lg:items-center lg:justify-between",
        sidebarIsOpen ? "w-72 px-5" : "w-20 px-2"
      )}
    >
      <Button
        className="bg-accent absolute top-4 -right-4 hidden size-8 lg:flex"
        onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
        size="icon"
        variant="ghost"
      >
        <ChevronLeft
          className={cn("transition-transform duration-300 ease-in-out", sidebarIsOpen ? "rotate-0" : "rotate-180")}
          size={16}
        />
      </Button>

      <Button
        className="transition-transform duration-300 ease-in-out"
        size={sidebarIsOpen ? "default" : "icon"}
        variant="ghost"
        asChild
      >
        <Link to="/">
          {sidebarIsOpen ? (
            <img
              alt="Logo"
              className={cn("transition-transform duration-300 ease-in-out", sidebarIsOpen ? "translate-x-0" : "hidden -translate-x-96")}
              src={logo}
              height={40}
            />
          ) : (
            <img alt="Logo" src={icon} height={40} width={40} />
          )}
        </Link>
      </Button>

      <ScrollArea className="flex w-full flex-col items-center justify-center gap-2">
        <ul className="flex w-full flex-col items-center justify-center gap-1 p-1">
          {menuItems?.map((item: MenuItemType) => (
            <li className="flex w-full items-center justify-center gap-1" key={item?.uuid}>
              {item?.subMenus?.length ? (
                <CollapsibleMenuItem menuItem={item} sidebarIsOpen={sidebarIsOpen} />
              ) : (
                <MenuItem menuItem={item} sidebarIsOpen={sidebarIsOpen} />
              )}
            </li>
          ))}
        </ul>
      </ScrollArea>

      <Button
        className="transition-transform duration-300 ease-in-out"
        disabled={isPending}
        onClick={() => mutate()}
        size={sidebarIsOpen ? "default" : "icon"}
        variant="ghost"
      >
        <LogOut />
        <span className={cn("transition-transform duration-300 ease-in-out", sidebarIsOpen ? "translate-x-0" : "hidden -translate-x-96")}>
          Logout
        </span>
      </Button>
    </aside>
  );
};

export default Sidebar;
