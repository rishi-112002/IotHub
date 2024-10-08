import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import EventLogsScreen from "../screens/EventLogsScreen";
import SpotListScreen from "../screens/SpotListScreen";
import SpotDetailScreen from "../screens/SpoptDetailScreen";

export type HomeNavigationParams = {
    navigate(arg0: string, arg1: { baseUrls: string | null; spotName: string; }): void;
    HomeScreen: undefined;
    EventLogScreen: { baseUrls: string | null, spotName: string },
    SpotDetailsScreen: { baseUrls: string | null, spotName: string },
    SpotDetailScreen: { data: []  , onPress:any}
};

const Stack = createStackNavigator<HomeNavigationParams>();
function HomeNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="EventLogScreen" component={EventLogsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SpotDetailsScreen" component={SpotListScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SpotDetailScreen" component={SpotDetailScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )

}
export default HomeNavigation;