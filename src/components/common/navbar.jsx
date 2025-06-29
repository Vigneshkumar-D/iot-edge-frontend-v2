import { Link } from "react-router-dom";
import { logo } from "../../assets";
import { useState } from "react";
import { Menu } from "lucide-react";
import SidebarSheet from "./sidebar-sheet";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../ui/navigation-menu";

const Navbar = ({
  logoVisible = true,
  menuItems = [],
  session,
  sidebarVisible = true,
}) => {
  const [openSidebarSheet, setOpenSidebarSheet] = useState(false);

  const firstName = session?.name?.split(" ")?.[0] || "";
  const initial = session?.name?.charAt(0)?.toUpperCase() || "";

  return (
    <>
      {/* Uncomment if SidebarSheet is needed */}
      {/* {sidebarVisible && (
        <SidebarSheet
          openSheet={openSidebarSheet}
          setOpenSheet={setOpenSidebarSheet}
          menuItems={menuItems}
        />
      )} */}

      <nav className="bg-background sticky inset-x-0 top-0 z-10 flex h-16 w-full items-center justify-between px-4 py-2 shadow-sm">
        <div className="flex items-center gap-2">
          {sidebarVisible && (
            <Button
              className="lg:hidden"
              onClick={() => setOpenSidebarSheet((prev) => !prev)}
              size="icon"
              variant="ghost"
            >
              <Menu />
            </Button>
          )}
          {logoVisible && (
            <Button asChild className="p-0" size="default" variant="ghost">
              <Link to="/">
                <img
                  alt="Logo"
                  height={40}
                  src={logo}
                  className="h-10 w-auto object-contain"
                />
              </Link>
            </Button>
          )}
        </div>

        {session && (
          <NavigationMenu>
            <NavigationMenuList className="gap-3 items-center">
              <NavigationMenuItem className="xs:block hidden text-sm font-medium text-muted-foreground">
                Hi {firstName}
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Avatar>
                  <AvatarImage
                    src={session?.avatarUrl || undefined}
                    alt={session?.name || "Profile"}
                    className="object-cover"
                  />
                  <AvatarFallback>{initial}</AvatarFallback>
                </Avatar>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        )}
      </nav>
    </>
  );
};

export default Navbar;
