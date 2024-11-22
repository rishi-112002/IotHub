import {useEffect, useState, useCallback, useMemo, useContext} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  Alert,
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import {RootState, store} from '../../reducer/Store';
import {GetSpotData} from '../../reducer/spotData/spotDataAction';
import {useBackHandler} from '@react-native-community/hooks';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {AppNavigationParams} from '../../navigation/NavigationStackList';
import {DataByConnectivityContext} from '../../contextApi/DataByConnectivity';
type FilterOption = 'connected' | 'not-connected' | 'all';

export const SpotListHook = () => {
  const dispatch = useDispatch();

  const baseUrl = useSelector(
    (state: RootState) => state.authentication.baseUrl,
  );
  const {spotTypeConnectivity, setSpotTypeConnectivity} = useContext(
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
    store.dispatch(GetSpotData({baseUrl: baseUrl}));
    setRefreshing(false);
  }, [baseUrl]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [modelShow, setModelShow] = useState<boolean>(false);

  useEffect(() => {
    loadSpotList();
  }, [baseUrl, loadSpotList]);

  useEffect(() => {
    if (LError) {
      Alert.alert('Error', LError, [{text: 'OK'}], {cancelable: false});
      // >>>>>>> ec436c4728f9119f3c3b614674b1eaab656bba63
    }
  }, [LError]);

  //   // Delete RFID item
  //   const handleDelete = useCallback(
  //     async (id: string) => {
  //       Alert.alert(
  //         'Delete RFID',
  //         'Are you sure you want to delete this RFID?',
  //         [
  //           {text: 'Cancel', style: 'cancel'},
  //           {
  //             text: 'OK',
  //             onPress: async () => {
  //               const resultAction = dispatch(
  //                 deleteRfidListAction({id, buCode, token}),
  //               );
  //               if (deleteRfidListAction.fulfilled.match(resultAction)) {
  //                 Alert.alert(
  //                   'Success',
  //                   'RFID deleted successfully!',
  //                   [{text: 'OK'}],
  //                   {cancelable: false},
  //                 );
  //                 await loadRfidList(); // Refresh list
  //               } else {
  //                 // console.error(resultAction.error.message);
  //               }
  //             },
  //           },
  //         ],
  //         {cancelable: false},
  //       );
  //     },
  //     [buCode, token, dispatch, loadRfidList],
  //   );

  // Memoize output to avoid recalculations when nothing changes
  const filteredSpots = spotListData.filter((spot: any) => {
    const matchesFilter =
      spotTypeConnectivity === 'all' ||
      (spotTypeConnectivity === 'connected' && spot?.active) ||
      (spotTypeConnectivity === 'not-connected' && !spot?.active);
    const matchesSearch = spot?.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Check if no results match both filter and search query
  const noResults = filteredSpots.length === 0 && searchQuery.length > 0;

  // Animated scroll logic for header and search bar visibility
  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 110);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 110],
    outputRange: [0, -110],
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

  // Clear search functionality
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const clearSearch = () => setSearchQuery('');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const clearFilter = () => {
    setSpotTypeConnectivity('all');
  };

  // Scroll event handler
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollY.setValue(e.nativeEvent.contentOffset.y);
  };

  // Toggle the filter menu modal visibility
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const toggleFilterMenu = () => {
    // setModelShow(prevState => !prevState);
    setModelShow(true);
  };

  // Handle filter selection
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleFilterPress = (selectedFilter: FilterOption) => {
    setSpotTypeConnectivity(selectedFilter);
    setSearchQuery('');
    setModelShow(false);
  };

  useEffect(() => {
    if (spotTypeConnectivity !== 'all') {
      setFilterCount(1);
      setFilterBadgeVisible(true);
    }
  }, [spotTypeConnectivity]);

  const handleResetConnectivity = () => {
    navigation.goBack();
    setSpotTypeConnectivity('all');
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
      loadRfidList: loadSpotList,
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
