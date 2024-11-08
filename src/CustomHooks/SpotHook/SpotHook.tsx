import {useEffect, useState, useCallback, useMemo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Alert} from 'react-native';
import {RootState, store} from '../../reducer/Store';
import {GetSpotData} from '../../reducer/spotData/spotDataAction';

export const SpotListHook = () => {
  const dispatch = useDispatch();

  const baseUrl = useSelector(
    (state: RootState) => state.authentication.baseUrl,
  );
  const Loader = useSelector((state: RootState) => state.spotData.loader);
  const LError = useSelector((state: RootState) => state.spotData.error);
  const spotListData = useSelector((state: RootState) => state.spotData.spotData);
  const buCode = useSelector((State: RootState) => State.authentication.buCode);

  const [refreshing, setRefreshing] = useState(false);

  // Load RFID list
  const loadRfidList = useCallback(async () => {
    setRefreshing(true);
    store.dispatch(GetSpotData({baseUrl: baseUrl}));
    setRefreshing(false);
  }, [baseUrl, dispatch]);

  useEffect(() => {
    loadRfidList();
    // console.log("LoaderRefresh UseEffect...");
  }, [baseUrl, loadRfidList]);

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
  return useMemo(
    () => ({
      spotListData,
      Loader,
      loadRfidList,
      //   handleDelete,
      refreshing,
      buCode,
    }),
    [spotListData, Loader, loadRfidList, refreshing, buCode],
  );
};
