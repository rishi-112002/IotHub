/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../assets/color/colors';
import fontSizes from '../../assets/fonts/FontSize';
import { Strings } from '../../assets/constants/Lable';

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

const SpotInfo: React.FC<SpotInfoProps> = ({ item }: any) => (
  < View >
    <View style={styles.section}>
      <View style={styles.row}>
        <Text style={styles.subHeader}>{item?.name || Strings.NA}</Text>
        <View
          style={[
            styles.statusContainer,
            { backgroundColor: item.active ? '#DCFCE7' : '#FEF2F2' },
          ]}>
          <Text
            style={[
              styles.statusText,
              { color: item.active ? '#15803D' : '#B91C1C' },
            ]}>
            {item.active ? 'Connected' : 'Not-Connected'}
          </Text>
        </View>
      </View>

      <View style={styles.row}>
        <Text style={styles.value}>{item?.type || Strings.NA}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.value}>{Strings.EVENT} : </Text>
        <Text
          style={{
            marginBottom: 5,
            fontSize: 12,
            color: colors.SecondaryTextColor,
            fontWeight: '500',
          }}>
          {item?.events || Strings.NA}
        </Text>
      </View>
      {/* <View style={{marginTop: -20}}>
          </View> */}

      <View style={styles.row}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            marginBottom: 5,
          }}>
          <View>
            <Text style={styles.label}>{Strings.SEQURITY_TAG}: </Text>
            <Text style={styles.value2}>
              {item?.securityTag ? Strings.ENABLED : Strings.DISABLED}
            </Text>
          </View>

          <View>
            <Text style={styles.label}>{Strings.DRIVER_TAG}: </Text>
            <Text style={styles.value2}>
              {item?.driverTag ? Strings.ENABLED : Strings.DISABLED}
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
          }}>
          <View>
            <Text style={styles.label}>{Strings.WEIGHBRIDGE_ENTRY}: </Text>
            <Text style={styles.value2}>
              {item?.weighbridgeEntry ? Strings.YES : Strings.NO}
            </Text>
          </View>

          <View>
            <Text style={styles.label}>{Strings.WEIGHBRIDGE_NAME}: </Text>
            <Text style={styles.value2}>
              {item?.weighbridgeName || Strings.NA}
            </Text>
          </View>
        </View>
      </View>
    </View>
  </View >
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
    color: colors.PrimaryTextColor,
    marginTop: 8,
  },
  label: {
    fontSize: fontSizes.smallText,
    color: colors.HelperTextColor,
  },
  value: {
    marginBottom: 10,
    fontSize: 12,
    color: colors.SecondaryTextColor,
    fontWeight: '400',
  },
  value2: {
    marginBottom: 10,
    fontSize: 14,
    color: colors.SecondaryTextColor,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginBottom: 5,
    alignItems: 'center',
  },
});

export default SpotInfo;
