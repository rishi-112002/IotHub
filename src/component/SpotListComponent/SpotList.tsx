/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-shadow */
// src/components/SpotList.tsx
import React, {useCallback} from 'react';
import {StyleSheet, FlatList, Animated, ListRenderItem} from 'react-native';
import SpotItem from './SpotItem';
import {useSelector} from 'react-redux';
import {RootState} from '../../reducer/Store';
import {SafeAreaView} from 'react-native-safe-area-context';

interface SpotData {
  id: string;
  name: string;
  weight: number | null;
  weightStable?: boolean;
  weightError?: string;
  active: boolean;
  delayed: boolean;
  currentState: string | null;
}

interface SpotListComponentProps {
  spotData: SpotData[];
  refreshing: boolean;
  scrollY: Animated.Value;
  loadRfidList: () => void;
}

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const SpotList: React.FC<SpotListComponentProps> = ({
  spotData,
  loadRfidList,
  refreshing,
}) => {
  const baseUrl = useSelector((state: RootState) => state.authentication.baseUrl);

  const keyExtractor = useCallback((item: SpotData) => item.id, []);

  const renderSpot: ListRenderItem<SpotData> = useCallback(
    ({ item }) => <SpotItem item={item} baseUrl={baseUrl} />,
    [baseUrl]
  );

  return (
    <SafeAreaView style={styles.container}>
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
        getItemLayout={(data, index) => ({
          length: 90,
          offset: 90 * index,
          index,
        })}
        updateCellsBatchingPeriod={30} // Reduce lag in scrolling
        scrollEventThrottle={16} // For smoother scroll handling
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingBottom: 20,
  },
});

export default SpotList;