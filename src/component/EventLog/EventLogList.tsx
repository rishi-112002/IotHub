// EventLogList.tsx
import React, {useCallback} from 'react';
import {View, FlatList, Text, StyleSheet, Animated} from 'react-native';
import EventLogItem from './EventLogITem';
import colors from '../../assets/color/colors';
import fontSizes from '../../assets/fonts/FontSize';

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
};
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const EventLogsList: React.FC<EventLogsListProps> = ({
  data,
  setModal,
  setRequestData,
}) => {
  const onInfoClick = useCallback(
    (details: any) => {
      setModal(true);
      setRequestData(details);
    },
    [setModal, setRequestData],
  );

  const renderEventLog = useCallback(
    ({item}: {item: EventLogItemType}) => (
      <EventLogItem item={item} onInfoClick={onInfoClick} />
    ),
    [onInfoClick],
  );
  const keyExtractor = useCallback((item: EventLogItemType) => item.id, []);

  return (
    <View style={styles.listContainer}>
      {data.length > 0 ? (
        <AnimatedFlatList
          data={data}
          renderItem={renderEventLog}
          keyExtractor={keyExtractor}
          removeClippedSubviews={true} // Helps with large lists
          initialNumToRender={100} // Initially render 10 items for performance
          maxToRenderPerBatch={100} // Number of items rendered per batch
          windowSize={150} // How many screens worth of content to render
          getItemLayout={(_data, index) => ({
            length: 90,
            offset: 90 * index,
            index,
          })}
          updateCellsBatchingPeriod={30} // Reduce lag in scrolling
          scrollEventThrottle={16} // For smoother scroll handling
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
    backgroundColor: colors.backgroundColor,
  },
  flatListContent: {paddingBottom: 10},
  emptyContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  emptyText: {fontSize: fontSizes.subheading, color: 'gray'},
});

export default EventLogsList;
