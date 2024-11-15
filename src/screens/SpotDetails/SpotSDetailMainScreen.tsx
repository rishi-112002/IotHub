/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useLayoutEffect} from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {useNavigation, RouteProp, useRoute} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useSelector} from 'react-redux';
import {RootState} from '../../reducer/Store';
import SpotInfo from './SpotInfo';
import CustomMenu from '../../reuseableComponent/menuOptions/CustomMenu';
import fontSizes from '../../assets/fonts/FontSize';
import colors from '../../assets/color/colors';
import DataTab from '../../reuseableComponent/card/DetailsCard';
import {Colors2} from '../../assets/color/Colors2';
import {RfidListHook} from '../../CustomHooks/RFIDHooks/RFIDListHook';
// import CustomAlert from '../../reuseableComponent/PopUp/CustomPopUp';

const Tab = createMaterialTopTabNavigator();

const SpotDetailScreen = () => {
  // const {
  //   // ListData,
  //   // Loader,
  //   // loadRfidList,
  //   handleDelete,
  //   // refreshing,
  //   // buCode,
  //   // alertVisible,
  //   // setAlertVisible,
  //   // confirmDelete,
  //   // successAlertVisible,
  //   // errorAlertVisible,
  //   // errorMessage,
  // } = RfidListHook();
  // console.log('Spot Detail Screen :- ', handleDelete);
  const route = useRoute<RouteProp<{params: {data: any}}, 'params'>>();
  const item = route.params?.data;
  const baseUrls = useSelector(
    (state: RootState) => state.authentication.baseUrl,
  );
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Text style={styles.headerTitle}>Spot Details</Text>,
      headerRight: () => <CustomMenu baseUrl={baseUrls} spotName={item.name} />,
    });
  }, [baseUrls, item.name, navigation]);

  return (
    <View style={styles.container}>
      <SpotInfo item={item} />

      <View style={styles.divider} />

      {/* Tab Navigator */}
      <Tab.Navigator>
        <Tab.Screen name="Displays">
          {() => (
            <ScrollView style={{flex: 1, backgroundColor: colors.white}}>
              <DataTab
                data={item.displays}
                dataType="displays"
                noDataMessage="No Displays Available"
              />
            </ScrollView>
          )}
        </Tab.Screen>
        <Tab.Screen name="Readers">
          {() => (
            <ScrollView style={{flex: 1, backgroundColor: colors.white}}>
              <DataTab
                data={item.readers}
                dataType="readers"
                allow={false}
                // handleDelete={handleDelete}
                noDataMessage="No Spot Commands Available"
              />
            </ScrollView>
          )}
        </Tab.Screen>
        <Tab.Screen name="Spot Commands">
          {() => (
            <ScrollView style={{flex: 1, backgroundColor: colors.white}}>
              <DataTab
                data={item.spotCommands}
                dataType="spotCommands"
                noDataMessage="No Spot Commands Available"
              />
            </ScrollView>
          )}
        </Tab.Screen>
      </Tab.Navigator>
      {/* {alertVisible && (
        <CustomAlert
          isVisible={alertVisible}
          onClose={() => setAlertVisible(false)}
          onOkPress={confirmDelete}
          title="Delete RFID"
          message="Are you sure you want to delete this RFID?"
          showCancel={true}
        />
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headerTitle: {
    color: Colors2.SecondaryTextColor,
    fontSize: fontSizes.heading,
  },
  divider: {
    borderWidth: 1,
    borderColor: Colors2.DividerColor,
  },
});

export default SpotDetailScreen;
