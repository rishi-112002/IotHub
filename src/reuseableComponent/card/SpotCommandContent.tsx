/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors2} from '../../assets/color/Colors2';
import fontSizes from '../../assets/fonts/FontSize';
import { SpotCommand } from './DetailsCard';
import colors from '../../assets/color/colors';
// interface DisplayCardContent {
//   data: Reader;
// }

export const SpotCommandCardContent = (command: SpotCommand) => {
  return (
    <View style={combinedStyles.infoContainer}>
    <View style={combinedStyles.row2}>
      <Text style={combinedStyles.nameText}>{command.name}</Text>
      <View
        style={[
            combinedStyles.statusContainer,
          {
            backgroundColor: command.autoCommandEnabled
              ? '#DCFCE7'
              : '#FEF2F2',
          },
        ]}>
        <Text
          style={[
            combinedStyles.statusText,
            {color: command.autoCommandEnabled ? '#15803D' : '#B91C1C'},
          ]}>
          {command.autoCommandEnabled ? 'Active' : 'Deactive'}
        </Text>
      </View>
    </View>
    <Text style={combinedStyles.ipText}>{command.commandDirA}</Text>
  </View>
  );
};

const combinedStyles = StyleSheet.create({
      statusText: {
        fontSize: 12,
      },
      statusContainer: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 15,
      },

      row2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      infoContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginBottom: 5,
        paddingLeft: 10,
      },
      nameText: {
        marginTop: 4,
        fontSize: 16,
        color: Colors2.SecondaryTextColor,
      },
      commandNameText: {
        marginTop: 0,
        fontSize: 16,
        color: Colors2.SecondaryTextColor,
      },
      ipText: {
        marginTop: 4,
        fontSize: 12,
        color: Colors2.SecondaryTextColor,
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
      noDataText: {
        textAlign: 'center',
        fontSize: 14,
        color: '#aaa',
      },
});
