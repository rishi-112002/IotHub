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
  onScroll: any
};
const EventLogsList: React.FC<EventLogsListProps> = ({
  data,
  setModal,
  setRequestData,
  onScroll,
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
      />
    ),
    [selectedItemId]
  );


  const keyExtractor = useCallback((item: any) => item.id, []);
  return (
    <View style={styles.listContainer}>
      {data.length > 0 ? (
        <FlatList
          data={data}
          removeClippedSubviews={true}
          renderItem={renderEventLog}
          keyExtractor={keyExtractor}
          onScroll={onScroll}
          initialNumToRender={10} // Initially render 10 items for performance
          maxToRenderPerBatch={15} // Number of items rendered per batch
          windowSize={25} // How many screens worth of content to render
          updateCellsBatchingPeriod={10} // Reduce lag in scrolling
          scrollEventThrottle={10}
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
