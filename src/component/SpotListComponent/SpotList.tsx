/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useCallback, useEffect } from 'react';
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
import { getResponsiveHeight } from '../RFIDComponent/RfidListComponent';
import { IconName, Strings } from '../../assets/constants/Lable';

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
  const [isLoadingMore, setIsLoadingMore] = useState(true);
  const loadMoreData = useCallback(() => {
    if (spotData?.length > 0) {
      const totalItems = spotData.length;
      const isAllDataFetched = spotData.length === totalItems;
      if (isAllDataFetched) {
        setIsLoadingMore(false);
      }
    }
  }, [spotData]);

  // Render each item
  const renderSpot: React.FC<{ item: SpotData }> = useCallback(
    ({ item }) => (
      <CardItemWith_Icon
        iconName={item.active ? IconName.LOCATION_ON : IconName.LOCATION_OFF}
        view={<SpotItem item={item} baseUrl={null} />}
        key={item?.name}
      />
    ),
    [],
  );
  return (
    <View>
      <FlatList
        data={spotData}
        renderItem={renderSpot}
        keyExtractor={(item: SpotData) => String(item.id)}
        onRefresh={loadRfidList}
        refreshing={refreshing}
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
              <Text style={styles.footerText}>{Strings.LOADING}...</Text>
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
