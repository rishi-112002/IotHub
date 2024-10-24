/* eslint-disable react-hooks/exhaustive-deps */
import { useLayoutEffect } from 'react';
import { ActivityIndicator, Animated, View } from 'react-native';
import { RootState, store } from '../reducer/Store';
import { useSelector } from 'react-redux';
import SpotsDataByTypeComponent from '../component/SpotsDataByTypeComponent';
import FloatingActionCutomButton from '../reuseableComponent/customButton/FloatingActionCustomButton';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import CustomHeader from '../reuseableComponent/header/CustomHeader';
import { AppNavigationParams } from '../navigation/NavigationStackList';
import React from 'react';
import { SpotsDataByType } from '../reducer/genericSpot/uploadGenericDataAction';
import colors from '../assets/color/colors';

function GenericSpot() {
    const baseUrls = useSelector((state: RootState) => state.authentication.baseUrl);
    const buCode = useSelector((state: RootState) => state.authentication.buCode);
    const token = useSelector((state: RootState) => state.authentication.token);
    const GenericSpots = useSelector((state: RootState) => state.uploadGeneric.GenericSpots);
    const Loader = useSelector((state: RootState) => state.spotsDataByType.loader);
    const navigation = useNavigation<NavigationProp<AppNavigationParams>>();
    const scrollY = new Animated.Value(0)
    useLayoutEffect(() => {
        getGenericData();
    }, [baseUrls]);
    const diffClamp = Animated.diffClamp(scrollY, 0, 60)
    const getGenericData = async () => {

        store.dispatch(SpotsDataByType({ baseUrl: baseUrls, spotType: 'GENERIC_SPOT', token: token, buCode: buCode }));
    };
    const onHandlePress = () => {
        navigation.navigate('GenericSpotAddScreen');
    };
    const translateY = diffClamp.interpolate({
        inputRange: [0, 60],
        outputRange: [0, -60]
    })
    const paddingTopAnimated = scrollY.interpolate({
        inputRange: [0, 0],
        outputRange: [60, 0],
        extrapolate: 'clamp', // Ensures the value doesn't exceed the input range
    });
    const translateButtonY = diffClamp.interpolate({
        inputRange: [0, 0],
        outputRange: [0, 100]
    })
    return (
        <View style={{ flex: 1 }}>
            <CustomHeader buCode={undefined} userLogo={'account-circle'} title={'GenericSpot'} translateY={translateY} />

            {Loader ? (
                <ActivityIndicator size="large" style={{ flex: 1 }} />
            ) : (
                <Animated.View style={{ position: 'relative', flex: 1, backgroundColor: colors.white, paddingTop: paddingTopAnimated }}>
                    <SpotsDataByTypeComponent data={GenericSpots} type={'GENERIC_SPOT'} handleScroll={(e: { nativeEvent: { contentOffset: { y: number; }; }; }) => {
                        scrollY.setValue(e.nativeEvent.contentOffset.y);
                    }} />
                    <FloatingActionCutomButton onPress={onHandlePress} translateButtonY={translateButtonY} />
                </Animated.View>
            )}
        </View>
    );

}
export default GenericSpot;
