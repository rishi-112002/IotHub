import { useSelector } from "react-redux";
import { RootState, store } from "../../reducer/Store";
import { useLayoutEffect } from "react";
import { GenericSpotsData } from "../../reducer/genericSpot/uploadGenericDataAction";


function GenericScreenHooks() {
    const baseUrls = useSelector((state: RootState) => state.authentication.baseUrl);
    const buCode = useSelector((state: RootState) => state.authentication.buCode);
    const token = useSelector((state: RootState) => state.authentication.token);

    useLayoutEffect(() => {
        getGenericData();
    }, [baseUrls]);
    const getGenericData = async () => {

        store.dispatch(GenericSpotsData({ baseUrl: baseUrls, spotType: 'GENERIC_SPOT', token: token, buCode: buCode }));
    };
}
export default GenericScreenHooks;