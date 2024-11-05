/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import fontSizes from '../../assets/fonts/FontSize';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RootDrawerTypes} from '../../navigation/DrawerNavigation';
import {Colors2} from '../../assets/color/Colors2';
import {CardItemWith_Icon} from '../../reuseableComponent/card/CardItemWithIcon';
import {ReaderCardContent} from '../../reuseableComponent/card/ReaderCardContent';

type init = {
  item: any;
  handleDelete: (item: any) => void;
};

// Main component
const RfidItem: React.FC<init> = ({item, handleDelete}) => {
  const navigation = useNavigation<NavigationProp<RootDrawerTypes>>();
  return (
    <GestureHandlerRootView style={{flex: 1, paddingHorizontal: 10}}>
      <SafeAreaView>
        <CardItemWith_Icon iconName={"wifi-tethering"} view={ReaderCardContent(item)}/>
        {/* <DataTab
          data={item}
          dataType="readers"
          noDataMessage="No Spot Commands Available"
        /> */}
        {/* <Card style={{backgroundColor:'white'}}> */}
        {/* <View style={styles.contantView}>
          <View>
            <Text style={styles.spotTitle}>{item.name}</Text>
            <Text style={styles.ipText}>{item.ip || 'N/A'}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              columnGap: 20,
              paddingTop: 5,
              paddingRight: 10,
            }}>
            <MaterialIcons
              name={'edit'}
              size={20}
              color={colors.blueDarkest}
              onPress={() => {
                navigation.navigate('RfidEdit', {item});
              }}
            />
            <MaterialIcons
              name="delete"
              size={20}
              color={colors.redDarkest}
              onPress={() => handleDelete(item.id)}
            />
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.detailColumn}>
            <Text style={styles.label}>Model:</Text>
            <Text style={styles.detailText}>{item.model || 'N/A'}</Text>
          </View>
          <View style={styles.detailColumn}>
            <Text style={styles.label}>port:</Text>
            <Text style={styles.detailText}>{item.port || 'N/A'}</Text>
          </View>
        </View> */}

        {/* <View style={styles.contantView}>
          <Text style={styles.infoText}>Model: {item.model}</Text>
        </View>
        <View style={styles.contantView}>
          <Text style={styles.infoText}>IP: {item.ip}</Text>
        </View>
        <View style={styles.contantView}>
          <Text style={styles.infoText}>Port: {item.port}</Text>
        </View> */}
        {/* <View style={styles.divider} /> */}
        {/* </Card> */}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  contantView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  detailColumn: {
    flex: 1,
    flexDirection: 'column',
  },
  label: {
    fontSize: fontSizes.smallText,
    color: Colors2.HelperTextColor,
  },
  detailText: {
    fontSize: 12,
    color: Colors2.SecondaryTextColor,
  },
  ipText: {
    marginTop: 4,
    fontSize: 12,
    color: Colors2.SecondaryTextColor,
  },
  spotTitle: {
    fontSize: fontSizes.heading,
    fontWeight: 'bold',
    color: '#333',
  },
  infoText: {
    fontSize: fontSizes.text,
    color: '#666',
    marginBottom: 1,
  },
  divider: {
    height: 1,
    marginVertical: 10,
    backgroundColor: '#d4d4d4',
  },
});

export default React.memo(RfidItem);
