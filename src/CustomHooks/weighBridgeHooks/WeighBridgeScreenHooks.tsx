import { useCallback, useContext, useEffect, useRef, useState } from 'react';
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
import { Animated } from 'react-native';
type FilterOption = 'connected' | 'not-connected' | 'all';

function WeighBridgeScreenHooks() {
  // const [errorAlertVisible, setErrorAlertVisible] = useState(false);
  // const [errorMessage, setErrorMessage] = useState('');
  const [filterBadgeVisible, setFilterBadgeVisible] = useState(false);
  const [filterCount, setFilterCount] = useState(0);


  const { weighBridgeTypeConnectivity, setWeighBridgeTypeConnectivity } = useContext(DataByConnectivityContext);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const handleSearchPress = () => {
    setIsSearchVisible(!isSearchVisible); // Toggle search bar visibility
  };
  const [searchQuery, setSearchQuery] = useState<string>('');
  const baseUrls = useSelector(
    (state: RootState) => state.authentication.baseUrl,
  );
  const WeighbridgeSpots = useSelector(
    (state: RootState) => state.weighBridge.WeighBridgeSpots,
  );
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


  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 60);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 60],
    outputRange: [0, -60],
  });
  const paddingTopAnimated = scrollY.interpolate({
    inputRange: [0, 110],
    outputRange: [60, 0],
    extrapolate: 'clamp',
  });
  const translateButtonY = diffClamp.interpolate({
    inputRange: [0, 110],
    outputRange: [0, 250],
  });

  // Animation for CustomAlert modal
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Trigger the fade-in effect when `isVisible` changes to true
  useEffect(() => {
    if (isVisible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300, // Adjust duration for smoothness
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible, fadeAnim]);
  const spotsData = WeighbridgeSpots.filter((spot: any) => {
    const matchesFilter =
      weighBridgeTypeConnectivity === 'all' ||
      (weighBridgeTypeConnectivity === 'connected' && spot?.active) ||
      (weighBridgeTypeConnectivity === 'not-connected' && !spot?.active);
    const matchesSearch = searchQuery
      ? Object.values(spot).some((value) =>
        String(value).toLowerCase().includes(searchQuery.toLowerCase())
      )
      : true;
    return matchesFilter && matchesSearch;
  });
  useEffect(() => {
    if (weighBridgeTypeConnectivity !== "all") {
      setFilterCount(1)
      setFilterBadgeVisible(true)
    }
  }, [weighBridgeTypeConnectivity])


  const [modelShow, setModelShow] = useState<boolean>(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const toggleFilterMenu = () => {
    setModelShow(prevState => !prevState);
    setModelShow(!modelShow);
  };

  // Handle filter selection
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleFilterPress = (selectedFilter: FilterOption) => {
    setWeighBridgeTypeConnectivity(selectedFilter);
    setFilterCount(1)
    // setSearchQuery('');
    setModelShow(false);
  };

  const handleResetConnectivity = () => {
    navigation.goBack()
    setWeighBridgeTypeConnectivity("all")
    return true;
  }
  useBackHandler(handleResetConnectivity)
  return {
    spotsData,
    genericData,
    Loader,
    handleDelete,
    confirmDelete,
    isVisible,
    setIsVisible,
    WeighbridgeSpots,
    navigation,
    paddingTopAnimated,
    scrollY,
    translateButtonY,
    fadeAnim,
    translateY,
    handleSearchPress,
    isSearchVisible,
    setSearchQuery,
    searchQuery,
    modelShow,
    setModelShow,
    toggleFilterMenu,
    handleFilterPress,
    weighBridgeTypeConnectivity,
    filterBadgeVisible,
    setFilterCount, 
    filterCount,
    setWeighBridgeTypeConnectivity

  };
}
export default WeighBridgeScreenHooks;
