import {useEffect, useState, useCallback, useMemo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Alert} from 'react-native';
import {
  getRfidListAction,
  deleteRfidListAction,
} from '../../reducer/RFIDList/RFIDListAction';
import {RootState} from '../../reducer/Store';

export const RfidListHook = () => {
  const dispatch = useDispatch();

  // Use useMemo to avoid recalculating the state selectors on every render
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

  // Load RFID list
  const loadRfidList = useCallback(async () => {
    setRefreshing(true);
    dispatch(getRfidListAction({baseUrl}));
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
    } else if (DError) {
      // console.log("DeleteError UseEffect...");
      Alert.alert('Error', DError, [{text: 'OK'}], {cancelable: false});
    }
  }, [LError, DError]);
  // console.log("LoaderRefresh UseEffect...")

  // Delete RFID item
  const handleDelete = useCallback(
    async (id: string) => {
      Alert.alert(
        'Delete RFID',
        'Are you sure you want to delete this RFID?',
        [
          {text: 'Cancel', style: 'cancel'},
          {
            text: 'OK',
            onPress: async () => {
              const resultAction = dispatch(
                deleteRfidListAction({id, buCode, token}),
              );
              if (deleteRfidListAction.fulfilled.match(resultAction)) {
                console.log('Delete Success :- ',deleteRfidListAction.fulfilled.match(resultAction));
                Alert.alert(
                  'Success',
                  'RFID deleted successfully!',
                  [{text: 'OK'}],
                  {cancelable: false},
                );
                await loadRfidList(); // Refresh list
              } else {
                // console.error(resultAction.error.message);
              }
            },
          },
        ],
        {cancelable: false},
      );
    },
    [buCode, token, dispatch, loadRfidList],
  );

  // Memoize output to avoid recalculations when nothing changes
  return useMemo(
    () => ({
      ListData,
      Loader,
      loadRfidList,
      handleDelete,
      refreshing,
      buCode,
    }),
    [ListData, Loader, loadRfidList, handleDelete, refreshing, buCode],
  );
};
