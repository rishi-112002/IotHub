import { useCallback, useContext, useEffect, useState } from 'react';
import {
  DeleteWeighBridgeSpot,
  WeighBridgeSpotData,
} from '../../reducer/weighBridge/WeighBridgeAction';
import { RootState, store } from '../../reducer/Store';
import { useSelector } from 'react-redux';
import CustomToast from '../../reuseableComponent/modal/CustomToast';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AppNavigationParams } from '../../navigation/NavigationStackList';
import { DataByConnectivityContext } from '../../contextApi/DataByConnectivity';
import { useBackHandler } from '@react-native-community/hooks';

function WeighBridgeScreenHooks() {
  // const [errorAlertVisible, setErrorAlertVisible] = useState(false);
  // const [errorMessage, setErrorMessage] = useState('');
  const { weighBridgeTypeConnectivity, setWeighBridgeTypeConnectivity } = useContext(DataByConnectivityContext);

  const baseUrls = useSelector(
    (state: RootState) => state.authentication.baseUrl,
  );
  const WeighbridgeSpots = useSelector(
    (state: RootState) => state.weighBridge.WeighBridgeSpots,
  );
  const WeighBridgeConnectedSpot = WeighbridgeSpots.filter((spot: any) => spot.active === true)
  const WeighBridgeNotConnectedSpot = WeighbridgeSpots.filter((spot: any) => spot.active === false)
  const Loader = useSelector((state: RootState) => state.weighBridge.loader);
  const navigation = useNavigation<NavigationProp<AppNavigationParams>>();
  const buCode = useSelector((state: RootState) => state.authentication.buCode);
  const token = useSelector((state: RootState) => state.authentication.token);
  const genericData = useSelector(
    (state: RootState) => state.weighBridge.genericData,
  );
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const getWeighBridgeData = useCallback(() => {
    // setSuccessAlertVisible(false); // Reset success alert before fetching data
    // setErrorAlertVisible(false); // Reset error alert before fetching data
    // setErrorMessage('');
    store.dispatch(
      WeighBridgeSpotData({
        baseUrl: baseUrls,
        spotType: 'UNIDIRECTIONAL_WEIGHBRIDGE',
        buCode: buCode,
        token: token,
      }),
    );
  }, [baseUrls, buCode, token]);

  useEffect(() => {
    getWeighBridgeData();
  }, [baseUrls, buCode, token, getWeighBridgeData]);

  const handleDelete = useCallback((id: string) => {
    setDeleteId(id);
    setIsVisible(true);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (!deleteId) {
      return;
    }
    setIsVisible(false);
    try {
      store.dispatch(
        DeleteWeighBridgeSpot({
          baseUrl: baseUrls,
          id: deleteId,
          buCode: buCode,
          token: token,
        }),
      );
      // genericData(); // Re-fetch data after delete action
      CustomToast('success', 'Deleted successfully');
    } catch (error) {
      CustomToast('error', 'Failed to delete the spot. Please try again.');
    } finally {
      setDeleteId(null);
    }
  }, [deleteId, baseUrls, buCode, token]);
  const handleResetConnectivity = () => {
    navigation.goBack()
    setWeighBridgeTypeConnectivity("all")
    return true;
  }
  useBackHandler(handleResetConnectivity)
  return {
    WeighBridgeConnectedSpot,
    WeighBridgeNotConnectedSpot,
    weighBridgeTypeConnectivity,
    genericData,
    Loader,
    handleDelete,
    confirmDelete,
    isVisible,
    setIsVisible,
    WeighbridgeSpots,
    navigation,
  };
}
export default WeighBridgeScreenHooks;
