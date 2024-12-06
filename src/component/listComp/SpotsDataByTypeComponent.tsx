/* eslint-disable react/jsx-no-duplicate-props */
import React, {useCallback, useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppNavigationParams} from '../../navigation/NavigationStackList';
import SpotDataByTypeSubComponent from './SpotDataByTypeSubComponent';
import CardItemWith_Icon from '../../reuseableComponent/card/CardItemWithIcon';
import {getResponsiveHeight} from '../RFIDComponent/RfidListComponent';
import colors from '../../assets/color/colors';
import fontSizes from '../../assets/fonts/FontSize';
const Item_Height = 90;
function SpotsDataByTypeComponent(props: {
  data: any;
  type: string;
  handleScroll: any;
  handleDelete: any;
}) {
  const navigation = useNavigation<NavigationProp<AppNavigationParams>>();
  const {data, handleScroll, handleDelete, type} = props;
  const navigate = (id: any) => {
    if (type === 'GENERIC_SPOT') {
      navigation.navigate('GenericSpotAddScreen', {id: id});
    } else {
      navigation.navigate('WeighbridgesAddScreen', {id: id});
    }
  };
  const [isLoadingMore, setIsLoadingMore] = useState(true);

  // Load more data as the user scrolls
  const loadMoreData = useCallback(() => {
    if (data?.length > 0) {
      const totalItems = data.length;
      const isAllDataFetched = data.length === totalItems;
      if (isAllDataFetched) {
        console.log('All data has been fetched');
        setIsLoadingMore(false);
      }
    }
  }, [data]);
  const renderSpot = useCallback(
    ({item}: {item: any}) => (
      <CardItemWith_Icon
        iconName={item.active ? 'location-on' : 'location-off'}
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

  return (
    <View style={styles.container}>
      <FlatList
        // initialNumToRender={15}
        // maxToRenderPerBatch={15}
        data={data}
        // getItemLayout={(_data, index) => {
        //   return {
        //     index,
        //     length: Item_Height,
        //     offset: Item_Height * index,
        //   };
        // }}
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
              <Text style={styles.footerText}>Loading...</Text>
            </View>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: '0%',
  },
  flatListContent: {
    padding: 10,
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

export default SpotsDataByTypeComponent;
