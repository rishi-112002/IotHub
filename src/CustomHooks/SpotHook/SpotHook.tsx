import { useEffect, useState, useCallback, useMemo, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Alert,
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { RootState, store } from '../../reducer/Store';
import { GetSpotData } from '../../reducer/spotData/spotDataAction';
import { useBackHandler } from '@react-native-community/hooks';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { AppNavigationParams } from '../../navigation/NavigationStackList';
import { DataByConnectivityContext } from '../../contextApi/DataByConnectivity';
import { Strings } from '../../assets/constants/Lable';
type FilterOption = 'connected' | 'not-connected' | 'all';

export const SpotListHook = () => {
  const baseUrl = useSelector(
    (state: RootState) => state.authentication.baseUrl,
  );
  const { spotTypeConnectivity, setSpotTypeConnectivity } = useContext(
    DataByConnectivityContext,
  );
  const [filterBadgeVisible, setFilterBadgeVisible] = useState(false);
  const [filterCount, setFilterCount] = useState(0);
  const Loader = useSelector((state: RootState) => state.spotData.loader);
  const LError = useSelector((state: RootState) => state.spotData.error);
  const spotListData = useSelector(
    (state: RootState) => state.spotData.spotData,
  );
  const buCode = useSelector((State: RootState) => State.authentication.buCode);
  const navigation = useNavigation<NavigationProp<AppNavigationParams>>();

  const [refreshing, setRefreshing] = useState(false);

  // Load RFID list
  const loadSpotList = useCallback(async () => {
    setRefreshing(true);
    store.dispatch(GetSpotData({ baseUrl: baseUrl }));
    setRefreshing(false);
  }, [baseUrl]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [modelShow, setModelShow] = useState<boolean>(false);

  useEffect(() => {
    loadSpotList();
  }, [baseUrl, loadSpotList]);

  useEffect(() => {
    if (LError) {
      Alert.alert(Strings.ERROR_s, LError, [{ text: Strings.OK }], { cancelable: false });
    }
  }, [LError]);
  const filteredSpots = spotListData.filter((spot: any) => {
    const matchesFilter =
      spotTypeConnectivity === Strings.ALL ||
      (spotTypeConnectivity === Strings.CONNECTED_S && spot?.active) ||
      (spotTypeConnectivity === Strings.NOT_CONNECTED_s && !spot?.active);
    const matchesSearch = searchQuery
      ? Object.values(spot).some(value =>
        String(value).toLowerCase().includes(searchQuery.toLowerCase()),
      )
      : true;
    return matchesFilter && matchesSearch;
  });
  // Check if no results match both filter and search query
  const noResults = filteredSpots.length === 0 && searchQuery.length > 0;

  // Animated scroll logic for header and search bar visibility
  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 110);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 200],
    outputRange: [0, -200],
  });
  const paddingTopAnimated = scrollY.interpolate({
    inputRange: [0, 110],
    outputRange: [60, 0],
    extrapolate: 'clamp',
  });

  const clearSearch = () => setSearchQuery('');
  const clearFilter = () => {
    setSpotTypeConnectivity(Strings.ALL);
  };
  const handleScroll = () => {
    Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
      useNativeDriver: false,
    });
  };

  const toggleFilterMenu = () => {
    setModelShow(!modelShow);
  };

  // Handle filter selection
  const handleFilterPress = (selectedFilter: FilterOption) => {
    setSpotTypeConnectivity(selectedFilter);
    setSearchQuery('');
    setModelShow(false);
  };

  useEffect(() => {
    if (spotTypeConnectivity !== Strings.ALL) {
      setFilterCount(1);
      setFilterBadgeVisible(true);
    }
  }, [spotTypeConnectivity]);

  const handleResetConnectivity = () => {
    navigation.goBack();
    setSpotTypeConnectivity(Strings.ALL);
    return true;
  };
  useBackHandler(handleResetConnectivity);
  return useMemo(
    () => ({
      Loader,
      modelShow,
      filteredSpots,
      noResults,
      handleFilterPress,
      handleScroll,
      loadSpotList,
      clearFilter,
      spotTypeConnectivity,
      refreshing,
      toggleFilterMenu,
      buCode,
      clearSearch,
      translateY,
      searchQuery,
      setSearchQuery,
      setSpotTypeConnectivity,
      filterBadgeVisible,
      setFilterBadgeVisible,
      filterCount,
      setFilterCount,
      paddingTopAnimated,
    }),
    [
      Loader,
      modelShow,
      filteredSpots,
      noResults,
      handleFilterPress,
      handleScroll,
      loadSpotList,
      clearFilter,
      spotTypeConnectivity,
      refreshing,
      toggleFilterMenu,
      buCode,
      clearSearch,
      translateY,
      searchQuery,
      setSearchQuery,
      setSpotTypeConnectivity,
      filterBadgeVisible,
      setFilterBadgeVisible,
      filterCount,
      setFilterCount,
      paddingTopAnimated,
    ],
  );
};
