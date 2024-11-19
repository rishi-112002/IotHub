import { useLayoutEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import useEventLogs from '../../CustomHooks/EventLog/EventLogHook';
import EventLogsList from '../../component/EventLog/EventLogList';
import fontSizes from '../../assets/fonts/FontSize';
import colors from '../../assets/color/colors';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducer/Store';

interface EventLogsScreenParams {
  spotName: string;
  data: any
}

function EventLogsScreen() {
  const route =
    useRoute<RouteProp<{ params: EventLogsScreenParams }, 'params'>>();
  const { spotName, data } = route.params;
  const baseUrls = useSelector((state: RootState) => state.authentication.baseUrl);

  const navigation = useNavigation();
  const { loader, eventLogs } = useEventLogs(baseUrls, "PlantEntry");
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

  return (
    <View style={{ flex: 1 , paddingBottom:60 }}>

        <EventLogsList
          data={eventLogs}
          setModal={setModalVisible}
          setRequestData={setRequestData}
          onScroll={undefined} />
    </View>
  );
}

export default EventLogsScreen;
