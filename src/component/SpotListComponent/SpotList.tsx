import React, { useCallback } from 'react';
import { StyleSheet, FlatList, Animated, ListRenderItem, View } from 'react-native';
import SpotItem from './SpotItem';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducer/Store';
import CardItemWith_Icon from '../../reuseableComponent/card/CardItemWithIcon';

interface SpotData {
  id: string;
  name: string;
  weight: number | null;
  weightStable?: boolean;
  weightError?: string;
  active: boolean;
  delayed: boolean;
  currentState: string | null;
  expiryDate: any
}

interface SpotListComponentProps {
  spotData: SpotData[];
  refreshing: boolean;
  loadRfidList: () => void;
  onScroll: any,
  contentContainerStyle: any
}

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const SpotList: React.FC<SpotListComponentProps> = ({
  spotData,
  loadRfidList,
  refreshing,
  onScroll,
  contentContainerStyle,
}) => {
  const baseUrl = useSelector((state: RootState) => state.authentication.baseUrl);

  const keyExtractor = useCallback((item: any) => item.id, []);

  const renderSpot: ListRenderItem<any> = useCallback(
    ({ item }) => {
      return (
        <CardItemWith_Icon
          iconName={item.active ? 'location-on' : 'location-off'}
          view={<SpotItem item={item} baseUrl={baseUrl} />}
        />
      );
    },
    [baseUrl]
  );

  return (

    <FlatList
      style={{ flex: 1 }}
      data={spotData}
      renderItem={renderSpot}
      keyExtractor={keyExtractor}
      onRefresh={loadRfidList}
      refreshing={refreshing}
      removeClippedSubviews={true} // Helps with large lists
      initialNumToRender={10} // Initially render 10 items for performance
      maxToRenderPerBatch={15} // Number of items rendered per batch
      windowSize={25} // How many screens worth of content to render
      getItemLayout={(_data, index) => ({
        length: 90,
        offset: 90 * index,
        index,
      })}
      updateCellsBatchingPeriod={10} // Reduce lag in scrolling
      scrollEventThrottle={10}
      onScroll={onScroll}
      contentContainerStyle={contentContainerStyle}
    />
  );
};

export default SpotList;
