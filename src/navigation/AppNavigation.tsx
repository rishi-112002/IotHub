import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from '../screens/SplashScreen';
import UrlScreen from '../screens/UrlScreen';
import LoginForm from '../screens/LoginForm';
import { RootState, store } from '../reducer/Store';
import { responseDetails } from '../reducer/Reducer';
import { CheckUserlogin, GetBaseUrl } from "../reducer/Login/LoginAction";
import { fetchConfigDetails } from "../api/Api";
import { GetBuinessUnits } from "../reducer/buinessUnits/BuinessUnitsAction";
import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigation from './DrawerNavigation';
import { AppNavigationParams } from './NavigationStackList';
import React from 'react';
const Stack = createStackNavigator<AppNavigationParams>();

function AppNavigation() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const baseUrls = useSelector((state: RootState) => state.authentication.baseUrl);
    const userName = useSelector((state: RootState) => state.authentication.userName);
    const token = useSelector((state: RootState) => state.authentication.token);
    const buCode = useSelector((state: RootState) => state.authentication.buCode);

    const netinfo = async () => {
        const netInfo = await NetInfo.fetch();
        if (!netInfo.isConnected) {
            Alert.alert("No Internet Connection", "Please check your internet connection and try again.");
            return;
        }
    };

    const initializeApp = async () => {
        store.dispatch(CheckUserlogin());
        setLoading(false);
    };

    const getBaseUrl = async () => {
        try {
            store.dispatch(GetBaseUrl());
        } catch (error) {
            console.error("Failed to fetch base URL from AsyncStorage", error);
        }
    };
    console.log("userName", userName)

    const fetchConfiguration = async (url: string) => {
        try {
            const configDetails = await fetchConfigDetails(url);
            if (configDetails) {
                await AsyncStorage.setItem('configDetails', JSON.stringify(configDetails));
                const apiResponse = JSON.stringify(configDetails);
                store.dispatch(responseDetails(apiResponse));
                console.log("URL and config saved successfully in AsyncStorage and Redux.", url);
            } else {
                Alert.alert("Invalid URL", "The URL is incorrect, kindly check the URL and try again.");
            }
        } catch (error) {
            console.log("url inside the fetchConfiguration", url);
            console.error("Error fetching config details:", error);
            Alert.alert("Error", "Failed to fetch configuration. Please check the URL and try again.");
        }
    };
    useEffect(() => {
        netinfo();
        getBaseUrl();
        initializeApp();
    }, [dispatch]);

    useEffect(() => {
        if (baseUrls) {
            fetchConfiguration(baseUrls);
            store.dispatch(GetBuinessUnits({ baseUrl: baseUrls, buCode: buCode, token: token }));
        }
    }, [baseUrls, dispatch]);

    if (loading) {
        return <SplashScreen />;
    }

    return (

        <Stack.Navigator initialRouteName="SplashScreen" >
            <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
            {!userName || userName === "" ?
                <Stack.Group>
                    <Stack.Screen name="UrlScreen" component={UrlScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="LoginScreen" component={LoginForm} options={{ headerShown: false }} />
                </Stack.Group> :

                <Stack.Screen name="Drawer" component={DrawerNavigation} options={{ headerShown: false }} />
            }
        </Stack.Navigator>

    );
};

export default AppNavigation;
