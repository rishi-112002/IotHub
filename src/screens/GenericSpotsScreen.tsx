/* eslint-disable react-hooks/exhaustive-deps */
import { useLayoutEffect } from 'react';
import { ActivityIndicator,View } from 'react-native';
import { RootState, store } from '../reducer/Store';
import { useSelector } from 'react-redux';
import SpotsDataByTypeComponent from '../component/SpotsDataByTypeComponent';
import FloatingActionCutomButton from '../reuseableComponent/customButton/FloatingActionCustomButton';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import CustomHeader from '../reuseableComponent/header/CustomHeader';
import { AppNavigationParams } from '../navigation/NavigationStackList';
import React from 'react';
import { SpotsDataByType } from '../reducer/uploadGenericData/uploadGenericDataAction';
import colors from '../assets/color/colors';

function GenericSpot() {
    const baseUrls = useSelector((state: RootState) => state.authentication.baseUrl);
    const buCode = useSelector((state: RootState) => state.authentication.buCode);
    const token = useSelector((state: RootState) => state.authentication.token);
    const GenericSpots = useSelector((state: RootState) => state.uploadGeneric.GenericSpots);
    const Loader = useSelector((state: RootState) => state.spotsDataByType.loader);
    const navigation = useNavigation<NavigationProp<AppNavigationParams>>();

    useLayoutEffect(() => {
        getGenericData();
    }, [baseUrls]);

    const getGenericData = async () => {

        store.dispatch(SpotsDataByType({ baseUrl: baseUrls, spotType: 'GENERIC_SPOT', token: token, buCode: buCode }));
    };
    const onHandlePress = () => {
        navigation.navigate('GenericSpotAddScreen');
    };
    return (
        <View style={{ flex: 1 }}>
            <CustomHeader buCode={undefined} userLogo={'account-circle'} title={'GenericSpot'} />

            {Loader ? (
                <ActivityIndicator size="large" style={{ flex: 1 }} />
            ) : (
                <View style={{ position: 'relative', flex: 1 , backgroundColor:colors.white }}>
                    <SpotsDataByTypeComponent data={GenericSpots} type={'GENERIC_SPOT'} />
                    <FloatingActionCutomButton onPress={onHandlePress} />
                </View>
            )}
        </View>
    );

}
export default GenericSpot;
