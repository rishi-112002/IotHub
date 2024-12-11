/* eslint-disable react-native/no-inline-styles */
import { View } from 'react-native';
import useEventLogs from '../../CustomHooks/EventLog/EventLogHook';
import EventLogsList from '../../component/EventLog/EventLogList';
import React from 'react';
import { useNetwork } from '../../contextApi/NetworkContex';
import { NoInternetScreen } from '../../reuseableComponent/defaultScreen/NoInternetScreen';
function EventLogsScreen() {
  const { eventLogs, setModalVisible, setRequestData } = useEventLogs();
  const { isConnected } = useNetwork();

  return (
    <>
      {isConnected ? (
        <View style={{ flex: 1, paddingBottom: 60 }}>
          <EventLogsList
            data={eventLogs}
            setModal={setModalVisible}
            setRequestData={setRequestData}
            onScroll={undefined}
            scrollEnabled={true} />
        </View>
      ) : (
        <NoInternetScreen />
      )}
    </>
  );
}

export default EventLogsScreen;
