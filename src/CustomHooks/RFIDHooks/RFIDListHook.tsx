/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState, useCallback, useMemo, useContext} from 'react';
import {useSelector} from 'react-redux';
import {
  getRfidListAction,
  deleteRfidListAction,
} from '../../reducer/RFIDList/RFIDListAction';
import {RootState, store} from '../../reducer/Store';
import showCustomToast from '../../reuseableComponent/modal/CustomToast';
// import CustomAlert from '../../reuseableComponent/PopUp/CustomPopUp';
// import React from 'react';
import {DataByConnectivityContext} from '../../contextApi/DataByConnectivity';
import {useBackHandler} from '@react-native-community/hooks';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {AppNavigationParams} from '../../navigation/NavigationStackList';

type FilterOption = 'used' | 'un-used' | 'all';

export const RfidListHook = () => {
  // const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<AppNavigationParams>>();
  const [filterCount, setFilterCount] = useState(0);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const handleSearchPress = () => {
    setIsSearchVisible(!isSearchVisible); // Toggle search bar visibility
  };
  const [searchQuery, setSearchQuery] = useState<string>('');
  const {rfidType, setRfidType} = useContext(DataByConnectivityContext);

  const ListData = useSelector(
    (state: RootState) => state.rfidList.RfidListData,
  );
  const Loader = useSelector((state: RootState) => state.rfidList.loader);
  const LError = useSelector((state: RootState) => state.rfidList.errors.list);
  const DError = useSelector(
    (state: RootState) => state.rfidList.errors.delete,
  );
  const buCode = useSelector((state: RootState) => state.authentication.buCode);
  const token = useSelector((state: RootState) => state.authentication.token);
  const baseUrl = useSelector(
    (state: RootState) => state.authentication.baseUrl,
  );
  const usedRfid = ListData.filter(
    (rfid: any) => rfid.direction === null && rfid.type === null,
  );
  const UnusedRfid = ListData.filter(
    (rfid: any) => rfid.direction !== null && rfid.type !== null,
  );
  const [refreshing, setRefreshing] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [rfidToDelete, setRfidToDelete] = useState<string | null>(null);
  const [successAlertVisible, setSuccessAlertVisible] = useState(false);
  const [errorAlertVisible, setErrorAlertVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterBadgeVisible, setFilterBadgeVisible] = useState(false);

  const loadRfidList = useCallback(async () => {
    setRefreshing(true);
    setErrorAlertVisible(false); // Reset error alert before fetching data
    setSuccessAlertVisible(false); // Reset success alert before fetching data
    setErrorMessage(''); // Clear previous error message
    try {
      store.dispatch(getRfidListAction({baseUrl}));
    } catch (error) {
      // Handle fetch error if necessary

      console.error('Error loading RFID list:', error);
    } finally {
      setRefreshing(false);
    }
  }, [baseUrl, store]);

  useEffect(() => {
    loadRfidList();
  }, [baseUrl, loadRfidList]);

  // <<<<<<< HEAD
  //   const filteredRfid = ListData.filter((spot: any) => {
  //     // const matchesFilter =
  //     //   spotTypeConnectivity === 'all' ||
  //     //   (spotTypeConnectivity === 'connected' && spot?.active) ||
  //     //   (spotTypeConnectivity === 'not-connected' && !spot?.active);
  //     const matchesSearch = spot?.name
  //       .toLowerCase()
  //       .includes(searchQuery.toLowerCase());
  //     // return matchesFilter && matchesSearch;
  //     return matchesSearch;
  // =======
  // const filteredRfid = ListData.filter((spot: any) => {
  //   // const matchesFilter =
  //   //   spotTypeConnectivity === 'all' ||
  //   //   (spotTypeConnectivity === 'connected' && spot?.active) ||
  //   //   (spotTypeConnectivity === 'not-connected' && !spot?.active);
  //   const matchesSearch = spot?.name
  //     .toLowerCase()
  //     .includes(searchQuery.toLowerCase());
  //   // return matchesFilter && matchesSearch;
  //   return matchesSearch;
  // });

  const filteredRfid = ListData.filter((rfid: any) => {
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
    // >>>>>>> ec436c4728f9119f3c3b614674b1eaab656bba63
  });

  // useEffect(() => {
  //   // Display error if any
  //   if (LError || DError) {
  //     setErrorMessage(LError || DError);
  //     setErrorAlertVisible(true);
  //   }
  // }, [LError, DError]);

  const handleDelete = useCallback((id: string) => {
    setRfidToDelete(id);
    setAlertVisible(true);
    // return(
    //   <CustomAlert
    //   isVisible={alertVisible}
    //   onClose={() => setAlertVisible(false)}
    //   onOkPress={confirmDelete}
    //   title="Delete RFID"
    //   message="Are you sure you want to delete this RFID?"
    //   showCancel={true}
    // />
    // );
  }, []);
  // const rfidData =
  //   rfidType === 'all' ? ListData : rfidType === 'used' ? UnusedRfid : usedRfid;

  const confirmDelete = useCallback(async () => {
    if (!rfidToDelete) {
      return;
    }

    setAlertVisible(false);
    try {
      await store
        .dispatch(deleteRfidListAction({id: rfidToDelete, buCode, token}))
        .unwrap();
      showCustomToast('success', 'RFID deleted successfully!');
      await loadRfidList();
    } catch (error) {
      showCustomToast(
        'error',
        error || 'Something went wrong! Please try deleting again...',
      );
      // setErrorMessage(DError);
      // setErrorAlertVisible(true);
    }
  }, [rfidToDelete, buCode, token, loadRfidList]);

  const [modelShow, setModelShow] = useState<boolean>(false);

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
      ListData,
      Loader,
      loadRfidList,
      handleDelete,
      refreshing,
      buCode,
      alertVisible,
      setAlertVisible,
      confirmDelete,
      successAlertVisible,
      setSuccessAlertVisible,
      errorAlertVisible,
      setErrorAlertVisible,
      errorMessage,
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
    }),
    [
      ListData,
      Loader,
      loadRfidList,
      handleDelete,
      refreshing,
      buCode,
      alertVisible,
      confirmDelete,
      successAlertVisible,
      errorAlertVisible,
      errorMessage,
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
