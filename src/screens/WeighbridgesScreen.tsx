/* eslint-disable react-native/no-inline-styles */
import { useEffect } from 'react';
import { Animated, View } from 'react-native';
import { useSelector } from 'react-redux';
import SpotsDataByTypeComponent from '../component/SpotsDataByTypeComponent';
import { RootState, store } from '../reducer/Store';
import FloatingActionCutomButton from '../reuseableComponent/customButton/FloatingActionCustomButton';
import CustomLoader from '../reuseableComponent/loader/CustomLoader';
import colors from '../assets/color/colors';
import CustomHeader from '../reuseableComponent/header/CustomHeader';
import React from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { AppNavigationParams } from '../navigation/NavigationStackList';
import { WeighBridgeSpotData } from '../reducer/weighBridge/WeighBridgeAction';

function Weighbridges() {
    const baseUrls = useSelector((state: RootState) => state.authentication.baseUrl);
    const WeighbridgeSpots = useSelector((state: RootState) => state.weighBridge.WeighBridgeSpots);
    const Loader = useSelector((state: RootState) => state.weighBridge.loader);
    const buCode = useSelector((state: RootState) => state.authentication.buCode);
    const token = useSelector((state: RootState) => state.authentication.token);
    const navigation = useNavigation<NavigationProp<AppNavigationParams>>();
    const scrollY = new Animated.Value(0);
    const diffClamp = Animated.diffClamp(scrollY, 0, 60);
    const translateY = diffClamp.interpolate({
        inputRange: [0, 60],
        outputRange: [0, -60],
    });
    const paddingTopAnimated = scrollY.interpolate({
        inputRange: [0, 0],
        outputRange: [60, 0],
        extrapolate: 'clamp',
    });
    const translateButtonY = diffClamp.interpolate({
        inputRange: [0, 0],
        outputRange: [0, 100],
      });
    useEffect(() => {
        console.log('base Url of Generic ', baseUrls);
        store.dispatch(WeighBridgeSpotData({ baseUrl: baseUrls, spotType: 'UNIDIRECTIONAL_WEIGHBRIDGE', buCode: buCode, token: token }));
    }, [baseUrls, buCode, token]);

    if (WeighbridgeSpots) {
        console.log('Generic Spots ', WeighbridgeSpots);
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            <CustomHeader buCode={undefined} userLogo={'account-circle'} title={'Weighbridges'} translateY={translateY} />
            {Loader ? (
                <CustomLoader />
            ) : (
                <Animated.View style={{ position: 'relative', flex: 1, paddingTop: paddingTopAnimated }}>
                    <SpotsDataByTypeComponent data={WeighbridgeSpots} type={'UNIDIRECTIONAL_WEIGHBRIDGE'}
                        handleScroll={(e: { nativeEvent: { contentOffset: { y: number; }; }; }) => {
                            scrollY.setValue(e.nativeEvent.contentOffset.y);
                        }} />
                    <FloatingActionCutomButton onPress={() => navigation.navigate('WeighbridgesAddScreen')} translateButtonY={translateButtonY} />
                </Animated.View>
            )}
        </View>
    );
}

export default Weighbridges;
