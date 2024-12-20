/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useState } from 'react';
import {
  View,
  Animated,
  FlatList,
  Dimensions,
  ActivityIndicator,
  Text,
} from 'react-native';
import RFIDItemComponent from './RFIDItemComponent';
import SequentialBouncingLoader from '../../reuseableComponent/loader/BallBouncingLoader';
import colors from '../../assets/color/colors';
import { Strings } from '../../assets/constants/Lable';
import { ComponentStyles } from '../../styles/ComponentStyles';
import { ContainerStyles } from '../../styles/ContainerStyles';
import { TextStyles } from '../../styles/TextStyles';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
export const getResponsiveWidth = (percentage: number) =>
  (SCREEN_WIDTH * percentage) / 100;
export const getResponsiveHeight = (percentage: number) =>
  (SCREEN_HEIGHT * percentage) / 100;

interface RfidListComponentProps {
  ListData: any[];
  loader: boolean;
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
  onViewableItemsChanged,
  viewabilityConfig,
}) => {
  const [isLoadingMore, setIsLoadingMore] = useState(true);
  const { textStyles } = TextStyles();
  const { styles } = ComponentStyles();
  const { containerStyles } = ContainerStyles()
  // Load more data as the user scrolls
  const loadMoreData = useCallback(() => {
    if (ListData?.length > 0) {
      const totalItems = ListData.length;
      const isAllDataFetched = ListData.length === totalItems;
      if (isAllDataFetched) {
        setIsLoadingMore(false);
      }
    }
  }, [ListData]);

  const renderItem = useCallback(
    ({ item }: any) => (
      <RFIDItemComponent handleDelete={handleDelete} reader={item} />
    ),
    [handleDelete],
  );

  const keyExtractor = useCallback((item: { id: string }) => item.id, []);


  return (
    <View style={containerStyles.mainContainer}>
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
          windowSize={getResponsiveHeight(121)}
          maxToRenderPerBatch={50}
          initialNumToRender={10}
          updateCellsBatchingPeriod={50}
          scrollEventThrottle={16}
          onEndReached={loadMoreData}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          ListFooterComponent={
            isLoadingMore === true ? (
              <View style={styles.footer}>
                <ActivityIndicator
                  size="small"
                  color={colors.AppPrimaryColor}
                />
                <Text style={textStyles.footerText}>{Strings.LOADING}...</Text>
              </View>
            ) : null
          }
        />
      )}
    </View>
  );
};


export default React.memo(RfidListComponent);
