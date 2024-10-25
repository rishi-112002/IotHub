import { useEffect } from "react";
import { WeighBridgeSpotData } from "../../reducer/weighBridge/WeighBridgeAction";
import { RootState, store } from "../../reducer/Store";
import { useSelector } from "react-redux";

function WeighBridgeScreenHooks() {
    const baseUrls = useSelector((state: RootState) => state.authentication.baseUrl);
    const buCode = useSelector((state: RootState) => state.authentication.buCode);
    const token = useSelector((state: RootState) => state.authentication.token);
    useEffect(() => {
        console.log("base Url of Generic ", baseUrls);
        store.dispatch(WeighBridgeSpotData({ baseUrl: baseUrls, spotType: "UNIDIRECTIONAL_WEIGHBRIDGE", buCode: buCode, token: token }));
    }, [baseUrls]);

}
export default WeighBridgeScreenHooks;