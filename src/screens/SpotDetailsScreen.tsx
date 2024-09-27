import { RouteProp, useRoute } from "@react-navigation/native";
import CustomSubHeader from "../reuseableComponent/header/CustomSubHeader";
import { useSelector } from "react-redux";
import { RootState, store } from "../reducer/Store";
import { useEffect } from "react";
import { GetSpotDetails } from "../reducer/spotDetails/spotDetailsAction";
import { ActivityIndicator, Text, View } from "react-native";
import SpotDetailsComponent from "../component/SpotDetailsComponent";
interface SpotDetailsScreenParams {
    baseUrls: string;
    spotName: string;
}
function SpotDetailsScreen() {

    const route = useRoute<RouteProp<{ params: SpotDetailsScreenParams }, 'params'>>();
    const { baseUrls, spotName } = route.params;
    const loader = useSelector((state: RootState) => state.spotDetails.loader);
    const spotDetails = useSelector((state: RootState) => state.spotDetails.spotDetails);
    useEffect(() => {
        console.log("SpotDetails before dispatch:", spotDetails);
        store.dispatch(GetSpotDetails({ baseUrl: baseUrls, spotName: spotName }));
    }, []);
    
    useEffect(() => {
        console.log("SpotDetails after dispatch:", spotDetails);
    }, [spotDetails]);
    return (
        <View style={{ flex: 1 }}>
            <CustomSubHeader spotName={spotName} />
            <View style={{ flex: 1 }}>
                {
                    loader ? <ActivityIndicator size={"large"} /> : <SpotDetailsComponent spotData={spotDetails} />
                }

            </View>
        </View>
    )
}
export default SpotDetailsScreen;