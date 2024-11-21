// src/hooks/useEventLogs.ts
import { useEffect, useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { GetSpotEventLogs } from '../../reducer/eventLogs/EventLogsAction';
import { RootState, store } from '../../reducer/Store';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { Text } from 'react-native';
import colors from '../../assets/color/colors';
import fontSizes from '../../assets/fonts/FontSize';
interface EventLogsScreenParams {
  spotName: string;
  data: any
}
const useEventLogs = () => {
  const baseUrl = useSelector((state: RootState) => state.authentication.baseUrl);
  const route =
    useRoute<RouteProp<{ params: EventLogsScreenParams }, 'params'>>();
  const { spotName } = route.params;
  const loader = useSelector((state: RootState) => state.eventLogs.loader);
  const eventLogs = useSelector(
    (state: RootState) => state.eventLogs.eventLogs,
  );

  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [requestData, setRequestData] = useState({});

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text style={{ color: colors.darkblack, fontSize: fontSizes.heading }}>
          {spotName}
        </Text>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    store.dispatch(GetSpotEventLogs({ baseUrl, spotName }));
  }, [baseUrl, spotName]);

  return { loader, eventLogs ,setModalVisible,setRequestData};
};

export default useEventLogs;
