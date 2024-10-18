import { useEffect } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import SpotsDataByTypeComponent from "../component/SpotsDataByTypeComponent";
import { RootState, store } from "../reducer/Store";
import FloatingActionCutomButton from "../reuseableComponent/customButton/FloatingActionCustomButton";
import CustomLoader from "../reuseableComponent/loader/CustomLoader";
import colors from "../assets/color/colors";
import CustomHeader from "../reuseableComponent/header/CustomHeader";
import React from "react";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { AppNavigationParams } from "../navigation/NavigationStackList";
import { WeighBridgeSpotData } from "../reducer/weighBridge/WeighBridgeAction";

function Weighbridges() {
    const baseUrls = useSelector((state: RootState) => state.authentication.baseUrl);
    const WeighbridgeSpots = useSelector((state: RootState) => state.weighBridge.WeighBridgeSpots);
    const Loader = useSelector((state: RootState) => state.weighBridge.loader);
    const buCode = useSelector((state: RootState) => state.authentication.buCode);
    const token = useSelector((state: RootState) => state.authentication.token);
    const navigation = useNavigation<NavigationProp<AppNavigationParams>>();

    useEffect(() => {
        console.log("base Url of Generic ", baseUrls);
        store.dispatch(WeighBridgeSpotData({ baseUrl: baseUrls, spotType: "UNIDIRECTIONAL_WEIGHBRIDGE", buCode: buCode, token: token }));
    }, [baseUrls]);

    if (WeighbridgeSpots) {
        console.log("Generic Spots ", WeighbridgeSpots);
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            <CustomHeader buCode={undefined} userLogo={"account-circle"} title={"Weighbridges"} />
            {Loader ? (
                <CustomLoader />
            ) : (
                <View style={{ position: "relative"  , flex:1}}>
                    <SpotsDataByTypeComponent data={WeighbridgeSpots}type={"UNIDIRECTIONAL_WEIGHBRIDGE"} />
                    <FloatingActionCutomButton onPress={() => navigation.navigate("WeighbridgesAddScreen")} />
                </View>
            )}
        </View>
    );
}

export default Weighbridges;
