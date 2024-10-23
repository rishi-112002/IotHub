// src/hooks/useEventLogs.ts
import {useEffect} from 'react';
import { useSelector} from 'react-redux';
import {GetSpotEventLogs} from '../../reducer/eventLogs/EventLogsAction';
import {RootState, store} from '../../reducer/Store';

const useEventLogs = (baseUrl: string, spotName: string) => {
  const loader = useSelector((state: RootState) => state.eventLogs.loader);
  const eventLogs = useSelector(
    (state: RootState) => state.eventLogs.eventLogs,
  );

  useEffect(() => {
    store.dispatch(GetSpotEventLogs({baseUrl, spotName}));
  }, [baseUrl, spotName]);

  return {loader, eventLogs};
};

export default useEventLogs;
