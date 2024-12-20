import { View, ScrollView } from 'react-native';
import React from 'react';
import SequentialBouncingLoader from '../../reuseableComponent/loader/BallBouncingLoader';
import CustomTextInput from '../../reuseableComponent/customTextInput/CustomTextInput';
import GenericAddComponentDropDowns from './GenericAddComponentDropDowns';
import GenericModal from '../../reuseableComponent/modal/GenralModal';
import CustomButton from '../../reuseableComponent/customButton/CustomButton';
import GenericAddInputComponent from './GenericAddInputComponent';
import GenericAddFunction from '../../CustomHooks/genericHooks/GenericAddFunctions';
import SwitchWithLabel from '../../reuseableComponent/switch/SwitchWithLable';
import { useNetwork } from '../../contextApi/NetworkContex';
import { Lable, Strings } from '../../assets/constants/Lable';
import { NoInternetScreen } from '../../reuseableComponent/defaultScreen/NoInternetScreen';
import { ContainerStyles } from '../../styles/ContainerStyles';

function GenericAddForm(props: { id: any }) {
  const { id } = props;
  const { isConnected } = useNetwork();
  const {
    loader,
    smartControllerLoader,
    displayLoader,
    readerLoader,
    formData,
    selectedSmartConnector,
    selectedDisplay,
    selectedEvent,
    selectedPrimaryReader,
    selectedSecoundaryReader,
    errors,
    isActiveEnabled,
    isWeightBridgeEntryEnabled,
    isDriverTagEnabled,
    modalVisible,
    selectedDirection,
    selectedWeighBridge,
    isSecurityTagEnabled,
    toggleActiveSwitch,
    handleInputChange,
    setCurrentField,
    setModalVisible,
    handleSaveData,
    getOptions,
    handleOptionSelect,
    toggleSecurityTagSwitch,
    toggleDriverTagSwitch,
    toggleWeightBridgeEntrySwitch,
    handleFocus,
    editButtonOpacity,
    handleNameChange,
    handleDelayChange
  } = GenericAddFunction({ id });
  const { containerStyles } = ContainerStyles()
  if (smartControllerLoader || displayLoader || readerLoader || loader) {
    return (
      <View style={containerStyles.mainContainer}>
        <SequentialBouncingLoader />
      </View>
    );
  }
  return (
    <View style={containerStyles.mainContainer}>
      {isConnected ? (
        <ScrollView
          contentContainerStyle={containerStyles.scrollContainer}
        >
          {!smartControllerLoader ? (
            <View >
              <GenericAddInputComponent
                formData={formData}
                isActive={isActiveEnabled}
                onChangeValue={toggleActiveSwitch}
                handleInputChange={handleInputChange}
                errors={errors}
                id={id}
                handleNameChange={handleNameChange}
                handleDriverTagChange={handleDelayChange}
              />
              <View>
                <GenericAddComponentDropDowns
                  smartController={selectedSmartConnector.name}
                  display={selectedDisplay.name}
                  event={selectedEvent.name}
                  primaryReader={selectedPrimaryReader.name}
                  secoundryReader={selectedSecoundaryReader.name}
                  eventId={selectedEvent.id}
                  setCurrentField={setCurrentField}
                  setModalVisible={setModalVisible}
                  id={id}
                  isActive={isActiveEnabled}
                  error={errors}

                />
              </View>
              <SwitchWithLabel
                value={isDriverTagEnabled}
                onChangeValue={toggleDriverTagSwitch}
                label={Lable.DRIVER_TAG}
              />
              {isDriverTagEnabled && (
                <CustomTextInput
                  label={Lable.DRIVER_TAG_TIMEOUT}
                  value={formData.driverTagTimeOut}

                  type="input"
                  editable={!isActiveEnabled || !id}
                  errorMessage={errors.driverTagTimeOut}
                  keyboardType="numeric"
                  setTextInput={(value: any) =>
                    handleInputChange(Strings.DRIVER_TAG_TIMEOUT_s, value)
                  }
                  required={true}
                />
              )}
              <SwitchWithLabel
                value={isSecurityTagEnabled}
                onChangeValue={toggleSecurityTagSwitch}
                label={Strings.SEQURITY_TAG}
              />
              {isSecurityTagEnabled && (
                <CustomTextInput
                  label={Strings.SEQURITY_TAG_TIMEOUT}
                  value={formData.sequrityTagTimeOut}
                  editable={!isActiveEnabled || !id}
                  type="input"

                  errorMessage={errors.sequrityDelay}
                  keyboardType="numeric"
                  setTextInput={(value: any) =>
                    handleInputChange(Strings.SEQURITY_TAG_TIMEOUT_s, value)
                  }
                  required={true}
                />
              )}
              <SwitchWithLabel
                value={isWeightBridgeEntryEnabled}
                onChangeValue={toggleWeightBridgeEntrySwitch}
                label={Strings.WEIGHBRIDGE_ENTRY}
              />
              {isWeightBridgeEntryEnabled && (
                <View>
                  <CustomTextInput

                    value={selectedWeighBridge.name}
                    onPress={() => handleFocus(Strings.WEIGHBRIDGE_s)}
                    errorMessage={errors.weighBridge}
                    label={Strings.WEIGHBRIDGE}
                    type="dropdown"
                    setTextInput={undefined}
                    required={true}
                    editable={!isActiveEnabled || !id}
                  />
                  <CustomTextInput

                    value={selectedDirection.id}
                    onPress={() => handleFocus(Strings.DIRECTION_s)}
                    errorMessage={errors.direction}
                    label={Strings.WEIGHBRIDE_DIRECTION}
                    disable={false}
                    setTextInput={undefined}
                    required={true}
                    type='dropdown'
                    editable={!isActiveEnabled || !id}
                  />
                </View>
              )}
              <GenericModal
                options={getOptions()}
                isVisible={modalVisible}
                handleCloseModal={() => setModalVisible(false)}
                onOptionSelected={handleOptionSelect}
                nameKey={Strings.NAME_s}
                valueKey={Strings.ID}
              />
              <View>
                <CustomButton
                  label={id ? Lable.UPDATE : Lable.SAVE}
                  onPress={handleSaveData}
                  disabled={!!id && !!editButtonOpacity}
                />
              </View>
            </View>
          ) : (
            <View style={containerStyles.mainContainer}>
              <SequentialBouncingLoader />
            </View>
          )}
        </ScrollView>
      ) : (
        <NoInternetScreen />
      )}
    </View>
  );
}
export default GenericAddForm;
