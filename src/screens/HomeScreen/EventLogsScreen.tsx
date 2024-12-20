/* eslint-disable react-native/no-inline-styles */
import {View} from 'react-native';
import useEventLogs from '../../CustomHooks/EventLog/EventLogHook';
import EventLogsList from '../../component/EventLog/EventLogList';
import React from 'react';
import {useNetwork} from '../../contextApi/NetworkContex';
import {NoInternetScreen} from '../../reuseableComponent/defaultScreen/NoInternetScreen';
import {STYLES} from '../ScreensStyles';
function EventLogsScreen() {
  const {eventLogs, setModalVisible, setRequestData} = useEventLogs();
  const {isConnected} = useNetwork();

  return (
    <>
      {isConnected ? (
        <View style={STYLES.EventLog_Screen_View}>
          <EventLogsList
            data={eventLogs}
            setModal={setModalVisible}
            setRequestData={setRequestData}
            onScroll={undefined}
            scrollEnabled={true}
          />
        </View>
      ) : (
        <NoInternetScreen />
      )}
    </>
  );
}

export default EventLogsScreen;
