// EventLogList.tsx
import React, { useCallback, useState } from 'react';
import { View, FlatList, Text, StyleSheet, Animated } from 'react-native';
import EventLogItem from './EventLogITem';
import colors from '../../assets/color/colors';
import fontSizes from '../../assets/fonts/FontSize';
import CardItemWith_Icon from '../../reuseableComponent/card/CardItemWithIcon';
// import { CardItemWith_Icon } from '../../reuseableComponent/card/CardItemWithIcon';

type EventLogItemType = {
  id: string;
  name: string;
  type: string;
  createdAt: string;
  details: any;

};
const ITEM_HEIGHT = 90;
type EventLogsListProps = {
  data: EventLogItemType[];
  setModal: (value: boolean) => void;
  setRequestData: (request: any) => void;
  onScroll: any,
  scrollEnabled: boolean
};
const EventLogsList: React.FC<EventLogsListProps> = ({
  data,
  setModal,
  setRequestData,
  onScroll,
  scrollEnabled
}) => {
  const [selectedItemId, setSelectedItemId] = useState("");
  const onToggle = useCallback((id: string) => {
    setSelectedItemId((prevId) => (prevId === id ? "" : id));
  }, []);
  const renderEventLog = useCallback(
    ({ item }: any) => (
      <CardItemWith_Icon
        iconName="event-note"
        view={
          <EventLogItem
            item={item}
            isSelected={item.id === selectedItemId}
            onToggle={() => onToggle(item.id)}
          />
        }
        key={item.id}
      />
    ),
    [selectedItemId]
  );


  const keyExtractor = useCallback((item: any) => item.id, []);
  return (
    <View style={styles.listContainer}>
      {data.length > 0 ? (
        <Animated.FlatList
          data={data}
          removeClippedSubviews={true}
          renderItem={renderEventLog}
          keyExtractor={keyExtractor}
          onScroll={onScroll}
          scrollEnabled={scrollEnabled}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No Event Logs</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.white
  },
  flatListContent: { flexGrow: 1 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: fontSizes.subheading, color: 'gray' },
});

export default EventLogsList;
