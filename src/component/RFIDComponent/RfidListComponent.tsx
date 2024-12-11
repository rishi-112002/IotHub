/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useState} from 'react';
import {
  View,
  Animated,
  FlatList,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Text,
} from 'react-native';
import RFIDItemComponent from './RFIDItemComponent';
import SequentialBouncingLoader from '../../reuseableComponent/loader/BallBouncingLoader';
import colors from '../../assets/color/colors';
import fontSizes from '../../assets/fonts/FontSize';
import { Strings } from '../../assets/constants/Lable';
const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
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
    ({item}: any) => (
      <RFIDItemComponent handleDelete={handleDelete} reader={item} />
    ),
    [handleDelete],
  );

  const keyExtractor = useCallback((item: {id: string}) => item.id, []);


  return (
    <View style={styles.container}>
      {Loader ? (
        <SequentialBouncingLoader />
      ) : (
        <AnimatedFlatList
          data={ListData}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          contentContainerStyle={{padding: buttonVisible ? 8 : 5}}
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
                <Text style={styles.footerText}>{Strings.LOADING}...</Text>
              </View>
            ) : null
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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

export default React.memo(RfidListComponent);
