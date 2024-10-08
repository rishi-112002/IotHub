import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { RootState, store } from "../reducer/Store";
import { SpotsDataByType } from "../reducer/SpotsDataByType/SpotsDataByTypeAction";
import { useSelector } from "react-redux";
import SpotsDataByTypeComponent from "../component/SpotsDataByTypeComponent";
import FloatingActionCutomButton from "../reuseableComponent/customButton/FloatingActionCustomButton";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { GenericNavigationParms } from "../navigation/GenericNavigation";
import CustomHeader from "../reuseableComponent/header/CustomHeader";

function GenericSpot() {
    const baseUrls = useSelector((state: RootState) => state.authentication.baseUrl);
    const GenericSpots = useSelector((state: RootState) => state.spotsDataByType.GenericSpots);
    const Loader = useSelector((state: RootState) => state.spotsDataByType.loader);
    const navigation = useNavigation<NavigationProp<GenericNavigationParms>>();
    useEffect(() => {
        console.log("base Url of Generic ", baseUrls)
        store.dispatch(SpotsDataByType({ baseUrl: baseUrls, spotType: "GENERIC_SPOT" }))
    }, [])
    const onHandlePress = () => {
        navigation.navigate('GenericSpotAddScreen');
    }
    return (
        <View style={{ flex: 1 }}>
            <CustomHeader buCode={undefined} userLogo={"account-circle"} title={"GenericSpot"} />

            {Loader ? (
                <ActivityIndicator size="large" style={{ flex: 1 }} />
            ) : (
                <View style={{ position: "relative", flex: 1 }}>
                    <SpotsDataByTypeComponent data={GenericSpots} onPress={() => navigation.goBack()} type={"GENERIC_SPOT"} />
                    <FloatingActionCutomButton onPress={onHandlePress} />
                </View>
            )}
        </View>
    )

}
export default GenericSpot;