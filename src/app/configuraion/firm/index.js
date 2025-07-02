import { useRoutes } from "react-router-dom";
import Firm from "./firm/component/firm-list";
import Location from "./location/component/location-list";

const FirmIndex = () => {
  const routes = useRoutes([
    { index: true, element: <Firm/> },
    { path: "location", element: <Location/> },
  ]);
  return routes;
};

export default FirmIndex;
