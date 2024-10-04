import { useEffect } from "react";
import { Alert, View } from "react-native";
import { useSelector } from "react-redux";
import SpotsDataByTypeComponent from "../component/SpotsDataByTypeComponent";
import { SpotsDataByType } from "../reducer/SpotsDataByType/SpotsDataByTypeAction";
import { RootState, store } from "../reducer/Store";
import FloatingActionCutomButton from "../reuseableComponent/customButton/FloatingActionCustomButton";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootDrawerTypes } from "../navigation/DrawerNavigation";
import CustomLoader from "../reuseableComponent/loader/CustomLoader";
import colors from "../assets/color/colors";
import CustomHeader from "../reuseableComponent/header/CustomHeader";

function Weighbridges() {
    const baseUrls = useSelector((state: RootState) => state.authentication.baseUrl);
    const WeighbridgeSpots = useSelector((state: RootState) => state.spotsDataByType.WeighBridgeSpots);
    const Loader = useSelector((state: RootState) => state.spotsDataByType.loader);
    const navigation = useNavigation<NavigationProp<RootDrawerTypes>>();
    useEffect(() => {
        console.log("base Url of Generic ", baseUrls);
        store.dispatch(SpotsDataByType({ baseUrl: baseUrls, spotType: "UNIDIRECTIONAL_WEIGHBRIDGE" }));
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
                <View style={{ position: "relative" }}>
                    <SpotsDataByTypeComponent data={WeighbridgeSpots} onPress={() => navigation.navigate("Weighbridges", { screen: 'WeighbridgesScreen' })}  type={"UNIDIRECTIONAL_WEIGHBRIDGE"}/>
                    <FloatingActionCutomButton onPress={() => console.log("hello")} />
                </View>
            )}
        </View>
    );
}

export default Weighbridges;
