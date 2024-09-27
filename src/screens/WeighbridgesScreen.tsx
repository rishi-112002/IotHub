import { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { useSelector } from "react-redux";
import SpotsDataByTypeComponent from "../component/SpotsDataByTypeComponent";
import { SpotsDataByType } from "../reducer/SpotsDataByType/SpotsDataByTypeAction";
import { RootState, store } from "../reducer/Store";
import CustomSubHeader from "../reuseableComponent/header/CustomSubHeader";
import FloatingActionCutomButton from "../reuseableComponent/customButton/FloatingActionCustomButton";

function Weighbridges() {
    const baseUrls = useSelector((state: RootState) => state.authentication.baseUrl);
    const WeighbridgeSpots = useSelector((state: RootState) => state.spotsDataByType.WeighBridgeSpots);
    const Loader = useSelector((state: RootState) => state.spotsDataByType.loader);

    useEffect(() => {
        console.log("base Url of Generic ", baseUrls);
        store.dispatch(SpotsDataByType({ baseUrl: baseUrls, spotType: "UNIDIRECTIONAL_WEIGHBRIDGE" }));
    }, [baseUrls]);

    if (WeighbridgeSpots) {
        console.log("Generic Spots ", WeighbridgeSpots);
    }

    return (
        <View>
            <CustomSubHeader spotName={"WEIGHBRIDGE SPOTS"} />
            {Loader ? (
                <ActivityIndicator size="large" style={{ flex: 1 }} />
            ) : (
                <View style={{position:"relative"}}>
                    <SpotsDataByTypeComponent data={WeighbridgeSpots} />
                    <FloatingActionCutomButton onPress={()=> console.log("hello")} />
                </View>
            )}
        </View>
    );
}

export default Weighbridges;
