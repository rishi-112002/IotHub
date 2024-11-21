import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { RootState, store } from '../../reducer/Store';
import { ApiCallsAddGenericSpot } from '../../api/ApiCallsByReducer';
import {
  resetDeleteStatus,
  resetStatus,
  resetUpadteStatus,
} from '../../reducer/genericSpot/uploadGenericDataReducer';
import { StyleSheet } from 'react-native';
import colors from '../../assets/color/colors';
import fontSizes from '../../assets/fonts/FontSize';
import CustomToast from '../../reuseableComponent/modal/CustomToast';
import React from 'react';
import { GenericSpotData } from '../../reducer/genericSpot/uploadGenericDataAction';
import { AppNavigationParams } from '../../navigation/NavigationStackList';

export const useGenericAddEffect = (id: any) => {
  const [loader, setLoader] = useState(false);
  const [editButtonOpacity, setEditButtonOpacity] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<AppNavigationParams>>();
  const uploadError = useSelector(
    (state: RootState) => state.uploadGeneric.error,
  );
  const GenericSpot = useSelector(
    (state: RootState) => state.uploadGeneric.GenericSpot,
  );
  const deleteStatus = useSelector(
    (state: RootState) => state.uploadGeneric.deleteStatus,
  );
  const status = useSelector((state: RootState) => state.uploadGeneric.status);
  const updateStatus = useSelector((state: RootState) => state.uploadGeneric.updateStatus);

  const baseUrls = useSelector(
    (state: RootState) => state.authentication.baseUrl,
  );
  const buCode = useSelector((state: RootState) => state.authentication.buCode);
  const token = useSelector((state: RootState) => state.authentication.token);
  const smartController = useSelector(
    (state: RootState) => state.spotAddDetail.smartController,
  );
  const displays = useSelector(
    (state: RootState) => state.spotAddDetail.display,
  );
  const readers = useSelector((state: RootState) => state.spotAddDetail.reader);
  const Weightbridge = useSelector(
    (state: RootState) => state.spotAddDetail.weighBriges,
  );
  const smartControllerLoader = useSelector(
    (state: RootState) => state.spotAddDetail.smartControllerLoader,
  );
  const displayLoader = useSelector(
    (state: RootState) => state.spotAddDetail.displaysLoader,
  );
  const readerLoader = useSelector(
    (state: RootState) => state.spotAddDetail.readerLoader,
  );

  useEffect(() => {
    if (id) {
      store.dispatch(GenericSpotData({ id, baseUrl: baseUrls, buCode, token }));
    }
  }, [])
  useEffect(() => {
    ApiCallsAddGenericSpot({ baseUrl: baseUrls });
  }, [dispatch, baseUrls]);
  useEffect(() => {
    switch (status) {
      case 'failed':
        if (uploadError) {
          CustomToast('error', uploadError);
          dispatch(resetStatus());
        }
        break;
      case 'succeeded':
        CustomToast('success', status);
        dispatch(resetStatus());
        navigation.goBack();
        break;
      case 'loading':
        setLoader(true);
        break;
    }
  }, [uploadError, dispatch, status, navigation]);

  useEffect(() => {
    // console.log("updateStatus", updateStatus)
    switch (updateStatus) {
      case 'failed':
        CustomToast('error', uploadError);
        dispatch(resetUpadteStatus());
        break;
      case 'succeeded':
        CustomToast('success', status);
        dispatch(resetUpadteStatus());
        navigation.goBack();
        break;
      case 'loading':
        setLoader(true);
        break;
    }
  }, [uploadError, dispatch, status, navigation, updateStatus]);
  useEffect(() => {
    switch (deleteStatus) {
      case 'failed':
        // console.log('deleteStatus:', deleteStatus); // Make sure this logs the correct value
        CustomToast('error', uploadError);

        dispatch(resetDeleteStatus());
        setLoader(false); // Reset loader after failure
        break;
      case 'succeeded':
        // console.log('deleteStatus:', deleteStatus);
        CustomToast('success', status);

        dispatch(resetDeleteStatus());
        setLoader(false); // Reset loader after success
        break;
      case 'loading':
        // console.log('deleteStatus:', deleteStatus);
        setLoader(true); // Start loader when loading
        break;
      default:
        setLoader(false); // Ensure loader stops for any unexpected status
        break;
    }
  }, [dispatch, deleteStatus, uploadError, status]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View>
          <Text style={styles.headerTitle}> {id ? "Edit Generic Screen" : "Add Generic Screen"}</Text>
        </View>
      ),
    });
  }, [navigation]);

  return {
    loader,
    readerLoader,
    buCode,
    token,
    smartControllerLoader,
    displayLoader,
    baseUrls,
    uploadError,
    smartController,
    displays,
    readers,
    Weightbridge,
    GenericSpot,
    navigation,
    updateStatus,
    setLoader,
    dispatch,
    editButtonOpacity,
    setEditButtonOpacity
  };
};
const styles = StyleSheet.create({
  headerTitle: {
    color: colors.darkblack,
    fontSize: fontSizes.heading,
  },
});
