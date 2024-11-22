import { useEffect, useCallback, useState, useMemo, useContext, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useBackHandler } from '@react-native-community/hooks';
import { RootState, store } from '../../reducer/Store';
import {
  DeleteGenericSpot,
  GenericSpotsData,
} from '../../reducer/genericSpot/uploadGenericDataAction';
import CustomToast from '../../reuseableComponent/modal/CustomToast';
import { DataByConnectivityContext } from '../../contextApi/DataByConnectivity';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AppNavigationParams } from '../../navigation/NavigationStackList';
import { Animated } from 'react-native';
type FilterOption = 'connected' | 'not-connected' | 'all';

const GenericScreenHooks = () => {
  const [filterBadgeVisible, setFilterBadgeVisible] = useState(false);
  const [filterCount, setFilterCount] = useState(0);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const handleSearchPress = () => {
    setIsSearchVisible(!isSearchVisible); // Toggle search bar visibility
  };
  const [searchQuery, setSearchQuery] = useState<string>('');
  const baseUrls = useSelector(
    (state: RootState) => state.authentication.baseUrl,
  );
  const buCode = useSelector((state: RootState) => state.authentication.buCode);
  const token = useSelector((state: RootState) => state.authentication.token);
  const GenericSpots = useSelector(
    (state: RootState) => state.uploadGeneric.GenericSpots,
  );
  const navigation = useNavigation<NavigationProp<AppNavigationParams>>();
  const onHandlePress = () => {
    navigation.navigate('GenericSpotAddScreen', { id: undefined });
  };
  const { genericTypeConnectivity, setGenericTypeConnectivity } = useContext(DataByConnectivityContext);
  const GenericConnectedSpot = GenericSpots.filter((item: any) => item.active === true)
  const GenericNotConnectedSpot = GenericSpots.filter((item: any) => item.active === false)
  const Loader = useSelector((state: RootState) => state.uploadGeneric.loader);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 200);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 200],
    outputRange: [0, -200],
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

  const getGenericData = useCallback(async () => {
    // console.log('hello form useEffect');
    store.dispatch(
      GenericSpotsData({
        baseUrl: baseUrls,
        token: token,
        buCode: buCode,
      }),
    );
  }, [baseUrls, buCode, token]);
  useEffect(() => {
    getGenericData();
  }, [baseUrls, getGenericData, buCode, token]);

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
        DeleteGenericSpot({
          baseUrl: baseUrls,
          id: deleteId,
          bucode: buCode,
          token: token,
        }),
      );
      //   getGenericData(); // Re-fetch data after delete action
      if (!Loader) {
        CustomToast('success', 'Deleted successfully');
      }
    } catch (error) {
      CustomToast('error', 'Failed to delete the spot. Please try again.');
    } finally {
      setDeleteId(null);
    }
  }, [deleteId, baseUrls, buCode, token, Loader]);

  const spotsData = GenericSpots.filter((spot: any) => {
    const matchesFilter =
      genericTypeConnectivity === 'all' ||
      (genericTypeConnectivity === 'connected' && spot?.active) ||
      (genericTypeConnectivity === 'not-connected' && !spot?.active);
    const matchesSearch = searchQuery
      ? Object.values(spot).some((value) =>
        String(value).toLowerCase().includes(searchQuery.toLowerCase())
      )
      : true;
    return matchesFilter && matchesSearch;
  });

  const [modelShow, setModelShow] = useState<boolean>(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const toggleFilterMenu = () => {
    // console.log('Toggle function run');
    setModelShow(prevState => !prevState);
    setModelShow(true);
  };

  // Handle filter selection
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleFilterPress = (selectedFilter: FilterOption) => {
    console.log("selected Filter", selectedFilter)
    setGenericTypeConnectivity(selectedFilter);
    setFilterCount(1)
    setModelShow(false);
  };
  useEffect(() => {
    if (genericTypeConnectivity !== "all") {
      setFilterBadgeVisible(true)
    }
  }, [genericTypeConnectivity])



  const handleResetConnectivity = () => {
    navigation.goBack()
    setGenericTypeConnectivity("all")
    return true;
  }
  useBackHandler(handleResetConnectivity);
  return useMemo(
    () => ({
      GenericSpots,
      Loader,
      handleDelete,
      confirmDelete,
      isVisible,
      setIsVisible,
      getGenericData,
      GenericConnectedSpot,
      GenericNotConnectedSpot,
      genericTypeConnectivity,
      onHandlePress,
      navigation,
      translateY,
      paddingTopAnimated,
      scrollY,
      spotsData,
      translateButtonY,
      fadeAnim,
      handleSearchPress,
      isSearchVisible,
      setSearchQuery,
      searchQuery,
      modelShow,
      setModelShow,
      toggleFilterMenu,
      handleFilterPress,
      filterBadgeVisible,
      setFilterCount,
      filterCount,
      setGenericTypeConnectivity,
    }),
    [
      GenericSpots,
      Loader,
      handleDelete,
      confirmDelete,
      isVisible,
      setIsVisible,
      getGenericData,
      GenericConnectedSpot,
      GenericNotConnectedSpot,
      genericTypeConnectivity,
      onHandlePress,
      navigation,
      translateY,
      paddingTopAnimated,
      scrollY,
      spotsData,
      translateButtonY,
      fadeAnim,
      handleSearchPress,
      isSearchVisible,
      setSearchQuery,
      searchQuery,
      modelShow,
      setModelShow,
      toggleFilterMenu,
      handleFilterPress,
      filterBadgeVisible,
      setFilterCount,
      filterCount,
      setGenericTypeConnectivity,
      handleSearchPress
    ],
  );
};

export default GenericScreenHooks;
