import {useEffect, useCallback, useState, useMemo} from 'react';
import {useSelector} from 'react-redux';
import {RootState, store} from '../../reducer/Store';
import {
  DeleteGenericSpot,
  GenericSpotsData,
} from '../../reducer/genericSpot/uploadGenericDataAction';
import CustomToast from '../../reuseableComponent/modal/CustomToast';

const GenericScreenHooks = () => {
  const baseUrls = useSelector(
    (state: RootState) => state.authentication.baseUrl,
  );
  const buCode = useSelector((state: RootState) => state.authentication.buCode);
  const token = useSelector((state: RootState) => state.authentication.token);
  const GenericSpots = useSelector(
    (state: RootState) => state.uploadGeneric.GenericSpots,
  );
  const Loader = useSelector((state: RootState) => state.uploadGeneric.loader);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  return useMemo(
    () => ({
      GenericSpots,
      Loader,
      handleDelete,
      confirmDelete,
      isVisible,
      setIsVisible,
      getGenericData,
    }),
    [
      GenericSpots,
      Loader,
      handleDelete,
      confirmDelete,
      isVisible,
      setIsVisible,
      getGenericData,
    ],
  );
};

export default GenericScreenHooks;
