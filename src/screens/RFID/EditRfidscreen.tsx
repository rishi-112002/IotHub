/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, ScrollView, Text} from 'react-native';
import colors from '../../assets/color/colors';
import CustomButton from '../../reuseableComponent/customButton/CustomButton';
import CustomTextInput from '../../reuseableComponent/customTextInput/CustomTextInput';
import GenericModal from '../../reuseableComponent/modal/GenralModal';
import LoadingModal from '../../reuseableComponent/loader/CustomLoaderFaiz';
import {useEditRfid} from '../../CustomHooks/RFIDHooks/RFIDEditHook';
import {MODEL_LIST} from '../../assets/constants/Constant';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useNetwork} from '../../contextApi/NetworkContex';
import {Lable, Strings} from '../../assets/constants/Lable';
import {STYLES} from '../ScreensStyles';

// Define MODEL_LIST here

interface readerParams {
  readers: {
    id: string;
    name: string;
    model?: string;
    ip: string;
    port: number;
  };
}

function EditRfidScreen() {
  const route = useRoute<RouteProp<{params: readerParams}, 'params'>>();
  const readers = route.params?.readers || '';
  const {isConnected} = useNetwork();

  const {
    name,
    model,
    IPAddress,
    port,
    errors,
    Loader,
    dropdownVisible,
    smartControllerLoader,
    setName,
    setIPAddress,
    setPort,
    setDropdownVisible,
    handleSaveData,
    handleInputFocus,
    handleModalSelect,
    showIpAndPortFields,
  } = useEditRfid(readers);

  return (
    <>
      {isConnected ? (
        <ScrollView
          contentContainerStyle={{backgroundColor: colors.white, flex: 1}}>
          {Loader || smartControllerLoader ? (
            <LoadingModal visible={Loader} message={Strings.Loader_Messsage} />
          ) : (
            <View style={{padding: 20}}>
              <CustomTextInput
                label={Strings.NAME_S}
                value={name}
                editable
                errorMessage={errors.name}
                keyboardType="default"
                returnKeyType="next"
                setTextInput={setName}
                style={{flex: 1, color: colors.SecondaryTextColor}}
                onFocus={() => handleInputFocus(Strings.NAME_s)}
                required={false}
              />
              <CustomTextInput
                label={Lable.MODEL_NUMBER}
                value={model}
                editable={false}
                errorMessage={errors.model}
                onPress={() => setDropdownVisible(true)}
                setTextInput={undefined}
                style={{flex: 1, color: colors.SecondaryTextColor}}
                required={false}
                type="dropdown"
              />

              {dropdownVisible && (
                <GenericModal
                  options={MODEL_LIST}
                  isVisible={dropdownVisible}
                  handleCloseModal={() => setDropdownVisible(false)}
                  onOptionSelected={handleModalSelect}
                  nameKey={Strings.NAME_s}
                  valueKey={Strings.VALUE}
                />
              )}

              {/* Conditionally render IP Address and Port fields */}
              {showIpAndPortFields && (
                <>
                  <CustomTextInput
                    label={Strings.IPAddress}
                    value={IPAddress}
                    errorMessage={errors.IPAddress}
                    keyboardType="default"
                    returnKeyType="next"
                    style={{flex: 1, color: colors.SecondaryTextColor}}
                    setTextInput={setIPAddress}
                    onFocus={() => handleInputFocus(Strings.IPAddress)}
                    required={false}
                  />

                  <CustomTextInput
                    label={Lable.PORT_NUMBER}
                    value={port?.toString()}
                    errorMessage={errors.port}
                    keyboardType="default"
                    style={{flex: 1, color: colors.SecondaryTextColor}}
                    setTextInput={setPort}
                    onFocus={() => handleInputFocus(Strings.port)}
                    required={false}
                  />
                </>
              )}

              <CustomButton label={Lable.SAVE} onPress={handleSaveData} />
            </View>
          )}
        </ScrollView>
      ) : (
        <View style={STYLES.No_Internet_View}>
          <Text>No Internet Connection</Text>
        </View>
      )}
    </>
  );
}

export default EditRfidScreen;
