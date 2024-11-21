import React, { useCallback } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AppNavigationParams } from '../../navigation/NavigationStackList';
import SpotDataByTypeSubComponent from './SpotDataByTypeSubComponent';
import CardItemWith_Icon from '../../reuseableComponent/card/CardItemWithIcon';
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
    if (type === 'GENERIC_SPOT') {
      navigation.navigate('GenericSpotAddScreen', { id: id });
    }
    else {
      navigation.navigate('WeighbridgesAddScreen', { id: id });
    }
  };
  const renderSpot = useCallback(
    ({ item }: { item: any }) => (
      <CardItemWith_Icon
        iconName={item.active ? 'location-on' : "location-off"}
        view={
          <SpotDataByTypeSubComponent
            handleDelete={handleDelete}
            item={item}
            navigate={navigate}
            navigation={navigation}
            height={Item_Height} />
        }
      />
    ),
    [handleScroll, handleDelete, type]
  );

  return (
    <View style={styles.container}>
      <FlatList
        initialNumToRender={15}
        maxToRenderPerBatch={15}
        data={data}
        getItemLayout={(_data, index) => {
          return {
            index, length: Item_Height, offset: Item_Height * index
          };
        }}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={renderSpot}
        contentContainerStyle={styles.flatListContent}
        onScroll={handleScroll}
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

});

export default SpotsDataByTypeComponent;
