/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import colors from '../../assets/color/colors';
import CustomButton from '../../reuseableComponent/customButton/CustomButton';
import CustomTextInput from '../../reuseableComponent/customTextInput/CustomTextInput';
import GenericModal from '../../reuseableComponent/modal/GenralModal';
import LoadingModal from '../../reuseableComponent/loader/CustomLoaderFaiz';
import { useRfidAddForm } from '../../CustomHooks/RFIDHooks/RFIDAddHook';
import { useNetwork } from '../../contextApi/NetworkContex';
import { Colors2 } from '../../assets/color/Colors2';

const RfidAddScreen = () => {
  const { isConnected } = useNetwork();

  const {
    name,
    modal,
    IPAddress,
    port,
    errors,
    dropdownVisible,
    Loader,
    smartControllerLoader,
    MODEL_LIST,
    setName,
    setIPAddress,
    setPort,
    setModal,
    handleSaveData,
    handleInputFocus,
    handleModalSelect,
    setDropdownVisible,
  } = useRfidAddForm(); // Use custom hook

  return (
    <View style={{ flex: 1 }}>


      {
        isConnected ? (
          <ScrollView
            contentContainerStyle={{ backgroundColor: colors.white, flex: 1 }}>
            {Loader || smartControllerLoader ? (
              <LoadingModal
                visible={Loader}
                message="Processing your request..."
              />
            ) : (
              <View style={{ padding: 20 }}>
                {/* Name Input */}
                <CustomTextInput
                  label="Name"
                  value={name}
                  errorMessage={errors.name}
                  keyboardType="default"
                  returnKeyType="next"
                  style={{ flex: 1, color: Colors2.SecondaryTextColor }}
                  setTextInput={setName}
                  onFocus={() => handleInputFocus('name')}
                  required={false}
                />

                {/* Model Number Input */}
                <View style={{ position: 'relative' }}>
                  <CustomTextInput
                    label="Model Number"
                    value={modal || ''}
                    style={{ flex: 1, color: Colors2.SecondaryTextColor }}

                    editable={false}
                    errorMessage={errors.modal}
                    setTextInput={setModal}
                    onPress={() => setDropdownVisible(true)} // Open modal on press
                    required={false}
                    type='dropdown'
                  />
                </View>

                {/* Model Number Modal */}
                {dropdownVisible && (
                  <GenericModal
                    options={MODEL_LIST}
                    isVisible={dropdownVisible}
                    handleCloseModal={() => setDropdownVisible(false)}
                    onOptionSelected={handleModalSelect}
                    nameKey="name"
                    valueKey="value"
                  />
                )}

                {/* IP Address And Port Input */}
                {modal !== 'FX9600' && (
                  <>
                    <CustomTextInput
                      label="IP Address"
                      value={IPAddress}
                      errorMessage={errors.IPAddress}
                      keyboardType="default"
                      style={{ flex: 1, color: Colors2.SecondaryTextColor }}
                      returnKeyType="next"
                      setTextInput={setIPAddress}
                      onFocus={() => handleInputFocus('IPAddress')}
                      required={false}
                    />
                    <CustomTextInput
                      label="Port Number"
                      value={port}
                      errorMessage={errors.port}
                      keyboardType="numeric"
                      style={{ flex: 1, color: Colors2.SecondaryTextColor }}

                      setTextInput={setPort}
                      onFocus={() => handleInputFocus('port')}
                      required={false}
                    />
                  </>
                )}

                {/* Save Button */}
                <CustomButton
                  label="Save"
                  onPress={handleSaveData}
                  disabled={Loader || smartControllerLoader} // Disable button when saving
                />
              </View>
            )}
          </ScrollView>
        ) : (
          <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
            <Text>No Internet Connection</Text>
          </View>
        )
      }
    </View>
  );
};

export default RfidAddScreen;
