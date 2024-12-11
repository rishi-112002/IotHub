import React, { useLayoutEffect } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducer/Store';
import SpotInfo from './SpotInfo';
import CustomMenu from '../../reuseableComponent/menuOptions/CustomMenu';
import fontSizes from '../../assets/fonts/FontSize';
import colors from '../../assets/color/colors';
import DataTab from '../../reuseableComponent/card/DetailsCard';
import { useNetwork } from '../../contextApi/NetworkContex';
import { Strings } from '../../assets/constants/Lable';
import { NoInternetScreen } from '../../reuseableComponent/defaultScreen/NoInternetScreen';

const Tab = createMaterialTopTabNavigator();

const SpotDetailScreen = () => {
  const { isConnected } = useNetwork();
  const route = useRoute<RouteProp<{ params: { data: any } }>>();
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

  console.log("item", item)
  return (
    <View style={{ flex: 1 }}>

      {isConnected ? (
        <View style={styles.container}>
          <SpotInfo item={item} />

          <View style={styles.divider} />

          {/* Tab Navigator */}
          {item.displays && item.spotCommands && item.readers && (
            <Tab.Navigator>
              <Tab.Screen name={Strings.DISPLAYS}>
                {() => (
                  <ScrollView style={{ flex: 1, backgroundColor: colors.white }}>
                    <DataTab
                      data={item.displays}
                      dataType="displays"
                      noDataMessage={Strings.NO_DISPLAY_AVILABLE}
                    />
                  </ScrollView>
                )}
              </Tab.Screen>
              <Tab.Screen name={Strings.READERS}>
                {() => (
                  <ScrollView style={{ flex: 1, backgroundColor: colors.white }}>
                    <DataTab
                      data={item.readers}
                      dataType="readers"
                      allow={false}
                      noDataMessage={Strings.NO_READERS}
                    />
                  </ScrollView>
                )}
              </Tab.Screen>
              <Tab.Screen name={Strings.SPOT_COMMANDS}>
                {() => (
                  <ScrollView style={{ flex: 1, backgroundColor: colors.white }}>
                    <DataTab
                      data={item.spotCommands}
                      dataType="spotCommands"
                      noDataMessage={Strings.NO_SPOT_COMMAND}
                    />
                  </ScrollView>
                )}
              </Tab.Screen>
            </Tab.Navigator>
          )}
        </View>
      ) : (
        <NoInternetScreen />
      )}
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headerTitle: {
    color: colors.SecondaryTextColor,
    fontSize: fontSizes.heading,
  },
  divider: {
    borderWidth: 1,
    borderColor: colors.DividerColor,
  },
});

export default SpotDetailScreen;
