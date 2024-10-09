import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import EventLogsScreen from "../screens/EventLogsScreen";
import SpotListScreen from "../screens/SpotListScreen";
import SpotDetailScreen from "../screens/SpoptDetailScreen";
import { AppNavigationParams } from "./NavigationStackList";
const Stack = createStackNavigator<AppNavigationParams>();
function HomeNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="EventLogScreen" component={EventLogsScreen} options={{ headerShown: true }} />
            <Stack.Screen name="SpotDetailsScreen" component={SpotListScreen} options={{ headerShown: true }} />
            <Stack.Screen name="SpotDetailScreen" component={SpotDetailScreen} options={{ headerShown: true }} />
        </Stack.Navigator>
    )

}
export default HomeNavigation;