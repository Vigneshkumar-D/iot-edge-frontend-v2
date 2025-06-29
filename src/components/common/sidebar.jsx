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
import { icon, logo } from "../../assets";
import MenuItem from "./menu-item";

const Sidebar = ({ menuItems }) => {
  const navigate = useNavigate();
  const { setSession } = useSession();
  const [sidebarIsOpen, setSidebarIsOpen] = useState(true);
  const [onLogoutToast, setOnLogoutToast] = useState(null);

  async function onLogout() {
    setOnLogoutToast(
      toast.loading("Loading...", {
        description: "Please wait while we log you out!",
      })
    );
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
    onError: (error) => {
      toast.error("Error!", {
        id: onLogoutToast,
        description:
          error?.response?.data || "An error occurred!",
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
          className={cn(
            "transition-transform duration-300 ease-in-out",
            sidebarIsOpen ? "rotate-0" : "rotate-180"
          )}
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
              className={cn(
                "transition-transform duration-300 ease-in-out",
                sidebarIsOpen ? "translate-x-0" : "hidden -translate-x-96"
              )}
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
          {menuItems?.map((item) => (
            <li
              className="flex w-full items-center justify-center gap-1"
              key={item?.uuid}
            >
              {item?.subMenus?.length ? (
                <CollapsibleMenuItem
                  menuItem={item}
                  sidebarIsOpen={sidebarIsOpen}
                />
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
        <span
          className={cn(
            "transition-transform duration-300 ease-in-out",
            sidebarIsOpen ? "translate-x-0" : "hidden -translate-x-96"
          )}
        >
          Logout
        </span>
      </Button>
    </aside>
  );
};

export default Sidebar;
