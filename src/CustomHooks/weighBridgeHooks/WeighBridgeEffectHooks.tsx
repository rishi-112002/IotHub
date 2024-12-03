import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  GetReader,
  GetDisplays,
  GetSmartControllers,
  GetWeightBridge,
  GetWeightParsers,
} from '../../reducer/spotAddDetails/SpotAddDetailsAction';
import { RootState, store } from '../../reducer/Store';
import { WeighBridegeSpotDataEdit, WeighBridgeSpotData } from '../../reducer/weighBridge/WeighBridgeAction';
import { Alert, Text, View } from 'react-native';
import React from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { AppNavigationParams } from '../../navigation/NavigationStackList';
import { StyleSheet } from 'react-native';
import colors from '../../assets/color/colors';
import fontSizes from '../../assets/fonts/FontSize';
import CustomSnackBar from '../../reuseableComponent/modal/CustomSnackBar';
import {
  resetDeleteStatus,
  resetStatus,
} from '../../reducer/weighBridge/WeighBridgeReducer';
import CustomToast from '../../reuseableComponent/modal/CustomToast';
import { logoutUser } from '../../reducer/Login/LoginAction';

function WeighBridgeEffectHooks(props: { id: any }) {
  const { id } = props;
  const [loader, setLoader] = useState(false);
  const token = useSelector((state: RootState) => state.authentication.token);
  const baseUrls = useSelector(
    (state: RootState) => state.authentication.baseUrl,
  );
  const GenericSpots = useSelector(
    (state: RootState) => state.weighBridge.genericData,
  );
  const readers = useSelector((state: RootState) => state.spotAddDetail.reader);

  const buCode = useSelector((state: RootState) => state.authentication.buCode);
  const navigation = useNavigation<NavigationProp<AppNavigationParams>>();
  const uploadError = useSelector(
    (state: RootState) => state.weighBridge.error,
  );
  const updateStatus = useSelector(
    (state: RootState) => state.weighBridge.updateStatus,
  );
  const WeighBridgeSpot = useSelector(
    (state: RootState) => state.weighBridge.weighBridgeSpot,
  );
  const status = useSelector((state: RootState) => state.weighBridge.status);
  const deleteStatus = useSelector(
    (state: RootState) => state.weighBridge.deleteStatus,
  );
  const smartController = useSelector(
    (state: RootState) => state.spotAddDetail.smartController,
  );
  const displays = useSelector(
    (state: RootState) => state.spotAddDetail.display,
  );
  const weightParsers = useSelector(
    (state: RootState) => state.spotAddDetail.weightParsers,
  );
  const smartControllerLoader = useSelector(
    (state: RootState) => state.spotAddDetail.smartControllerLoader,
  );
  useEffect(() => {
    if (id) {
      store.dispatch(WeighBridegeSpotDataEdit({ id, baseUrl: baseUrls, buCode, token }));
    }
  }, [])

  const handleLogout = async () => {
    Alert.alert(
      'Logout', // Alert title
      ' you had to log out to Add', // Alert message
      [
        {
          text: 'Cancel', // Cancel button
          style: 'cancel', // This makes the button appear more prominent
        },
        {
          text: 'OK', // OK button
          onPress: () => {
            store.dispatch(logoutUser()); // Log out the user
          },
        },
      ],
      { cancelable: false }, // Prevents closing the alert by tapping outside of it
    );
  };

  const dispatch = useDispatch();
  useEffect(() => {
    // Dispatch actions when the component mounts
    store.dispatch(GetReader({ baseUrl: baseUrls }));
    store.dispatch(GetDisplays({ baseUrl: baseUrls }));
    store.dispatch(GetSmartControllers({ baseUrl: baseUrls }));
    store.dispatch(GetWeightBridge({ baseUrl: baseUrls }));
    store.dispatch(GetWeightParsers({ baseUrl: baseUrls }));
    store.dispatch(
      WeighBridgeSpotData({
        baseUrl: baseUrls,
        buCode: buCode,
        token: token,
        spotType: '',
      }),
    );
  }, [baseUrls, token, buCode]); // Dependencies

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View>
          <Text style={styles.headerTitle}> {id ? "Update Weighbridge Details" : "Add Weighbridge Details"}</Text>
        </View>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    if (uploadError === 'Upload error: User is not logged in') {
      dispatch(resetStatus());
      handleLogout();
    } else if (status === 'failed' && uploadError) {
      // CustomToast('error', uploadError);
      dispatch(resetStatus());
    } else if (status === 'succeeded') {
      CustomToast('success', 'uploaded successfully');
      dispatch(resetStatus());
      navigation.goBack();
    } else if (status === 'loading') {
      setLoader(true);
    }
  }, [uploadError, status, navigation, dispatch]);

  useEffect(() => {
    switch (deleteStatus) {
      case 'failed':
        if (uploadError) {
          CustomSnackBar({
            text: 'failed',
            backGroundColor: colors.redBase,
            textColor: colors.white,
          });
          store.dispatch(resetDeleteStatus());
        }
        break;
      case 'succeeded':
        CustomSnackBar({
          text: 'Success',
          backGroundColor: colors.greenBase,
          textColor: colors.white,
        });
        store.dispatch(resetDeleteStatus());
        break;
      case 'loading':
        setLoader(true);
        break;
    }
  }, [uploadError, status, deleteStatus]);

  return {
    loader,
    smartControllerLoader,
    smartController,
    displays,
    weightParsers,
    WeighBridgeSpot,
    baseUrls,
    token,
    buCode,
    GenericSpots,
    readers,
    uploadError, dispatch, navigation, updateStatus, setLoader
  }; // Or some UI component if needed
}
const styles = StyleSheet.create({
  headerTitle: {
    color: colors.darkblack,
    fontSize: fontSizes.heading,
  },
  directionText: { color: colors.darkblack, paddingVertical: 10 },
});

export default WeighBridgeEffectHooks;
