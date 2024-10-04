import { createStackNavigator } from "@react-navigation/stack";
import EventLogsScreen from "../screens/EventLogsScreen";
import SpotListScreen from "../screens/SpotListScreen";
import SpotDetailScreen from "../screens/SpoptDetailScreen";
import GenericSpot from "../screens/GenericSpotsScreen";
import GenericSpotAddScreen from "../screens/GenericSpotAddScreen";

export type GenericNavigationParms = {
    navigate(arg0: string, arg1: { baseUrls: string | null; spotName: string; }): void;
    GenericSpotScreen: undefined;
    GenericSpotAddScreen: undefined;
    EventLogScreen: { baseUrls: string | null, spotName: string },
    SpotDetailsScreen: { baseUrls: string | null, spotName: string },
    SpotDetailScreen: { data: [], onPress: any }
};

const Stack = createStackNavigator<GenericNavigationParms>();
function GenericNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="EventLogScreen" component={EventLogsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SpotDetailsScreen" component={SpotListScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SpotDetailScreen" component={SpotDetailScreen} options={{ headerShown: false }} />
            <Stack.Screen name="GenericSpotScreen" component={GenericSpot} options={{ headerShown: false }} />
            <Stack.Screen name="GenericSpotAddScreen" component={GenericSpotAddScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}
export default GenericNavigation;