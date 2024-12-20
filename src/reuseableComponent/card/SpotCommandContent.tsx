/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import fontSizes from '../../assets/fonts/FontSize';
import { SpotCommand } from './DetailsCard';
import colors from '../../assets/color/colors';
import { Strings } from '../../assets/constants/Lable';
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
                ? colors.greenSoftneer
                : colors.redSoftner,
            },
          ]}>
          <Text
            style={[
              combinedStyles.statusText,
              { color: command.autoCommandEnabled ? colors.greenBase : colors.redBase },
            ]}>
            {command.autoCommandEnabled ? Strings.ACTIVE : Strings.DEACTIVE}
          </Text>
        </View>
      </View>
      <Text style={combinedStyles.ipText}>{command.commandDirA}</Text>
    </View>
  );
};

const combinedStyles = StyleSheet.create({
  statusText: {
    fontSize: fontSizes.smallText,

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
    fontSize: fontSizes.title,
    color: colors.SecondaryTextColor,
  },
  commandNameText: {
    marginTop: 0,
    fontSize: fontSizes.title,
    color: colors.SecondaryTextColor,
  },
  ipText: {
    marginTop: 4,
    fontSize: fontSizes.smallText,
    color: colors.SecondaryTextColor,
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
    color: colors.HelperTextColor,
  },
  detailText: {
    fontSize: fontSizes.smallText,
    color: colors.SecondaryTextColor,
  },
  noDataText: {
    textAlign: 'center',
    fontSize: fontSizes.text,
    color: colors.lightGray,
  },
});
