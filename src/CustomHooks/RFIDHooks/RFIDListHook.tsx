// /* eslint-disable react-hooks/exhaustive-deps */
// import {useEffect, useState, useCallback, useMemo, useContext} from 'react';
// import {useDispatch, useSelector} from 'react-redux';
// import {
//   getRfidListAction,
//   deleteRfidListAction,
// } from '../../reducer/RFIDList/RFIDListAction';
// import {RootState, store} from '../../reducer/Store';
// import showCustomToast from '../../reuseableComponent/modal/CustomToast';
// // import CustomAlert from '../../reuseableComponent/PopUp/CustomPopUp';
// // import React from 'react';
// import {DataByConnectivityContext} from '../../contextApi/DataByConnectivity';
// import {useBackHandler} from '@react-native-community/hooks';
// import {useNavigation, NavigationProp} from '@react-navigation/native';
// import {AppNavigationParams} from '../../navigation/NavigationStackList';
// import {resetDeleteStatus} from '../../reducer/RFIDList/RFIDListReducer';
// import CustomToast from '../../reuseableComponent/modal/CustomToast';

// type FilterOption = 'used' | 'un-used' | 'all';

// export const RfidListHook = () => {
//   const dispatch = useDispatch();
//   const navigation = useNavigation<NavigationProp<AppNavigationParams>>();
//   const [filterCount, setFilterCount] = useState(0);
//   const [isSearchVisible, setIsSearchVisible] = useState(false);
//   const handleSearchPress = () => {
//     setIsSearchVisible(!isSearchVisible);
//   };
//   const [searchQuery, setSearchQuery] = useState<string>('');
//   const {rfidType, setRfidType} = useContext(DataByConnectivityContext);

//   const ListData = useSelector(
//     (state: RootState) => state.rfidList.RfidListData,
//   );
//   const Loader = useSelector((state: RootState) => state.rfidList.loader);
//   // const LError = useSelector((state: RootState) => state.rfidList.errors.list);
//   // const DError = useSelector(
//   //   (state: RootState) => state.rfidList.errors.delete,
//   // );
//   const buCode = useSelector((state: RootState) => state.authentication.buCode);
//   const token = useSelector((state: RootState) => state.authentication.token);
//   const baseUrl = useSelector(
//     (state: RootState) => state.authentication.baseUrl,
//   );
//   const usedRfid = ListData.filter(
//     (rfid: any) => rfid.direction === null && rfid.type === null,
//   );
//   const UnusedRfid = ListData.filter(
//     (rfid: any) => rfid.direction !== null && rfid.type !== null,
//   );
//   const deleteStatus = useSelector(
//     (state: RootState) => state.rfidList.deleteStatus,
//   );
//   const uploadError = useSelector(
//     (state: RootState) => state.rfidList.errors,
//   );
//   const status = useSelector((state: RootState) => state.uploadGeneric.status);

//   const [refreshing, setRefreshing] = useState(false);
//   const [alertVisible, setAlertVisible] = useState(false);
//   const [rfidToDelete, setRfidToDelete] = useState<string | null>(null);
//   const [successAlertVisible, setSuccessAlertVisible] = useState(false);
//   const [errorAlertVisible, setErrorAlertVisible] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [filterBadgeVisible, setFilterBadgeVisible] = useState(false);
//   const [loader, setLoader] = useState(false);

//   const loadRfidList = useCallback(async () => {
//     setRefreshing(true);
//     setErrorAlertVisible(false); // Reset error alert before fetching data
//     setSuccessAlertVisible(false); // Reset success alert before fetching data
//     setErrorMessage(''); // Clear previous error message
//     try {
//       store.dispatch(getRfidListAction({baseUrl}));
//     } catch (error) {
//       // Handle fetch error if necessary

//       console.error('Error loading RFID list:', error);
//     } finally {
//       setRefreshing(false);
//     }
//   }, [baseUrl, store]);

//   useEffect(() => {
//     loadRfidList();
//   }, [baseUrl, loadRfidList]);

//   const filteredRfid = ListData.filter((rfid: any) => {
//     const matchesFilter =
//       rfidType === 'all' ||
//       (rfidType === 'un-used' &&
//         rfid.direction === null &&
//         rfid.type === null) ||
//       (rfidType === 'used' && rfid.direction !== null && rfid.type !== null);
//     const matchesSearch = searchQuery
//       ? Object.values(rfid).some(value =>
//           String(value).toLowerCase().includes(searchQuery.toLowerCase()),
//         )
//       : true;
//     return matchesFilter && matchesSearch;
//     // >>>>>>> ec436c4728f9119f3c3b614674b1eaab656bba63
//   });

