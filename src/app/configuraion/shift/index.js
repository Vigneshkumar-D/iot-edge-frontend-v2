import { useRoutes } from "react-router-dom";
import Shift from "./shift/component/shift-list";
import ShiftAllocation from "./allocation/component/shift-allocation-list";

const ShiftIndex = () => {
  const routes = useRoutes([
    { index: true, element: <Shift/> },
    { path: "allocation", element: <ShiftAllocation/> },
  ]);
  return routes;
};

export default ShiftIndex;
