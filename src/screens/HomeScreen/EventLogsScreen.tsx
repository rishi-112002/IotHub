/* eslint-disable react-native/no-inline-styles */
import {Text, View} from 'react-native';
import useEventLogs from '../../CustomHooks/EventLog/EventLogHook';
import EventLogsList from '../../component/EventLog/EventLogList';
import React from 'react';
import {useNetwork} from '../../contextApi/NetworkContex';
function EventLogsScreen() {
  const {eventLogs, setModalVisible, setRequestData} = useEventLogs();
  const {isConnected} = useNetwork();

  return (
    <>
      {isConnected ? (
        <View style={{flex: 1, paddingBottom: 60}}>
          <EventLogsList
            data={eventLogs}
            setModal={setModalVisible}
            setRequestData={setRequestData}
            onScroll={undefined}
             scrollEnabled={true}          />
        </View>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignSelf: 'center'}}>
          <Text>No Internet Connection</Text>
        </View>
      )}
    </>
  );
}

export default EventLogsScreen;
