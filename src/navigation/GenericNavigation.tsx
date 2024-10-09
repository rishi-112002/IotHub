import { createStackNavigator } from "@react-navigation/stack";
import EventLogsScreen from "../screens/EventLogsScreen";
import SpotListScreen from "../screens/SpotListScreen";
import SpotDetailScreen from "../screens/SpoptDetailScreen";
import GenericSpot from "../screens/GenericSpotsScreen";
import GenericSpotAddScreen from "../screens/GenericSpotAddScreen";
import { AppNavigationParams } from "./NavigationStackList";
const Stack = createStackNavigator<AppNavigationParams>();
function GenericNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="GenericSpotScreen" component={GenericSpot} options={{ headerShown: false }} />
            <Stack.Screen name="EventLogScreen" component={EventLogsScreen} options={{ headerShown: true }} />
            <Stack.Screen name="SpotDetailsScreen" component={SpotListScreen} options={{ headerShown: true }} />
            <Stack.Screen name="SpotDetailScreen" component={SpotDetailScreen} options={{ headerShown: true }} />
            <Stack.Screen name="GenericSpotAddScreen" component={GenericSpotAddScreen} options={{ headerShown: true }} />
        </Stack.Navigator>
    )
}
export default GenericNavigation;