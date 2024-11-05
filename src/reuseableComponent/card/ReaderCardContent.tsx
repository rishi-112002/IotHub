import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors2} from '../../assets/color/Colors2';
import {Reader} from './DetailsCard';
import fontSizes from '../../assets/fonts/FontSize';
// interface ReaderCardContent {
//   data: Reader;
// }

export const ReaderCardContent = (reader: Reader,) => {
  return (
    // <View>
      <View style={combinedStyles.infoContainer}>
        <Text style={combinedStyles.nameText}>{reader.name || 'N/A'}</Text>
        <Text style={combinedStyles.ipText}>{reader.ip || 'N/A'}</Text>

        <View style={combinedStyles.detailsContainer}>
          <View style={combinedStyles.detailColumn}>
            <Text style={combinedStyles.label}>Model:</Text>
            <Text style={combinedStyles.detailText}>
              {reader.model || 'N/A'}
            </Text>
          </View>
          <View style={combinedStyles.detailColumn}>
            <Text style={combinedStyles.label}>Type:</Text>
            <Text style={combinedStyles.detailText}>
              {reader.type || 'N/A'}
            </Text>
          </View>
          <View style={combinedStyles.detailColumn}>
            <Text style={combinedStyles.label}>port:</Text>
            <Text style={combinedStyles.detailText}>
              {reader.port || 'N/A'}
            </Text>
          </View>
        </View>
      </View>
    // </View>
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
