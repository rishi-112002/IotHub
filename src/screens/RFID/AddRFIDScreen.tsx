/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import colors from '../../assets/color/colors';
import CustomButton from '../../reuseableComponent/customButton/CustomButton';
import CustomTextInput from '../../reuseableComponent/customTextInput/CustomTextInput';
import GenericModal from '../../reuseableComponent/modal/GenralModal';
import { useRfidAddForm } from '../../CustomHooks/RFIDHooks/RFIDAddHook';
import { useNetwork } from '../../contextApi/NetworkContex';
import SequentialBouncingLoader from '../../reuseableComponent/loader/BallBouncingLoader';

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

  console.log("modal name ", modal)
  return (
    <>
      {isConnected ? (
        <ScrollView
          contentContainerStyle={{ backgroundColor: colors.white, flex: 1 }}>
          {Loader ? (
            // <ActivityIndicator size="large" />
            <SequentialBouncingLoader />
          ) : (
            <View style={{ padding: 20 }}>
              {/* Name Input */}
              <CustomTextInput
                label="Name"
                value={name}
                errorMessage={errors.name}
                keyboardType="default"
                returnKeyType="next"
                setTextInput={setName}
                onFocus={() => handleInputFocus('name')}
                required={true}
                style={{ flex: 1 }}
              />

              {/* Model Number Input */}
              <View style={{ position: 'relative' }}>
                <CustomTextInput
                  label="Model Number"
                  value={modal || ''}
                  editable={false}
                  errorMessage={errors.modal}
                  setTextInput={setModal}
                  onPress={() => setDropdownVisible(true)}
                  required={true}
                  type="dropdown"
                  style={{ flex: 1 }}

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
              {(modal !== 'FX9600' && modal !== null) && (
                <View>

                  <CustomTextInput
                    label="IP Address"
                    value={IPAddress}
                    errorMessage={errors.IPAddress}
                    keyboardType="default"
                    returnKeyType="next"
                    setTextInput={setIPAddress}
                    onFocus={() => handleInputFocus('IPAddress')}
                    required={false}
                    style={{ flex: 1 }}

                  />
                  <CustomTextInput
                    label="Port Number"
                    value={port}
                    errorMessage={errors.port}
                    keyboardType="numeric"
                    setTextInput={setPort}
                    onFocus={() => handleInputFocus('port')}
                    required={false}
                    style={{ flex: 1 }}

                  />
                </View>

              )}

              {/* Save Button */}
              <CustomButton
                label="Save"
                onPress={handleSaveData}
                disabled={Loader} // Disable button when saving
              />
            </View>
          )}
        </ScrollView>
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
          <Text>No Internet Connection</Text>
        </View>
      )}
    </>
  );
};

export default RfidAddScreen;