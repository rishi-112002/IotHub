/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, ScrollView } from 'react-native';
import colors from '../../assets/color/colors';
import CustomButton from '../../reuseableComponent/customButton/CustomButton';
import CustomTextInput from '../../reuseableComponent/customTextInput/CustomTextInput';
import GenericModal from '../../reuseableComponent/modal/GenralModal';
import { useRfidAddForm } from '../../CustomHooks/RFIDHooks/RFIDAddHook';
import { useNetwork } from '../../contextApi/NetworkContex';
import SequentialBouncingLoader from '../../reuseableComponent/loader/BallBouncingLoader';
import { Lable, Strings } from '../../assets/constants/Lable';
import { NoInternetScreen } from '../../reuseableComponent/defaultScreen/NoInternetScreen';

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
                label={Strings.NAME_s}
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
                  label={Lable.MODEL_NUMBER}
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
                  nameKey={Strings.NAME_S}
                  valueKey={Strings.VALUE}

                />
              )}

              {/* IP Address And Port Input */}
              {(modal !== 'FX9600' && modal !== null) && (
                <View>

                  <CustomTextInput
                    label={Lable.IP_ADDRESS}
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
                    label={Lable.PORT_NUMBER}
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
                label={Lable.SAVE}
                onPress={handleSaveData}
                disabled={Loader} // Disable button when saving
              />
            </View>
          )}
        </ScrollView>
      ) : (
        <NoInternetScreen />
      )}
    </>
  );
};

export default RfidAddScreen;
