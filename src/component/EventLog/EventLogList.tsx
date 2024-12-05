// EventLogList.tsx
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Animated,
  ActivityIndicator,
} from 'react-native';
import EventLogItem from './EventLogITem';
import colors from '../../assets/color/colors';
import fontSizes from '../../assets/fonts/FontSize';
import CardItemWith_Icon from '../../reuseableComponent/card/CardItemWithIcon';
import {getResponsiveHeight} from '../RFIDComponent/RfidListComponent';
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
  onScroll: any;
  scrollEnabled: boolean;
};
const EventLogsList: React.FC<EventLogsListProps> = ({
  data,
  setModal,
  setRequestData,
  onScroll,
  scrollEnabled,
}) => {
  const [selectedItemId, setSelectedItemId] = useState('');
  const [isLoadingMore, setIsLoadingMore] = useState(true);

  // Load more data as the user scrolls
  const loadMoreData = useCallback(() => {
    if (data?.length > 0) {
      const totalItems = data.length;
      const isAllDataFetched = data.length === totalItems;
      if (isAllDataFetched) {
        console.log('All data has been fetched');
        setIsLoadingMore(false);
      }
    }
  }, [data]);

  const onToggle = useCallback((id: string) => {
    setSelectedItemId(prevId => (prevId === id ? '' : id));
  }, []);
  const renderEventLog = useCallback(
    ({item}: any) => (
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
    [onToggle, selectedItemId],
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
          windowSize={getResponsiveHeight(121)}
          maxToRenderPerBatch={50}
          initialNumToRender={10}
          updateCellsBatchingPeriod={50}
          scrollEventThrottle={16}
          onEndReached={loadMoreData}
          ListFooterComponent={
            isLoadingMore === true ? (
              <View style={styles.footer}>
                <ActivityIndicator
                  size="small"
                  color={colors.AppPrimaryColor}
                />
                <Text style={styles.footerText}>Loading...</Text>
              </View>
            ) : null
          }
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
    backgroundColor: colors.white,
  },
  flatListContent: {flexGrow: 1},
  emptyContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  emptyText: {fontSize: fontSizes.subheading, color: 'gray'},
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  footerText: {
    marginLeft: 10,
    fontSize: fontSizes.text,
    color: colors.gray,
  },
});

export default EventLogsList;
