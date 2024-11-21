import React, { useCallback } from 'react';
import { StyleSheet, FlatList, Animated, ListRenderItem, View } from 'react-native';
import SpotItem from './SpotItem';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducer/Store';
import { CardItemWith_Icon } from '../../reuseableComponent/card/CardItemWithIcon';

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

  const keyExtractor = useCallback((item: SpotData) => item.id, []);

  const renderSpot: ListRenderItem<SpotData> = useCallback(
    ({ item }) => <CardItemWith_Icon
      iconName={item.active ? 'location-on' : "location-off"}
      view={<SpotItem item={item} baseUrl={baseUrl} />} />,
    [baseUrl]
  );

  return (
    <View>
      <AnimatedFlatList
        data={spotData}
        renderItem={renderSpot}
        keyExtractor={keyExtractor}
        onRefresh={loadRfidList}
        refreshing={refreshing}
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
        scrollEventThrottle={20}
        onScroll={onScroll}
        contentContainerStyle={contentContainerStyle}
      />
    </View>
  );
};

export default SpotList;
