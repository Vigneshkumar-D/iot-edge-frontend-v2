import { useRoutes } from "react-router-dom";
import Asset from "./asset/component/asset-list";
import IOTGateWay from "./iotGateWay/component/iot-gate-way-list";
import Script from "./script/component/script-list";
import MQTTList from "./mqtt/component/mqtt-list";

const AssetIndex = () => {
  const routes = useRoutes([
    { index: true, element: <Asset/> },
    { path: "iot-gateway", element: <IOTGateWay/> },
    { path: "script", element: <Script/> },
    { path: "mqtt", element: <MQTTList/> },
  ]);
  return routes;
};

export default AssetIndex;
