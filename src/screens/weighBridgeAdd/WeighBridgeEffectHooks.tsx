import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetReader, GetDisplays, GetSmartControllers, GetWeightBridge, GetWeightParsers } from '../../reducer/spotAddDetails/SpotAddDetailsAction';
import { SpotsDataByType } from '../../reducer/SpotsDataByType/SpotsDataByTypeAction';
import { RootState, store } from '../../reducer/Store';
import { WeighBridgeSpotData } from '../../reducer/weighBridge/WeighBridgeAction';
import { Text, View } from 'react-native';
import React from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { AppNavigationParams } from '../../navigation/NavigationStackList';
import { StyleSheet } from 'react-native';
import colors from '../../assets/color/colors';
import fontSizes from '../../assets/fonts/FontSize';
import { resetStatus } from '../../reducer/genericSpot/uploadGenericDataReducer';
import CustomSnackBar from '../../reuseableComponent/modal/CustomSnackBar';
import { resetDeleteStatus } from '../../reducer/weighBridge/WeighBridgeReducer';

function WeighBridgeEffectHooks() {
    const [loader, setLoader] = useState(false);
    const token = useSelector((state: RootState) => state.authentication.token);
    const baseUrls = useSelector((state: RootState) => state.authentication.baseUrl);
    const buCode = useSelector((state: RootState) => state.authentication.buCode);
    const navigation = useNavigation<NavigationProp<AppNavigationParams>>();
    const uploadError = useSelector((state: RootState) => state.weighBridge.error);
    const status = useSelector((state: RootState) => state.weighBridge.status);
    const deleteStatus = useSelector((state: RootState) => state.weighBridge.deleteStatus);
    const dispatch = useDispatch();
    console.log('upload Error in Hook', uploadError);
    useEffect(() => {
        // Dispatch actions when the component mounts
        store.dispatch(GetReader({ baseUrl: baseUrls }));
        store.dispatch(GetDisplays({ baseUrl: baseUrls }));
        store.dispatch(GetSmartControllers({ baseUrl: baseUrls }));
        store.dispatch(GetWeightBridge({ baseUrl: baseUrls }));
        store.dispatch(GetWeightParsers({ baseUrl: baseUrls }));
        store.dispatch(SpotsDataByType({ baseUrl: baseUrls, spotType: 'GENERIC_SPOT', token: token, buCode: buCode }));
        store.dispatch(WeighBridgeSpotData({ baseUrl: baseUrls, buCode: buCode, token: token, spotType: '' }));
    }, [baseUrls, token, buCode]); // Dependencies

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <View>
                    <Text style={styles.headerTitle}> Add Weighbridge</Text>
                </View>
            ),
        });
    }, [navigation]);
    useEffect(() => {
        switch (status) {
            case 'failed':
                if (uploadError) {
                    CustomSnackBar({
                        text: 'failed',
                        backGroundColor: colors.redBase,
                        textColor: colors.white,
                    });
                    dispatch(resetStatus());
                }
                break;
            case 'succeeded':
                CustomSnackBar({
                    text: 'Success',
                    backGroundColor: colors.greenBase,
                    textColor: colors.white,
                });
                dispatch(resetStatus());
                navigation.navigate('WeighbridgesScreen');
                break;
            case 'loading':
                setLoader(true);
                break;
        }


    }, [uploadError, dispatch, status, navigation]);

    useEffect(() => {
        console.log('delete Status', deleteStatus);
        switch (deleteStatus) {
            case 'failed':
                if (uploadError) {
                    CustomSnackBar({
                        text: 'failed',
                        backGroundColor: colors.redBase,
                        textColor: colors.white,
                    });
                    dispatch(resetDeleteStatus());
                }
                break;
            case 'succeeded':
                CustomSnackBar({
                    text: 'Success',
                    backGroundColor: colors.greenBase,
                    textColor: colors.white,
                });
                dispatch(resetDeleteStatus());
                break;
            case 'loading':
                setLoader(true);
                break;
        }


    }, [uploadError, dispatch, status, deleteStatus]);

    return { loader }; // Or some UI component if needed
}
const styles = StyleSheet.create({
    headerTitle: {
        color: colors.darkblack,
        fontSize: fontSizes.heading,
    },
    directionText: { color: colors.darkblack, paddingVertical: 10 },

});

export default WeighBridgeEffectHooks;

