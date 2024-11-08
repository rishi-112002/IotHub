import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors2} from '../../assets/color/Colors2';
import fontSizes from '../../assets/fonts/FontSize';
import { Display } from './DetailsCard';
// interface DisplayCardContent {
//   data: Reader;
// }

export const DisplayCardContent = (display: Display) => {
  return (
        <View style={combinedStyles.infoContainer}>
          <Text style={combinedStyles.nameText}>{display.name || 'N/A'}</Text>
          <Text style={combinedStyles.ipText}>{display.ip || 'N/A'}</Text>
          <View style={combinedStyles.detailsContainer}>
            <View style={combinedStyles.detailColumn}>
              <Text style={combinedStyles.label}>Version:</Text>
              <Text style={combinedStyles.detailText}>
                {display.version || 'N/A'}
              </Text>
            </View>
            <View style={combinedStyles.detailColumn}>
              <Text style={combinedStyles.label}>Type:</Text>
              <Text style={combinedStyles.detailText}>
                {display.type || 'N/A'}
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
    flex:1,
    marginTop: 4,
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
  },
  label: {
    fontSize: fontSizes.smallText,
    color: Colors2.HelperTextColor,
  },
  detailText: {
    fontSize: 12,
    color: Colors2.SecondaryTextColor,
  },
});
