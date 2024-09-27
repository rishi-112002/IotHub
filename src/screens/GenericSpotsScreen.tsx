import { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { RootState, store } from "../reducer/Store";
import { SpotsDataByType } from "../reducer/SpotsDataByType/SpotsDataByTypeAction";
import { useSelector } from "react-redux";
import CustomSubHeader from "../reuseableComponent/header/CustomSubHeader";
import SpotsDataByTypeComponent from "../component/SpotsDataByTypeComponent";
import FloatingActionCutomButton from "../reuseableComponent/customButton/FloatingActionCustomButton";
import { useNavigation } from "@react-navigation/native";

function GenericSpot() {
    const baseUrls = useSelector((state: RootState) => state.authentication.baseUrl);
    const GenericSpots = useSelector((state: RootState) => state.spotsDataByType.GenericSpots);
    const Loader = useSelector((state: RootState) => state.spotsDataByType.loader);
    const navigation = useNavigation();
    useEffect(() => {
        console.log("base Url of Generic ", baseUrls)
        store.dispatch(SpotsDataByType({ baseUrl: baseUrls, spotType: "GENERIC_SPOT" }))
    }, [])

    const onHandlePress = () => {
        navigation.navigate('GenericSpotAddScreen');
    }
    return (
        <View style={{ flex: 1 }}>
            <CustomSubHeader spotName={"Generic Spot"} />
            {Loader ? (
                <ActivityIndicator size="large" style={{ flex: 1 }} />
            ) : (
                <View style={{ position: "relative", flex: 1 }}>
                    <SpotsDataByTypeComponent data={GenericSpots} />
                    <FloatingActionCutomButton onPress={onHandlePress} />
                </View>
            )}
        </View>
    )

}
export default GenericSpot;