/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors2} from '../../assets/color/Colors2';
import colors from '../../assets/color/colors';
import fontSizes from '../../assets/fonts/FontSize';

interface SpotInfoProps {
  item: {
    name: string;
    active: boolean;
    type: string;
    events: string;
    securityTag: boolean;
    driverTag: boolean;
    weighbridgeEntry: boolean;
    weighbridgeName: string;
  };
}

const SpotInfo: React.FC<SpotInfoProps> = ({item}) => (

      <View>
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.subHeader}>{item?.name || 'N/A'}</Text>
            <View
              style={[
                styles.statusContainer,
                {backgroundColor: item.active ? '#DCFCE7' : '#FEF2F2'},
              ]}>
              <Text
                style={[
                  styles.statusText,
                  {color: item.active ? '#15803D' : '#B91C1C'},
                ]}>
                {item.active ? 'Connected' : 'Not-Connected'}
              </Text>
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.value}>{item?.type || 'N/A'}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.value}>Events : </Text>
            <Text
              style={{
                marginBottom: 5,
                fontSize: 12,
                color: Colors2.SecondaryTextColor,
                fontWeight: '500',
              }}>
              {item?.events || 'N/A'}
            </Text>
          </View>
          {/* <View style={{marginTop: -20}}>
          </View> */}

          <View style={styles.row}>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                // justifyContent: 'space-between',
                justifyContent: 'flex-start',
                marginBottom: 5,
                // alignItems: 'center',
                // backgroundColor: 'red',
              }}>
              <View>
                <Text style={styles.label}>Security Tag: </Text>
                <Text style={styles.value2}>
                  {item?.securityTag ? 'Enabled' : 'Disabled'}
                </Text>
              </View>

              <View>
                <Text style={styles.label}>Driver Tag: </Text>
                <Text style={styles.value2}>
                  {item?.driverTag ? 'Enabled' : 'Disabled'}
                </Text>
              </View>
            </View>
            {/* <View style={styles.row}></View> */}
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'flex-start',
                marginBottom: 5,
                // alignItems: 'center',
                // backgroundColor: 'yellow',
              }}>
              <View>
                <Text style={styles.label}>Weighbridge Entry: </Text>
                <Text style={styles.value2}>
                  {item?.weighbridgeEntry ? 'Yes' : 'No'}
                </Text>
              </View>

              <View>
                <Text style={styles.label}>Weighbridge Name: </Text>
                <Text style={styles.value2}>
                  {item?.weighbridgeName || 'Not Available'}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
);

const styles = StyleSheet.create({
    section: {
      // backgroundColor: colors.white,
      paddingTop: 10,
      paddingHorizontal: 20,
      marginBottom: 10,
    },
    statusText: {
      fontSize: 12,
    },
    statusContainer: {
      paddingVertical: 3,
      paddingHorizontal: 5,
      borderRadius: 15,
    },
    subHeader: {
      fontSize: 22,
      fontWeight: '400',
      color: Colors2.PrimaryTextColor,
      marginTop: 8,
    },
    label: {
      fontSize: fontSizes.smallText,
      color: Colors2.HelperTextColor,
    },
    value: {
      marginBottom: 10,
      fontSize: 12,
      color: Colors2.SecondaryTextColor,
      fontWeight: '400',
    },
    value2: {
      marginBottom: 10,
      fontSize: 14,
      color: Colors2.SecondaryTextColor,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      // marginBottom: 5,
      alignItems: 'center',
    },
  });

export default SpotInfo;
