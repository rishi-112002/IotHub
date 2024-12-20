/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import {Strings} from '../../assets/constants/Lable';
import {STYLES} from '../ScreensStyles';

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

const SpotInfo: React.FC<SpotInfoProps> = ({item}: any) => (
  <View>
    <View style={STYLES.SpotInfo_section}>
      <View style={STYLES.SpotInfo_row}>
        <Text style={STYLES.SpotInfo_subHeader}>
          {item?.name || Strings.NA}
        </Text>
        <View
          style={[
            STYLES.SpotInfo_statusContainer,
            {backgroundColor: item.active ? '#DCFCE7' : '#FEF2F2'},
          ]}>
          <Text
            style={[
              STYLES.SpotInfo_statusText,
              {color: item.active ? '#15803D' : '#B91C1C'},
            ]}>
            {item.active ? Strings.CONNECTED : Strings.NOT_CONNECTED}
          </Text>
        </View>
      </View>

      <View style={STYLES.SpotInfo_row}>
        <Text style={STYLES.SpotInfo_value}>{item?.type || Strings.NA}</Text>
      </View>

      <View style={{flexDirection: 'row'}}>
        <Text style={STYLES.SpotInfo_value}>{Strings.EVENT} : </Text>
        <Text style={STYLES.SpotInfo_EventText}>
          {item?.events || Strings.NA}
        </Text>
      </View>
      {/* <View style={{marginTop: -20}}>
          </View> */}

      <View style={STYLES.SpotInfo_row}>
        <View
          style={STYLES.SpotInfo_SecurityTag}>
          <View>
            <Text style={STYLES.SpotInfo_label}>{Strings.SEQURITY_TAG}: </Text>
            <Text style={STYLES.SpotInfo_value2}>
              {item?.securityTag ? Strings.ENABLED : Strings.DISABLED}
            </Text>
          </View>

          <View>
            <Text style={STYLES.SpotInfo_label}>{Strings.DRIVER_TAG}: </Text>
            <Text style={STYLES.SpotInfo_value2}>
              {item?.driverTag ? Strings.ENABLED : Strings.DISABLED}
            </Text>
          </View>
        </View>
        {/* <View style={STYLES.SpotInfo_row}></View> */}
        <View
          style={STYLES.SpotInfo_SecurityTag}>
          <View>
            <Text style={STYLES.SpotInfo_label}>
              {Strings.WEIGHBRIDGE_ENTRY}:{' '}
            </Text>
            <Text style={STYLES.SpotInfo_value2}>
              {item?.weighbridgeEntry ? Strings.YES : Strings.NO}
            </Text>
          </View>

          <View>
            <Text style={STYLES.SpotInfo_label}>
              {Strings.WEIGHBRIDGE_NAME}:{' '}
            </Text>
            <Text style={STYLES.SpotInfo_value2}>
              {item?.weighbridgeName || Strings.NA}
            </Text>
          </View>
        </View>
      </View>
    </View>
  </View>
);

export default SpotInfo;