//   const handleDelete = useCallback((id: string) => {
//     setRfidToDelete(id);
//     setAlertVisible(true);
//   }, []);

//   const confirmDelete = useCallback(async () => {
//     if (!rfidToDelete) {
//       return;
//     }

//     setAlertVisible(false);
//     await store.dispatch(
//       deleteRfidListAction({id: rfidToDelete, buCode, token}),
//     );
//       await loadRfidList();
//   }, [rfidToDelete, buCode, token, loadRfidList]);

//   useEffect(() => {
//     switch (deleteStatus) {
//       case 'failed':
//         CustomToast('error', uploadError);

//         dispatch(resetDeleteStatus());
//         setLoader(false);
//         break;
//       case 'succeeded':
//         CustomToast('success', status);

//         dispatch(resetDeleteStatus());
//         setLoader(false);
//         break;
//       case 'loading':
//         setLoader(true);
//         break;
//       default:
//         setLoader(false);
//         break;
//     }
//   }, [dispatch, deleteStatus, uploadError, status]);

//   const [modelShow, setModelShow] = useState<boolean>(false);

//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   const toggleFilterMenu = () => {
//     setModelShow(prevState => !prevState);
//     setModelShow(!modelShow);
//   };

//   // Handle filter selection
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   const handleFilterPress = (selectedFilter: FilterOption) => {
//     setRfidType(selectedFilter);
//     setModelShow(false);
//   };
//   useEffect(() => {
//     if (rfidType !== 'all') {
//       setFilterCount(1);
//       setFilterBadgeVisible(true);
//     }
//   }, [rfidType]);

//   const handleResetConnectivity = () => {
//     navigation.goBack();
//     setRfidType('all');
//     return true;
//   };
//   useBackHandler(handleResetConnectivity);
//   return useMemo(
//     () => ({
//       ListData,
//       Loader,
//       loadRfidList,
//       handleDelete,
//       refreshing,
//       buCode,
//       alertVisible,
//       setAlertVisible,
//       confirmDelete,
//       successAlertVisible,
//       setSuccessAlertVisible,
//       errorAlertVisible,
//       setErrorAlertVisible,
//       errorMessage,
//       rfidType,
//       UnusedRfid,
//       usedRfid,
//       filteredRfid,
//       navigation,
//       searchQuery,
//       setSearchQuery,
//       handleSearchPress,
//       isSearchVisible,
//       modelShow,
//       toggleFilterMenu,
//       handleFilterPress,
//       filterBadgeVisible,
//       filterCount,
//       setFilterCount,
//       setRfidType,
//     }),
//     [
//       ListData,
//       Loader,
//       loadRfidList,
//       handleDelete,
//       refreshing,
//       buCode,
//       alertVisible,
//       confirmDelete,
//       successAlertVisible,
//       errorAlertVisible,
//       errorMessage,
//       rfidType,
//       UnusedRfid,
//       usedRfid,
//       filteredRfid,
//       navigation,
//       setSearchQuery,
//       handleSearchPress,
//       isSearchVisible,
//       modelShow,
//       toggleFilterMenu,
//       handleFilterPress,
//       filterBadgeVisible,
//       filterCount,
//       setFilterCount,
//       setRfidType,
//     ],
//   );
// };

/* eslint-disable react-hooks/exhaustive-deps */
import {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useContext,
  useLayoutEffect,
  useRef,
} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  getRfidListAction,
  deleteRfidListAction,
  CreateRFIDdata,
  EditRFIDdata,
} from '../../reducer/RFIDList/RFIDListAction';
import {RootState, store} from '../../reducer/Store';
import {
  resetDeleteStatus,
  resetEditStatus,
  resetCreateStatus,
} from '../../reducer/RFIDList/RFIDListReducer';
import CustomToast from '../../reuseableComponent/modal/CustomToast';
import {DataByConnectivityContext} from '../../contextApi/DataByConnectivity';
import {useBackHandler} from '@react-native-community/hooks';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {AppNavigationParams} from '../../navigation/NavigationStackList';

type FilterOption = 'used' | 'un-used' | 'all';

