/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors from '../../assets/color/colors';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import fontSizes from '../../assets/fonts/FontSize';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {RootDrawerTypes} from '../../navigation/DrawerNavigation';

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
        {/* <Card style={{backgroundColor:'white'}}> */}
        <View style={styles.contantView}>
          <Text style={styles.spotTitle}>{item.name}</Text>
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
                navigation.navigate('RFID Edit', {item});
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
        <View style={styles.contantView}>
          <Text style={styles.infoText}>Model: {item.model}</Text>
        </View>
        <View style={styles.contantView}>
          <Text style={styles.infoText}>IP: {item.ip}</Text>
        </View>
        <View style={styles.contantView}>
          <Text style={styles.infoText}>Port: {item.port}</Text>
        </View>
        <View style={styles.divider} />
        {/* </Card> */}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  contantView: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
