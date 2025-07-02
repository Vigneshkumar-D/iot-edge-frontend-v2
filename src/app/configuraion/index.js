import { useRoutes } from "react-router-dom";
import UserIndex from "./user";
import ShiftIndex from "./shift";
import FirmIndex from "./firm";
import AssetIndex from "./asset";

const Configuration = () => {
  const routes = useRoutes([
    { path: "user/*", element: <UserIndex/> },
    { path: "shift/*", element: <ShiftIndex/> },
    { path: "firm/*", element: <FirmIndex/> },
    { path: "asset/*", element: <AssetIndex/> },
  ]);
  return routes;
};

export default Configuration;
