/* eslint-disable react/jsx-no-duplicate-props */
import React, { useCallback, useState } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
} from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AppNavigationParams } from '../../navigation/NavigationStackList';
import SpotDataByTypeSubComponent from './SpotDataByTypeSubComponent';
import CardItemWith_Icon from '../../reuseableComponent/card/CardItemWithIcon';
import { getResponsiveHeight } from '../RFIDComponent/RfidListComponent';
import colors from '../../assets/color/colors';
import { IconName, Strings } from '../../assets/constants/Lable';
import { ComponentStyles } from '../../styles/ComponentStyles';
import { ContainerStyles } from '../../styles/ContainerStyles';
import { TextStyles } from '../../styles/TextStyles';
const Item_Height = 90;
function SpotsDataByTypeComponent(props: {
  data: any;
  type: string;
  handleScroll: any;
  handleDelete: any;
}) {
  const navigation = useNavigation<NavigationProp<AppNavigationParams>>();
  const { data, handleScroll, handleDelete, type } = props;
  const navigate = (id: any) => {
    if (type === Strings.GENERIC_SPOT) {
      navigation.navigate('GenericSpotAddScreen', { id: id });
    } else {
      navigation.navigate('WeighbridgesAddScreen', { id: id });
    }
  };
  const [isLoadingMore, setIsLoadingMore] = useState(true);

  // Load more data as the user scrolls
  const loadMoreData = useCallback(() => {
    if (data?.length > 0) {
      const totalItems = data.length;
      const isAllDataFetched = data.length === totalItems;
      if (isAllDataFetched) {
        setIsLoadingMore(false);
      }
    }
  }, [data]);
  const renderSpot = useCallback(
    ({ item }: { item: any }) => (
      <CardItemWith_Icon
        iconName={item.active ? IconName.LOCATION_ON : IconName.LOCATION_OFF}
        view={
          <SpotDataByTypeSubComponent
            handleDelete={handleDelete}
            item={item}
            navigate={navigate}
            navigation={navigation}
            height={Item_Height}
          />
        }
      />
    ),
    [handleScroll, handleDelete, type],
  );
     const { styles } = ComponentStyles();
        const { textStyles } = TextStyles();
        const { containerStyles } = ContainerStyles()

  return (
    <View style={containerStyles.listContainer}>
      <FlatList
        data={data}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={renderSpot}
        contentContainerStyle={styles.flatListContent}
        onScroll={handleScroll}
        maxToRenderPerBatch={50}
        initialNumToRender={10}
        windowSize={getResponsiveHeight(121)}
        updateCellsBatchingPeriod={50}
        scrollEventThrottle={16}
        onEndReached={loadMoreData}
        ListFooterComponent={
          isLoadingMore === true ? (
            <View style={styles.footer}>
              <ActivityIndicator size="small" color={colors.AppPrimaryColor} />
              <Text style={textStyles.footerText}>{Strings.LOADING}...</Text>
            </View>
          ) : null
        }
      />
    </View>
  );
}


export default SpotsDataByTypeComponent;
