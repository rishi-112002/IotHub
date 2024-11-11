import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Alert} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from '../screens/authScreen/splash/SplashScreen';
import UrlScreen from '../screens/authScreen/url/UrlScreen';
import LoginForm from '../screens/authScreen/LoginForm';
import {RootState, store} from '../reducer/Store';
import {responseDetails} from '../reducer/Reducer';
import {CheckUserlogin, GetBaseUrl} from '../reducer/Login/LoginAction';
import {fetchConfigDetails} from '../api/Api';
import {GetBuinessUnits} from '../reducer/buinessUnits/BuinessUnitsAction';
import {createStackNavigator} from '@react-navigation/stack';
import DrawerNavigation from './DrawerNavigation';
import {AppNavigationParams} from './NavigationStackList';
import React from 'react';

const Stack = createStackNavigator<AppNavigationParams>();

function AppNavigation() {
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
      console.error('Failed to fetch base URL from AsyncStorage', error);
    }
  };

  // Debugging statement to log the current userName
  console.log('userName', userName);

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
        console.log(
          'URL and config saved successfully in AsyncStorage and Redux.',
          url,
        );
      } else {
        Alert.alert(
          'Invalid URL',
          'The URL is incorrect, kindly check the URL and try again.',
        );
      }
    } catch (error) {
      console.log('url inside the fetchConfiguration', url);
      console.error('Error fetching config details:', error);
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
        GetBuinessUnits({baseUrl: baseUrls, buCode: buCode, token: token}),
      ); // Dispatch action to get business units
    }
  }, [baseUrls, buCode, dispatch, token]);

  // Display the splash screen while loading
  if (loading) {
    return <SplashScreen />;
  }

  // Render the navigation stack
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      {/* If user is not logged in, show UrlScreen and LoginScreen */}
      {!userName || userName === '' ? (
        <Stack.Group>
          <Stack.Screen
            name="UrlScreen"
            component={UrlScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="LoginScreen"
            component={LoginForm}
            options={{headerShown: false}}
          />
        </Stack.Group>
      ) : (
        // If user is logged in, show the DrawerNavigation screen
        <Stack.Screen
          name="Drawer"
          component={DrawerNavigation}
          options={{headerShown: false}}
        />
      )}
    </Stack.Navigator>
  );
}

export default AppNavigation;
