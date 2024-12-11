import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import fontSizes from '../../assets/fonts/FontSize';
import { Display } from './DetailsCard';
import colors from '../../assets/color/colors';
import { Strings } from '../../assets/constants/Lable';
// interface DisplayCardContent {
//   data: Reader;
// }

export const DisplayCardContent = (display: Display) => {
  return (
    <View style={combinedStyles.infoContainer}>
      <Text style={combinedStyles.nameText}>{display.name ||  Strings.NA}</Text>
      <Text style={combinedStyles.ipText}>{display.ip || Strings.NA}</Text>
      <View style={combinedStyles.detailsContainer}>
        <View style={combinedStyles.detailColumn}>
          <Text style={combinedStyles.label}>{Strings.VERSION}:</Text>
          <Text style={combinedStyles.detailText}>
            {display.version || Strings.NA}
          </Text>
        </View>
        <View style={combinedStyles.detailColumn}>
          <Text style={combinedStyles.label}>{Strings.TYPE}:</Text>
          <Text style={combinedStyles.detailText}>
            {display.type ||  Strings.NA}
          </Text>
        </View>
      </View>
    </View>
  );
};

const combinedStyles = StyleSheet.create({
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginBottom: 5,
    paddingLeft: 10,
  },
  nameText: {
    flex: 1,
    marginTop: 4,
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
  },
  label: {
    fontSize: fontSizes.smallText,
    color: colors.HelperTextColor,
  },
  detailText: {
    fontSize: fontSizes.smallText,
    color: colors.SecondaryTextColor,
  },
});
