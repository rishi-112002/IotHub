import { View } from 'react-native';
import useEventLogs from '../../CustomHooks/EventLog/EventLogHook';
import EventLogsList from '../../component/EventLog/EventLogList';
import React from 'react';
function EventLogsScreen() {
  const { eventLogs ,setModalVisible,setRequestData} = useEventLogs();
  return (
    <View style={{ flex: 1, paddingBottom: 60 }}>
      <EventLogsList
        data={eventLogs}
        setModal={setModalVisible}
        setRequestData={setRequestData}
        onScroll={undefined} />
    </View>
  );
}

export default EventLogsScreen;
