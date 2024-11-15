// EventLogList.tsx
import React, { useCallback, useState } from 'react';
import { View, FlatList, Text, StyleSheet, Animated } from 'react-native';
import EventLogItem from './EventLogITem';
import colors from '../../assets/color/colors';
import fontSizes from '../../assets/fonts/FontSize';
import { CardItemWith_Icon } from '../../reuseableComponent/card/CardItemWithIcon';

type EventLogItemType = {
  id: string;
  name: string;
  type: string;
  createdAt: string;
  details: any;

};

type EventLogsListProps = {
  data: EventLogItemType[];
  setModal: (value: boolean) => void;
  setRequestData: (request: any) => void;
  onScroll: any
};
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const EventLogsList: React.FC<EventLogsListProps> = ({
  data,
  setModal,
  setRequestData,
  onScroll,
}) => {
  const [selectedItemId, setSelectedItemId] = useState("");
  const renderEventLog = useCallback(
    ({ item }: { item: EventLogItemType }) => (
      <CardItemWith_Icon
        iconName='event-note'
        view={
          <EventLogItem
            item={item}
            isSelected={item.id === selectedItemId}
            onToggle={() => setSelectedItemId(item.id === selectedItemId ? "" : item.id)}
          />
        }
      />
    ),
    [selectedItemId]
  );

  const keyExtractor = useCallback((item: EventLogItemType) => item.id, []);

  return (
    <View style={styles.listContainer}>
      {data.length > 0 ? (
        <AnimatedFlatList
          data={data}
          renderItem={renderEventLog}
          keyExtractor={keyExtractor}
          onScroll={onScroll}
          removeClippedSubviews={true} // Helps with large lists
          initialNumToRender={40} // Initially render 10 items for performance
        // maxToRenderPerBatch={50} // Number of items rendered per batch
        // windowSize={150} // How many screens worth of content to render
        // getItemLayout={(_data, index) => ({
        //   length: 90,
        //   offset: 90 * index,
        //   index,
        // })}
        // updateCellsBatchingPeriod={30} // Reduce lag in scrolling
        // scrollEventThrottle={16} // For smoother scroll handling
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
  flatListContent: { paddingBottom: 10 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: fontSizes.subheading, color: 'gray' },
});

export default EventLogsList;
