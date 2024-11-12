import {useLayoutEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import useEventLogs from '../../CustomHooks/EventLog/EventLogHook';
import EventLogsList from '../../component/EventLog/EventLogList';
import SequentialBouncingLoader from '../../reuseableComponent/loader/BallBouncingLoader';
import EventlogsModals from '../../reuseableComponent/modal/EventLogsModal';
import fontSizes from '../../assets/fonts/FontSize';
import colors from '../../assets/color/colors';
import React from 'react';

interface EventLogsScreenParams {
  baseUrls: string;
  spotName: string;
}

function EventLogsScreen() {
  const route =
    useRoute<RouteProp<{params: EventLogsScreenParams}, 'params'>>();
  const {baseUrls, spotName} = route.params;
  const navigation = useNavigation();
  const {loader, eventLogs} = useEventLogs(baseUrls, spotName);
  const [modalVisible, setModalVisible] = useState(false);
  const [requestData, setRequestData] = useState({});

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text style={{color: colors.darkblack, fontSize: fontSizes.heading}}>
          {spotName}
        </Text>
      ),
    });
  }, [navigation, spotName]);

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        {loader ? (
          <SequentialBouncingLoader />
        ) : (
          <EventLogsList
            data={eventLogs}
            setModal={setModalVisible}
            setRequestData={setRequestData}
          />
        )}
        {modalVisible && (
          <EventlogsModals
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            request={requestData}
          />
        )}
      </View>
    </View>
  );
}

export default EventLogsScreen;
