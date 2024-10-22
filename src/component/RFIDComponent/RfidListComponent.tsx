/* eslint-disable react-native/no-inline-styles */
/* RfidListComponent.tsx */
import React, { useCallback } from 'react';
import { View, Animated, FlatList } from 'react-native';
import RFIDItemComponent from './RFIDItemComponent';
import SequentialBouncingLoader from '../../reuseableComponent/loader/BallBouncingLoader';

interface RfidListComponentProps {
  ListData: any[];
  Loader: boolean;
  scrollY: Animated.Value;
  handleDelete: (id: string) => void;
  loadRfidList: () => void;
  refreshing: boolean;
  buttonVisible: boolean;
  handleScroll: (event: any) => void;
}

// Wrap FlatList in Animated.createAnimatedComponent
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const RfidListComponent: React.FC<RfidListComponentProps> = ({
  ListData,
  Loader,
  handleDelete,
  loadRfidList,
  refreshing,
  buttonVisible,
  handleScroll,
}) => {
  // Memoized renderSpot for better performance
  const renderSpot = useCallback(
    ({ item }) => <RFIDItemComponent handleDelete={handleDelete} item={item} />,
    [handleDelete]
  );

  // Optimized keyExtractor
  const keyExtractor = useCallback((item: { id: string }) => item.id, []);

  return (
    <View style={{ flex: 1 }}>
      {Loader ? (
        <SequentialBouncingLoader />
      ) : (
        <AnimatedFlatList
          data={ListData}
          keyExtractor={keyExtractor}
          renderItem={renderSpot}
          contentContainerStyle={{ padding: buttonVisible ? 8 : 5 }}
          onScroll={handleScroll}
          onRefresh={loadRfidList}
          refreshing={refreshing}
          removeClippedSubviews={true} // Depending on list size, experiment with true/false
          initialNumToRender={20} // Increase the number of items initially rendered
          maxToRenderPerBatch={10} // Number of items rendered per batch
          windowSize={15} // Increase window size to keep more items in memory
          getItemLayout={(data, index) => ({
            length: 90,
            offset: 90 * index,
            index,
          })}
          updateCellsBatchingPeriod={30} // Reduce lag in scrolling
          scrollEventThrottle={16} // For smoother scroll handling
        />
      )}
    </View>
  );
};

export default React.memo(RfidListComponent);
