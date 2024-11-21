import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchConfigDetails } from "../../api/Api";
import { GetBuinessUnits } from "../../reducer/buinessUnits/BuinessUnitsAction";
import { CheckUserlogin, GetBaseUrl } from "../../reducer/Login/LoginAction";
import { responseDetails } from "../../reducer/Reducer";
import { RootState, store } from "../../reducer/Store";
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from "@react-native-async-storage/async-storage";


function AppNavigationHooks() {
    // State to manage loading status
    const [loading, setLoading] = useState(true);

    // Redux dispatch to trigger actions
    const dispatch = useDispatch();

    // Get necessary data from Redux state
    const baseUrls = useSelector(
        (state: RootState) => state.authentication.baseUrl,
    );
    const userName = useSelector(
        (state: RootState) => state.authentication.userName,
    );
    const token = useSelector((state: RootState) => state.authentication.token);
    const buCode = useSelector((state: RootState) => state.authentication.buCode);

    // Function to check internet connection
    const netinfo = async () => {
        const netInfo = await NetInfo.fetch();
        if (!netInfo.isConnected) {
            Alert.alert(
                'No Internet Connection',
                'Please check your internet connection and try again.',
            );
            return;
        }
    };

    // Function to initialize the app by checking user login status
    const initializeApp = async () => {
        store.dispatch(CheckUserlogin()); // Dispatch action to check user login
        setLoading(false); // Set loading to false after initialization
    };

    // Function to fetch and store the base URL from async storage
    const getBaseUrl = async () => {
        try {
            store.dispatch(GetBaseUrl()); // Dispatch action to get the base URL
        } catch (error) {
            // console.error('Failed to fetch base URL from AsyncStorage', error);
        }
    };

    // Debugging statement to log the current userName
    // console.log('userName', userName);

    // Function to fetch configuration details and save them in AsyncStorage and Redux
    const fetchConfiguration = async (url: string) => {
        try {
            const configDetails = await fetchConfigDetails(url); // Fetch configuration details using the provided URL
            if (configDetails) {
                await AsyncStorage.setItem(
                    'configDetails',
                    JSON.stringify(configDetails),
                ); // Save config details in AsyncStorage
                const apiResponse = JSON.stringify(configDetails);
                store.dispatch(responseDetails(apiResponse)); // Dispatch action to store config details in Redux
                // console.log(
                //     'URL and config saved successfully in AsyncStorage and Redux.',
                //     url,
                // );
            } else {
                Alert.alert(
                    'Invalid URL',
                    'The URL is incorrect, kindly check the URL and try again.',
                );
            }
        } catch (error) {
            // console.log('url inside the fetchConfiguration', url);
            // console.error('Error fetching config details:', error);
            Alert.alert(
                'Error',
                'Failed to fetch configuration. Please check the URL and try again.',
            );
        }
    };

    // Effect to check internet connection, fetch base URL, and initialize app on first render
    useEffect(() => {
        netinfo(); // Check for internet connectivity
        getBaseUrl(); // Fetch the base URL from storage
        initializeApp(); // Initialize app and check user login
    }, [dispatch]);

    // Effect to fetch configuration and business units whenever base URL is available
    useEffect(() => {
        if (baseUrls) {
            fetchConfiguration(baseUrls); // Fetch configuration details based on base URL
            store.dispatch(
                GetBuinessUnits({ baseUrl: baseUrls, buCode: buCode, token: token }),
            ); // Dispatch action to get business units
        }
    }, [baseUrls, buCode, token]);

    return {
        userName,
        loading
    }
}
export default AppNavigationHooks;