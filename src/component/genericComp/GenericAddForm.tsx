import { View, ScrollView, StyleSheet, Text } from 'react-native';
import React from 'react';
import SequentialBouncingLoader from '../../reuseableComponent/loader/BallBouncingLoader';
import CustomTextInput from '../../reuseableComponent/customTextInput/CustomTextInput';
import colors from '../../assets/color/colors';
import GenericAddComponentDropDowns from './GenericAddComponentDropDowns';
import GenericModal from '../../reuseableComponent/modal/GenralModal';
import CustomButton from '../../reuseableComponent/customButton/CustomButton';
import GenericAddInputComponent from './GenericAddInputComponent';
import GenericAddFunction from '../../CustomHooks/genericHooks/GenericAddFunctions';
import SwitchWithLabel from '../../reuseableComponent/switch/SwitchWithLable';
import { useNetwork } from '../../contextApi/NetworkContex';
import { Colors2 } from '../../assets/color/Colors2';

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
  if (smartControllerLoader || displayLoader || readerLoader || loader) {
    return (
      <View style={styles.loaderContainer}>
        <SequentialBouncingLoader />
      </View>
    );
  }
  return (
    <>
      {isConnected ? (
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          style={styles.flexContainer}>
          {!smartControllerLoader ? (
            <View style={styles.contentContainer}>
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
                label="Driver Tag"
              />
              {isDriverTagEnabled && (
                <CustomTextInput
                  label="Driver Tag TimeOut (In MilliSecound)"
                  value={formData.driverTagTimeOut}
                  style={styles.flexContainer}
                  type="input"
                  editable={!isActiveEnabled || !id}
                  errorMessage={errors.driverTagTimeOut}
                  keyboardType="numeric"
                  setTextInput={(value: any) =>
                    handleInputChange('driverTagTimeOut', value)
                  }
                  required={true}
                />
              )}
              <SwitchWithLabel
                value={isSecurityTagEnabled}
                onChangeValue={toggleSecurityTagSwitch}
                label="Security Tag"
              />
              {isSecurityTagEnabled && (
                <CustomTextInput
                  label="Security Tag TimeOut (In milliSecound)"
                  value={formData.sequrityTagTimeOut}
                  editable={!isActiveEnabled || !id}
                  type="input"
                  style={styles.flexContainer}
                  errorMessage={errors.sequrityDelay}
                  keyboardType="numeric"
                  setTextInput={(value: any) =>
                    handleInputChange('sequrityTagTimeOut', value)
                  }
                  required={true}
                />
              )}
              <SwitchWithLabel
                value={isWeightBridgeEntryEnabled}
                onChangeValue={toggleWeightBridgeEntrySwitch}
                label="Weightbridge Entry"
              />
              {isWeightBridgeEntryEnabled && (
                <View>
                  <CustomTextInput
                    style={styles.flexContainer}
                    value={selectedWeighBridge.name}
                    onPress={() => handleFocus('weightbridge')}
                    errorMessage={errors.weighBridge}
                    label="WeighBridge"
                    type="dropdown"
                    setTextInput={undefined}
                    required={true}
                    editable={!isActiveEnabled || !id}
                  />
                  <CustomTextInput
                    style={styles.flexContainer}
                    value={selectedDirection.id}
                    onPress={() => handleFocus('direction')}
                    errorMessage={errors.direction}
                    label="WeighBridge Direction"
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
                nameKey="name"
                valueKey="id"
              />
              <View>
                <CustomButton
                  label={id ? 'update' : 'save'}
                  onPress={handleSaveData}
                  disabled={!!id && !!editButtonOpacity}
                />
              </View>
            </View>
          ) : (
            <View style={styles.loaderContainer}>
              <SequentialBouncingLoader />
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
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
  },
  scrollContainer: {
    backgroundColor: colors.white,
  },
  flexContainer: {
    flex: 1,
    color: Colors2.PrimaryTextColor
  },
  contentContainer: {
    padding: 20,
  },
});

export default GenericAddForm;
