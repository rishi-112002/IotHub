/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { Reader } from './DetailsCard';
import fontSizes from '../../assets/fonts/FontSize';
import CustomIcon from '../customIcons/CustomIcon';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AppNavigationParams } from '../../navigation/NavigationStackList';
import colors from '../../assets/color/colors';
import { ImagePath, Strings } from '../../assets/constants/Lable';

export const ReaderCardContent = (
  reader: Reader,
  allowAction: boolean,
  handleDelete: (reader: any) => void,
) => {
  const navigation = useNavigation<NavigationProp<AppNavigationParams>>();

  return (
    <View style={combinedStyles.infoContainer}>
      {allowAction ? (
        <>
          <View
            style={{
              flexDirection: 'row',
              columnGap: 10,
              paddingRight: 10,
            }}>
            <Text style={combinedStyles.nameText}>{reader.name ||  Strings.NA}</Text>
            <CustomIcon
              iconPath={ImagePath.EDIT}
              onPress={() => {
                navigation.navigate('RfidEdit', { readers: reader });
              }}
            />
            <CustomIcon
              iconPath={ImagePath.DELETE}
              onPress={() => handleDelete(reader.id)}
            />
          </View>
        </>
      ) : (
          <Text style={combinedStyles.nameText}>{reader.name || Strings.NA}</Text>
      )}
      <Text style={combinedStyles.ipText}>{reader.ip || Strings.NA}</Text>

      <View style={combinedStyles.detailsContainer}>
        <View style={combinedStyles.detailColumn}>
          <Text style={combinedStyles.label}>{Strings.MODEL}:</Text>
          <Text style={combinedStyles.detailText}>{reader.model || Strings.NA}</Text>
        </View>
        <View style={combinedStyles.detailColumn}>
          <Text style={combinedStyles.label}>{Strings.TYPE}:</Text>
          <Text style={combinedStyles.detailText}>{reader.type || Strings.NA}</Text>
        </View>
        <View style={combinedStyles.detailColumn}>
          <Text style={combinedStyles.label}>{Strings.PORT}:</Text>
          <Text style={combinedStyles.detailText}>{reader.port || Strings.NA}</Text>
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
    paddingLeft: 10,
  },
  nameText: {
    flex: 1,
    marginTop: 1,
    fontSize:fontSizes.title,
    color: colors.SecondaryTextColor,
  },
  commandNameText: {
    marginTop: 0,
    fontSize:fontSizes.title,
    color: colors.SecondaryTextColor,
  },
  ipText: {
    marginTop: 3,
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
    fontSize:fontSizes.smallText,
    color: colors.SecondaryTextColor,
  },
  noDataText: {
    textAlign: 'center',
    fontSize: fontSizes.text,
    color: colors.lightGray,
  },
});
