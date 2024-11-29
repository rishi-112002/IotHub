/* eslint-disable react-native/no-inline-styles */
import React, { useCallback } from 'react';
import { StyleSheet, FlatList, Animated, ListRenderItem, View, Dimensions } from 'react-native';
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
          key={item.id}
        />
      );
    },
    [baseUrl]
  );

  return (

    <AnimatedFlatList
      style={{ flex: 1, paddingHorizontal: 15 }}
      data={spotData}
      renderItem={renderSpot}
      keyExtractor={keyExtractor}
      onRefresh={loadRfidList}
      refreshing={refreshing}
      onScroll={onScroll}
      contentContainerStyle={contentContainerStyle}
    />
  );
};

export default SpotList;