type RfidPayload = {
  id?: string;
  data?: any;
};

export const RfidListHook = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<AppNavigationParams>>();

  const [refreshing, setRefreshing] = useState(false);
  const [listData, setListData] = useState<any[]>([]);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterCount, setFilterCount] = useState(0);
  const [filterBadgeVisible, setFilterBadgeVisible] = useState(false);
  const [modelShow, setModelShow] = useState<boolean>(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [loader, setLoader] = useState(false);
  const [rfidToDelete, setRfidToDelete] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editRfidData, setEditRfidData] = useState<any>(null);
  const flatListRef = useRef<FlatList<any>>(null);
  const [visibleIndex, setVisibleIndex] = useState<number>(0);

  const {rfidType, setRfidType} = useContext(DataByConnectivityContext);
  const Loader = useSelector((state: RootState) => state.rfidList.loader);
  const allRfidList = useSelector(
    (state: RootState) => state.rfidList.RfidListData,
  );
  const usedRfid = allRfidList.filter(
    (rfid: any) => rfid.direction === null && rfid.type === null,
  );
  const UnusedRfid = allRfidList.filter(
    (rfid: any) => rfid.direction !== null && rfid.type !== null,
  );
  const deleteStatus = useSelector(
    (state: RootState) => state.rfidList.deleteStatus,
  );
  const addStatus = useSelector(
    (state: RootState) => state.rfidList.createStatus,
  );
  const updateStatus = useSelector(
    (state: RootState) => state.rfidList.editStatus,
  );
  const uploadError = useSelector((state: RootState) => state.rfidList.errors);
  const baseUrl = useSelector(
    (state: RootState) => state.authentication.baseUrl,
  );
  const buCode = useSelector((state: RootState) => state.authentication.buCode);
  const token = useSelector((state: RootState) => state.authentication.token);

  useEffect(() => {
    if (listData.length === 0) {
      setListData(allRfidList);
    }
  }, [allRfidList, listData]);

  // useLayoutEffect(() => {
  //   store.dispatch(getRfidListAction({baseUrl}));
  // }, [store, baseUrl]);

  const filteredRfid = useMemo(() => {
    return allRfidList.filter((rfid: any) => {
      const matchesFilter =
        rfidType === 'all' ||
        (rfidType === 'un-used' &&
          rfid.direction === null &&
          rfid.type === null) ||
        (rfidType === 'used' && rfid.direction !== null && rfid.type !== null);
      const matchesSearch = searchQuery
        ? Object.values(rfid).some(value =>
            String(value).toLowerCase().includes(searchQuery.toLowerCase()),
          )
        : true;
      return matchesFilter && matchesSearch;
    });
  }, [allRfidList, rfidType, searchQuery]);
  const noResults = filteredRfid.length === 0 && searchQuery.length > 0;

  const loadRfidList = useCallback(() => {
    setLoader(true);
    setRefreshing(true);
    store.dispatch(getRfidListAction({baseUrl}));
    setRefreshing(false);
    setLoader(false);
  }, [baseUrl, dispatch]);

  useEffect(() => {
    loadRfidList();
  }, [loadRfidList]);

  // const loadRfidList = useCallback(async () => {
  //   setRefreshing(true);
  //   try {
  //     store.dispatch(getRfidListAction({baseUrl}));
  //     setRefreshing(false);
  //   } catch (error) {
  //     // Handle fetch error if necessary

  //     console.error('Error loading RFID list:', error);
  //   } finally {
  //     setRefreshing(false);
  //   }
  // }, [baseUrl, store]);

  // useEffect(() => {
  //   loadRfidList();
  // }, [baseUrl, loadRfidList]);

  const handleDelete = useCallback((id: string) => {
    setRfidToDelete(id);
    setAlertVisible(true);
  }, []);

  const onViewableItemsChanged = useCallback(({viewableItems}) => {
    if (viewableItems.length > 0) {
      setVisibleIndex(viewableItems[0].index);
    }
  }, []);

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const confirmDelete = useCallback(() => {
    if (!rfidToDelete) return;

    setAlertVisible(false);
    // setLoader(true);
    store.dispatch(deleteRfidListAction({id: rfidToDelete, buCode, token}));
    // setLoader(false);
    loadRfidList();
    setTimeout(() => {
      flatListRef.current?.scrollToIndex({
        animated: false,
        index: visibleIndex,
      });
    }, 300);
  }, [rfidToDelete, buCode, token, dispatch]);

  // const handleAddRfid = useCallback(
  //   (data: any) => {
  //     setLoader(true);
  //     dispatch(CreateRFIDdata({data, buCode, token}));
  //     setLoader(false);
  //   },
  //   [dispatch, buCode, token],
  // );

  // const handleUpdateRfid = useCallback(
  //   (payload: RfidPayload) => {
  //     setLoader(true);
  //     dispatch(EditRFIDdata({...payload, buCode, token}));
  //     setLoader(false);
  //   },
  //   [dispatch, buCode, token],
  // );

  useEffect(() => {
    switch (deleteStatus) {
      case 'failed':
        CustomToast('error', uploadError);
        dispatch(resetDeleteStatus());
        break;
      case 'succeeded':
        CustomToast('success', 'RFID deleted successfully');
        setListData(prevList =>
          prevList.filter(rfid => rfid.id !== rfidToDelete),
        );
        dispatch(resetDeleteStatus());
        break;
      default:
        break;
    }
  }, [deleteStatus, uploadError, dispatch, rfidToDelete]);

  useEffect(() => {
    switch (addStatus) {
      case 'failed':
        CustomToast('error', uploadError);
        dispatch(resetCreateStatus());
        setLoader(false);
        break;
      case 'succeeded':
        CustomToast('success', 'RFID added successfully');
        dispatch(resetCreateStatus());
        navigation.goBack();
        // loadRfidList();
        setLoader(false);
        break;
      default:
        break;
    }
  }, [addStatus, uploadError, dispatch, loadRfidList]);

  useEffect(() => {
    switch (updateStatus) {
      case 'failed':
        CustomToast('error', uploadError);
        dispatch(resetEditStatus());
        setLoader(false);
        break;
      case 'succeeded':
        CustomToast('success', 'RFID updated successfully');
        dispatch(resetEditStatus());
        // setListData(prevList =>
        //   prevList.map(rfid =>
        //     rfid.id === item.id
        //       ? {...rfid, name, model, ip: IPAddress, port}
        //       : rfid,
        //   ),
        // );
        navigation.goBack();
        // loadRfidList();
        setLoader(false);
        break;
      default:
        break;
    }
  }, [updateStatus, uploadError, dispatch, loadRfidList]);

  // const handleSearchPress = useCallback(() => {
  //   setIsSearchVisible(prev => !prev);
  // }, []);
  const handleSearchPress = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const toggleFilterMenu = () => {
    setModelShow(prevState => !prevState);
    setModelShow(!modelShow);
  };

  // Handle filter selection
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleFilterPress = (selectedFilter: FilterOption) => {
    setRfidType(selectedFilter);
    setModelShow(false);
  };
  useEffect(() => {
    if (rfidType !== 'all') {
      setFilterCount(1);
      setFilterBadgeVisible(true);
    }
  }, [rfidType]);

  const handleResetConnectivity = () => {
    navigation.goBack();
    setRfidType('all');
    return true;
  };
  useBackHandler(handleResetConnectivity);

  return useMemo(
    () => ({
      // ListData,
      noResults,
      loader,
      Loader,
      loadRfidList,
      handleDelete,
      refreshing,
      buCode,
      alertVisible,
      setAlertVisible,
      confirmDelete,
      rfidType,
      UnusedRfid,
      usedRfid,
      filteredRfid,
      navigation,
      searchQuery,
      setSearchQuery,
      handleSearchPress,
      isSearchVisible,
      modelShow,
      toggleFilterMenu,
      handleFilterPress,
      filterBadgeVisible,
      filterCount,
      setFilterCount,
      setRfidType,
      onViewableItemsChanged,
      viewabilityConfig,
    }),
    [
      // ListData,
      noResults,
      onViewableItemsChanged,
      viewabilityConfig,
      loader,
      Loader,
      loadRfidList,
      handleDelete,
      refreshing,
      buCode,
      alertVisible,
      confirmDelete,
      // successAlertVisible,
      // errorAlertVisible,
      // errorMessage,
      rfidType,
      UnusedRfid,
      usedRfid,
      filteredRfid,
      navigation,
      setSearchQuery,
      handleSearchPress,
      isSearchVisible,
      modelShow,
      toggleFilterMenu,
      handleFilterPress,
      filterBadgeVisible,
      filterCount,
      setFilterCount,
      setRfidType,
    ],
  );
};
