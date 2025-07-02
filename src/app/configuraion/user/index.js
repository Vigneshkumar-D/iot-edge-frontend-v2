import { useRoutes } from "react-router-dom";
import Role from "./role/component/role-list";
import User from "./user/component/user-list";

const UserIndex = () => {
  const routes = useRoutes([
    { index: true, element: <User/> },
    { path: "role", element: <Role/> },
  ]);
  return routes;
};

export default UserIndex;
