/* eslint-disable react-native/no-inline-styles */
import React, { useCallback } from 'react';
import { View, Animated, FlatList, StyleSheet, Dimensions } from 'react-native';
import RFIDItemComponent from './RFIDItemComponent';
import SequentialBouncingLoader from '../../reuseableComponent/loader/BallBouncingLoader';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
export const getResponsiveWidth = (percentage: number) =>
  (SCREEN_WIDTH * percentage) / 100;
export const getResponsiveHeight = (percentage: number) =>
  (SCREEN_HEIGHT * percentage) / 100;

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
  const renderItem = useCallback(
    ({ item }: any) => (
      <RFIDItemComponent handleDelete={handleDelete} reader={item} />
    ),
    [handleDelete],
  );

  const keyExtractor = useCallback((item: { id: string }) => item.id, []);


  return (
    <View style={styles.container}>
      {Loader ? (
        <SequentialBouncingLoader />
      ) : (
        <AnimatedFlatList
          data={ListData}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          contentContainerStyle={{ padding: buttonVisible ? 8 : 5 }}
          onScroll={handleScroll}
          onRefresh={loadRfidList}
          refreshing={refreshing}
          removeClippedSubviews={true}
          windowSize={getResponsiveHeight(100)}
          // initialNumToRender={100}
          // maxToRenderPerBatch={100}
          // getItemLayout={(data, index) => ({
          //   length: 100,
          //   offset: 100 * index,
          //   index,
          // })}
          updateCellsBatchingPeriod={30}
          scrollEventThrottle={16}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default React.memo(RfidListComponent);
