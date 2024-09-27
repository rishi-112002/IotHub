import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import EventLogsScreen from "../screens/EventLogsScreen";
import SpotDetailsScreen from "../screens/SpotDetailsScreen";
import LoginForm from "../screens/LoginForm";
import SplashScreen from "../screens/SplashScreen";
import UrlScreen from "../screens/UrlScreen";

export type RootHomeParamList = {
    HomeScreen: undefined;
    UrlScreen: { baseUrls: string | null };
    LoginScreen: undefined;
    TermsAndCondition: undefined;
    PrivacyPolicy: undefined;
    SplashScreen: undefined;
    EventLogScreen: { baseUrls: string | null, spotName: string },
    SpotDetailsScreen: { baseUrls: string | null, spotName: string },
};

const Stack = createStackNavigator<RootHomeParamList>();
function HomeNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="EventLogScreen" component={EventLogsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SpotDetailsScreen" component={SpotDetailsScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )

}
export default HomeNavigation;