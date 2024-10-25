import React, { useEffect, useState } from 'react';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {
    View,
    StyleSheet,
    StatusBar
} from 'react-native';
import Animated, { useSharedValue, withTiming, Easing, useAnimatedStyle } from 'react-native-reanimated';
import colors from '../../assets/color/colors';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducer/Store';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AppNavigationParams } from '../../navigation/NavigationStackList';

function SplashScreen() {
    const isLogedIn = useSelector((state: RootState) => state.authentication.isLogedIn);
    const baseUrls = useSelector((state: RootState) => state.authentication.baseUrl);
    
    const [isFirstLaunch, setIsFirstLaunch] = useState(true); // Add this state to track first launch
    const ring1Scale = useSharedValue(0);
    const ring2Scale = useSharedValue(0);
    const logoOpacity = useSharedValue(0);
    const navigation = useNavigation<NavigationProp<AppNavigationParams>>();

    useEffect(() => {
        if (isFirstLaunch) {
            setTimeout(() => {
                ring1Scale.value = withTiming(1.2, { duration: 800, easing: Easing.out(Easing.exp) });
            }, 150);

            setTimeout(() => {
                ring2Scale.value = withTiming(1.5, { duration: 1000, easing: Easing.out(Easing.exp) });
                logoOpacity.value = withTiming(1, { duration: 500 });
            }, 400);

            const splashTimeout = setTimeout(() => {
                if (baseUrls) {
                    if (isLogedIn) {
                        navigation.navigate('Drawer', { screen: "LiveSpot" });
                    } else {
                        navigation.navigate("LoginScreen");
                    }
                } else {
                    navigation.navigate('UrlScreen', { baseUrls });
                }
                setIsFirstLaunch(false); // Set the flag to false after the splash is shown once
            }, 2000); // Delay to show splash screen

            return () => clearTimeout(splashTimeout);
        } else {
            // Avoid showing splash on subsequent logins/logouts
            if (baseUrls) {
                if (isLogedIn) {
                    navigation.navigate('Drawer', { screen: "LiveSpot" });
                } else {
                    navigation.navigate("LoginScreen");
                }
            }
        }
    }, [baseUrls, isLogedIn, navigation, ring1Scale, ring2Scale, logoOpacity, isFirstLaunch]);

    const ring1Style = useAnimatedStyle(() => {
        return {
            transform: [{ scale: ring1Scale.value }],
        };
    });

    const ring2Style = useAnimatedStyle(() => {
        return {
            transform: [{ scale: ring2Scale.value }],
        };
    });

    const logoStyle = useAnimatedStyle(() => {
        return {
            opacity: logoOpacity.value,
        };
    });

    if (!isFirstLaunch) {
        return null; // Don't render the splash screen after the first launch
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={colors.AppPrimaryColor} />
            <Animated.View style={[styles.ringContainer, ring2Style]}>
                <Animated.View style={[styles.ringContainer, ring1Style]}>
                    <Animated.Image
                        source={require("../../assets/images/apconicLogo.png")}
                        style={[styles.logo, logoStyle]}
                    />
                </Animated.View>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        backgroundColor: "#1976d2"
    },
    ringContainer: {
        backgroundColor: colors.blueLighter,
        borderRadius: 999,
        padding: hp(5),
    },
    logo: {
        width: hp(25),
        height: hp(25),
        borderRadius: hp(15),
        resizeMode: 'center'
    },
});

export default SplashScreen;
