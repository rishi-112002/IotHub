/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {Colors2} from '../../assets/color/Colors2';
import {Reader} from './DetailsCard';
import fontSizes from '../../assets/fonts/FontSize';
import CustomIcon from '../customIcons/CustomIcon';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppNavigationParams} from '../../navigation/NavigationStackList';
// import CustomAlert from '../PopUp/CustomPopUp';
// import { RfidListHook } from '../../CustomHooks/RFIDHooks/RFIDListHook';
// import CustomAlert from '../PopUp/CustomPopUp';
// import { RfidListHook } from '../../CustomHooks/RFIDHooks/RFIDListHook';

export const ReaderCardContent = (
  reader: Reader,
  allowAction: boolean,
  // alertVisible: any,
  // setAlertVisible: any,
  // confirmDelete: any,
  handleDelete: (reader: any) => void,
) => {
  // const {
  //   // ListData,
  //   // Loader,
  //   // loadRfidList,
  //   // refreshing,
  //   // buCode,
  //   alertVisible,
  //   handleDelete,
  //   setAlertVisible,
  //   confirmDelete,
  // } = RfidListHook();

  const navigation = useNavigation<NavigationProp<AppNavigationParams>>();

  return (
    // <View>
    <View style={combinedStyles.infoContainer}>
      {allowAction ? (
        <>
          <View
            style={{
              flexDirection: 'row',
              columnGap: 10,
              paddingRight: 10,
            }}>
            <Text style={combinedStyles.nameText}>{reader.name || 'N/A'}</Text>
            <CustomIcon
              iconPath={require('../../assets/icons/Edit--Streamline-Tabler.png')}
              onPress={() => {
                navigation.navigate('RfidEdit', {readers: reader});
              }}
            />
            <CustomIcon
              iconPath={require('../../assets/icons/deleteIcon.png')}
              onPress={() => handleDelete(reader.id)}
            />
          </View>
        </>
      ) : (
        <>
          <Text style={combinedStyles.nameText}>{reader.name || 'N/A'}</Text>
          {/* <Text style={combinedStyles.ipText}>{reader.ip || 'N/A'}</Text> */}
        </>
      )}
      <Text style={combinedStyles.ipText}>{reader.ip || 'N/A'}</Text>

      <View style={combinedStyles.detailsContainer}>
        <View style={combinedStyles.detailColumn}>
          <Text style={combinedStyles.label}>Model:</Text>
          <Text style={combinedStyles.detailText}>{reader.model || 'N/A'}</Text>
        </View>
        <View style={combinedStyles.detailColumn}>
          <Text style={combinedStyles.label}>Type:</Text>
          <Text style={combinedStyles.detailText}>{reader.type || 'N/A'}</Text>
        </View>
        <View style={combinedStyles.detailColumn}>
          <Text style={combinedStyles.label}>port:</Text>
          <Text style={combinedStyles.detailText}>{reader.port || 'N/A'}</Text>
        </View>
      </View>

      {/* {alertVisible && (
        <CustomAlert
          isVisible={alertVisible}
          onClose={() => setAlertVisible(false)}
          onOkPress={confirmDelete}
          title="Delete RFID"
          message="Are you sure you want to delete this RFID?"
          showCancel={true}
        />
      )} */}
    </View>
    // </View>
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
    fontSize: 16,
    color: Colors2.SecondaryTextColor,
  },
  commandNameText: {
    marginTop: 0,
    fontSize: 16,
    color: Colors2.SecondaryTextColor,
  },
  ipText: {
    marginTop: 3,
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
