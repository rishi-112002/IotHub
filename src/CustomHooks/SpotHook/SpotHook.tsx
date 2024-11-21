import {useEffect, useState, useCallback, useMemo, useContext} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Alert, Animated, NativeScrollEvent, NativeSyntheticEvent} from 'react-native';
import {RootState, store} from '../../reducer/Store';
import {GetSpotData} from '../../reducer/spotData/spotDataAction';
import { useBackHandler } from '@react-native-community/hooks';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { AppNavigationParams } from '../../navigation/NavigationStackList';
import { DataByConnectivityContext } from '../../contextApi/DataByConnectivity';
type FilterOption = 'connected' | 'not-connected' | 'all';

export const SpotListHook = () => {
  const dispatch = useDispatch();

  const baseUrl = useSelector(
    (state: RootState) => state.authentication.baseUrl,
  );
  const { spotTypeConnectivity, setSpotTypeConnectivity } = useContext(DataByConnectivityContext);

  const Loader = useSelector((state: RootState) => state.spotData.loader);
  const LError = useSelector((state: RootState) => state.spotData.error);
  const spotListData = useSelector((state: RootState) => state.spotData.spotData);
  const buCode = useSelector((State: RootState) => State.authentication.buCode);
  const navigation = useNavigation<NavigationProp<AppNavigationParams>>();

  const [refreshing, setRefreshing] = useState(false);

  // Load RFID list
  const loadSpotList = useCallback(async () => {
    setRefreshing(true);
    store.dispatch(GetSpotData({baseUrl: baseUrl}));
    setRefreshing(false);
  }, [baseUrl, dispatch]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [modelShow, setModelShow] = useState<boolean>(false);

  useEffect(() => {
    loadSpotList();
  }, [baseUrl, loadSpotList]);

  useEffect(() => {
    if (LError) {
      // console.log("LoadListError UseEffect...");
      Alert.alert('Error', LError, [{text: 'OK'}], {cancelable: false});
    }
  }, [LError]);
  // console.log("LoaderRefresh UseEffect...")

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
  //                 console.log('Delete Success :- ',deleteRfidListAction.fulfilled.match(resultAction));
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
  // console.log('spotListData :- ', spotListData);

  // Check if no results match both filter and search query
  const noResults = filteredSpots.length === 0 && searchQuery.length > 0;

  // Animated scroll logic for header and search bar visibility
  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 130);
  const translateY = diffClamp.interpolate({
    inputRange: [-20, 130],
    outputRange: [15, -130],
  });

  // Clear search functionality
  const clearSearch = () => setSearchQuery('');

  const clearFilter = () => {
    setSpotTypeConnectivity('all');
  };

  // Scroll event handler
  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollY.setValue(e.nativeEvent.contentOffset.y);
  };

  // Toggle the filter menu modal visibility
  const toggleFilterMenu = () => {
    setModelShow(prevState => !prevState);
  };

  // Handle filter selection
  const handleFilterPress = (selectedFilter: FilterOption) => {
    setSpotTypeConnectivity(selectedFilter);
    setSearchQuery('');
    setModelShow(false);
  };
  
  const handleResetConnectivity = () => {
    navigation.goBack()
    setSpotTypeConnectivity("all")
    return true;
  }
  useBackHandler(handleResetConnectivity);
  return useMemo(
    () => ({
      Loader,modelShow,filteredSpots,noResults, handleFilterPress, handleScroll, loadRfidList: loadSpotList,clearFilter,spotTypeConnectivity, refreshing,toggleFilterMenu, buCode,clearSearch ,translateY ,searchQuery,setSearchQuery
    }),
    [ Loader,modelShow,filteredSpots,noResults, handleFilterPress, handleScroll, loadSpotList,clearFilter,spotTypeConnectivity, refreshing,toggleFilterMenu, buCode,clearSearch ,translateY ,searchQuery,setSearchQuery],
  );
};
