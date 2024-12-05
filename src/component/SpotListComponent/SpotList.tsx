/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback, useEffect} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import SpotItem from './SpotItem';
import CardItemWith_Icon from '../../reuseableComponent/card/CardItemWithIcon';
import colors from '../../assets/color/colors';
import fontSizes from '../../assets/fonts/FontSize';
import {getResponsiveHeight} from '../RFIDComponent/RfidListComponent';

interface SpotData {
  id: string;
  name: string;
  weight: number | null;
  weightStable?: boolean;
  weightError?: string;
  active: boolean;
  delayed: boolean;
  currentState: string | null;
  expiryDate: any;
}

interface SpotListComponentProps {
  spotData: SpotData[];
  refreshing: boolean;
  loadRfidList: () => void;
  handleScroll: () => void;
  contentContainerStyle: any;
}

const SpotList: React.FC<SpotListComponentProps> = ({
  spotData,
  refreshing,
  loadRfidList,
  handleScroll,
  contentContainerStyle,
}) => {
  const [visibleData, setVisibleData] = useState<SpotData[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const itemsPerPage = 30;

  useEffect(() => {
    if (spotData?.length) {
      setVisibleData(spotData.slice(0, itemsPerPage));
    }
  }, [spotData]);

  // Load more data as the user scrolls
  const loadMoreData = useCallback(() => {
    if (visibleData.length < spotData.length && !isLoadingMore) {
      setIsLoadingMore(true);
      setTimeout(() => {
        setVisibleData(prev => spotData.slice(0, prev.length + itemsPerPage));
        setIsLoadingMore(false);
      }, 800); // Simulate network delay
    }
  }, [spotData, visibleData, isLoadingMore]);

  // Render each item
  const renderSpot: React.FC<{item: SpotData}> = useCallback(
    ({item}) => (
      <CardItemWith_Icon
        iconName={item.active ? 'location-on' : 'location-off'}
        view={<SpotItem item={item} baseUrl={null} />}
        key={item?.name}
      />
    ),
    [],
  );
  // const keyExterator = useCallback(, []);

  return (
    <View>
      <FlatList
        data={visibleData}
        renderItem={renderSpot}
        keyExtractor={(item: SpotData) => String(item.id)}
        onRefresh={loadRfidList}
        refreshing={refreshing}
        // onScroll={handleScroll}
        contentContainerStyle={contentContainerStyle}
        removeClippedSubviews={true}
        windowSize={getResponsiveHeight(121)}
        maxToRenderPerBatch={50}
        initialNumToRender={10}
        updateCellsBatchingPeriod={50}
        scrollEventThrottle={16}
        onEndReached={loadMoreData}
        onEndReachedThreshold={5}
        ListFooterComponent={
          isLoadingMore ? (
            <View style={styles.footer}>
              <ActivityIndicator size="small" color={colors.AppPrimaryColor} />
              <Text style={styles.footerText}>Loading...</Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
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

export default SpotList;
