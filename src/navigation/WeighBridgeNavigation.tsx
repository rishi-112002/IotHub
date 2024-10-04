import { createStackNavigator } from "@react-navigation/stack";
import EventLogsScreen from "../screens/EventLogsScreen";
import SpotDetailScreen from "../screens/SpoptDetailScreen";
import SpotListScreen from "../screens/SpotListScreen";
import Weighbridges from "../screens/WeighbridgesScreen";
export type WeighBridgeNavigationParms = {
    navigate(arg0: string, arg1: { baseUrls: string | null; spotName: string; }): void;
    WeighbridgesScreen: undefined;
    EventLogScreen: { baseUrls: string | null, spotName: string },
    SpotDetailsScreen: { baseUrls: string | null, spotName: string },
    SpotDetailScreen: { data: [], onPress: any }
};

const Stack = createStackNavigator<WeighBridgeNavigationParms>();
function WeighBridgeNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="EventLogScreen" component={EventLogsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SpotDetailsScreen" component={SpotListScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SpotDetailScreen" component={SpotDetailScreen} options={{ headerShown: false }} />
            <Stack.Screen name="WeighbridgesScreen" component={Weighbridges} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}
export default WeighBridgeNavigation;