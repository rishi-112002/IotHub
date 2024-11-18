import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import CustomIcon from '../reuseableComponent/customIcons/CustomIcon';
import fontSizes from '../assets/fonts/FontSize';
import { AppNavigationParams } from '../navigation/NavigationStackList';
function SpotsDataByTypeComponent(props: {
  data: any;
  type: string;
  handleScroll: any;
  handleDelete: any;
}) {
  const navigation = useNavigation<NavigationProp<AppNavigationParams>>();
  const { data, handleScroll, handleDelete, type } = props;
  // console.log("type", type)
  const navigate = (id: any) => {
    if (type === 'GENERIC_SPOT') {
      navigation.navigate('GenericSpotAddScreen', { id: id });
    }
    else {
      navigation.navigate('WeighbridgesAddScreen', { id: id });
    }
  };
  const renderSpot = ({ item }: any) => {
    return (
      <View>
        <View style={styles.spotContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('SpotDetailScreen', { data: item })
            }>
            <View style={styles.row}>
              <Text style={styles.spotTitle}>{item.name}</Text>
              <View style={styles.statusContainer}>
                <View
                  style={[
                    styles.statusBadge,
                    item.active ? styles.activeStatus : styles.inactiveStatus,
                  ]}>
                  <Text
                    style={
                      item.active ? styles.activeText : styles.inactiveText
                    }>
                    {item.active ? 'Active' : 'In-active'}
                  </Text>
                </View>
                <View style={styles.iconContainer}>
                  <CustomIcon
                    iconPath={require('../assets/icons/deleteIcon.png')}
                    onPress={() => handleDelete(item.id)}
                  />
                  <CustomIcon
                    iconPath={require('../assets/icons/Edit--Streamline-Tabler.png')}
                    onPress={() => navigate(item.id)}
                  />
                </View>
              </View>
            </View>
            <Text style={styles.infoText}>ValidId: {item.validDiDirA}</Text>
            <Text style={styles.infoText}>Event: {item.events}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.divider} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
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
  spotContainer: {
    paddingHorizontal: 20,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  spotTitle: {
    fontSize: fontSizes.heading,
    fontWeight: 'bold',
    color: '#333',
  },
  statusContainer: {
    flexDirection: 'row',
    columnGap: 10,
  },
  statusBadge: {
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 15,
  },
  activeStatus: {
    backgroundColor: '#DCFCE7',
  },
  inactiveStatus: {
    backgroundColor: '#FEF2F2',
  },
  activeText: {
    color: '#15803D',
    fontSize: fontSizes.vSmallText,
  },
  inactiveText: {
    color: '#B91C1C',
    fontSize: fontSizes.vSmallText,
  },
  iconContainer: {
    flexDirection: 'row',
    columnGap: 10,
  },
  infoText: {
    fontSize: fontSizes.subheading,
    color: '#666',
    marginBottom: 5,
  },
  divider: {
    height: 1,
    marginVertical: 15,
    backgroundColor: '#d4d4d4',
  },
});

export default SpotsDataByTypeComponent;
