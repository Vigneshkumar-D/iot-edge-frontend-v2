import {
	Award,
	Baby,
	Bookmark,
	BookOpenText,
	Building2,
	CircleDot,
	CircleUserRound,
	ContactRound,
	DollarSign,
	GraduationCap,
	LayoutDashboard,
	Library,
	PersonStanding,
	PlayCircle,
	ShoppingBag,
	UsersRound,
  } from "lucide-react";
  
  const MenuIcon = ({ name }) => {
	switch (name) {
	  case "/dashboard":
		return <LayoutDashboard />;
	  case "/store":
		return <ShoppingBag />;
	  case "/students":
		return <GraduationCap />;
	  case "/parents":
		return <PersonStanding />;
	  case "/guardians":
		return <PersonStanding />;
	  case "/kids":
		return <Baby />;
	  case "/employees":
		return <ContactRound />;
	  case "/courses":
		return <PlayCircle />;
	  case "/lessons":
		return <BookOpenText />;
	  case "/sections":
		return <Bookmark />;
	  case "/organizations":
		return <Building2 />;
	  case "/users":
		return <UsersRound />;
	  case "/transactions":
		return <DollarSign />;
	  case "/library":
		return <Library />;
	  case "/certificates":
		return <Award />;
	  case "/profile":
		return <CircleUserRound />;
	  default:
		return <CircleDot />;
	}
  };
  
  export default MenuIcon;
  