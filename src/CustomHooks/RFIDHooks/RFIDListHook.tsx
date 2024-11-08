/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState, useCallback, useMemo} from 'react';
import {useSelector} from 'react-redux';
import {
  getRfidListAction,
  deleteRfidListAction,
} from '../../reducer/RFIDList/RFIDListAction';
import {RootState, store} from '../../reducer/Store';
import showCustomToast from '../../reuseableComponent/modal/CustomToast';
import CustomAlert from '../../reuseableComponent/PopUp/CustomPopUp';
import React from 'react';

export const RfidListHook = () => {
  // const dispatch = useDispatch();
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

  const [refreshing, setRefreshing] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [rfidToDelete, setRfidToDelete] = useState<string | null>(null);
  const [successAlertVisible, setSuccessAlertVisible] = useState(false);
  const [errorAlertVisible, setErrorAlertVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
    console.log('first');
  }, [baseUrl, loadRfidList]);

  // useEffect(() => {
  //   // Display error if any
  //   if (LError || DError) {
  //     setErrorMessage(LError || DError);
  //     setErrorAlertVisible(true);
  //   }
  //   console.log('Second');
  // }, [LError, DError]);

  const handleDelete = useCallback((id: string) => {
    // console.log('RFID handle Delete :- ',id);
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

  const confirmDelete = useCallback(async () => {
    if (!rfidToDelete) {
      return;
    }

    setAlertVisible(false);
    try {
      await store.dispatch(
        deleteRfidListAction({id: rfidToDelete, buCode, token})
      ).unwrap();
        showCustomToast('success', 'RFID deleted successfully!');
        await loadRfidList(); // Refresh the list after successful deletion

      // if (deleteRfidListAction.fulfilled.match(resultAction)) {
      //   // setSuccessAlertVisible(true); // Show success alert
      // } else {
      //   // Handle potential error from deletion action
      //   // setErrorMessage(DError);
      //   // setErrorAlertVisible(true);
      //   // console.log("COnfirm Delete :- ",DError);
      // }
    } catch (error) {
      showCustomToast('error', error || 'Something went wrong! Please try deleting again...');
      // console.log('Deletion error:', error);
      // setErrorMessage(DError);
      // setErrorAlertVisible(true);
    }
  }, [rfidToDelete, buCode, token, loadRfidList]);

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
    ],
  );
};
