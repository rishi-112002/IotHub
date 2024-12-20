import React from 'react';
import CustomDateTimePicker from '../../reuseableComponent/modal/CalendarWithTime';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import CustomTextInput from '../../reuseableComponent/customTextInput/CustomTextInput';
import GenericModal from '../../reuseableComponent/modal/GenralModal';
import CustomButton from '../../reuseableComponent/customButton/CustomButton';
import colors from '../../assets/color/colors';
import fontSizes from '../../assets/fonts/FontSize';
import SequentialBouncingLoader from '../../reuseableComponent/loader/BallBouncingLoader';
import WeighBridgeFunction from '../../CustomHooks/weighBridgeHooks/weighBridgeFunctions';
import SwitchWithLabel from '../../reuseableComponent/switch/SwitchWithLable';
import WeighBridgeComponent from './WeighBridgeAddComponent';
import { useNetwork } from '../../contextApi/NetworkContex';
import { Lable, Strings } from '../../assets/constants/Lable';
import { NoInternetScreen } from '../../reuseableComponent/defaultScreen/NoInternetScreen';
import { ComponentStyles } from '../../styles/ComponentStyles';
import { ContainerStyles } from '../../styles/ContainerStyles';
import { TextStyles } from '../../styles/TextStyles';

function WeighBridgeAddForm(props: { id: any }) {
  const { id } = props;
  const { isConnected } = useNetwork();

  const {
    name,
    setName,
    delay,
    setDelay,
    minTagCount,
    setMinTagCount,
    handleUploadData,
    loader,
    smartControllerLoader,
    getOptions,
    handleFocus,
    toggleDriverTagSwitch,
    handleDateSelect,
    handleOptionSelect,
    toggleSecurityTagSwitch,
    isCalendarVisible,
    selectedDate,
    securityTagTimeOut,
    setSecurityTagTimeOut,
    selectedSecondaryReaderB,
    selectedSecondaryReaderA,
    validIdA,
    setValidIdB,
    setValidIdA,
    validIdB,
    driverTagTimeOut,
    setDriverTagTimeOut,
    setPlatformReadyTicks,
    setPlatformMaxWeight,
    setPlatformMinWeight,
    setStableWeightTolerance,
    setStableWeightTicks,
    setMinVehicleWeight,
    closeCalendarModal,
    selectedEvent,
    selectedSmartConnector,
    selectedWeightParser,
    platformReadyTicks,
    minVehicleWeight,
    platformMaxWeight,
    platformMinWeight,
    stableWeightTolerance,
    stableWeightTicks,
    isDriverTagEnabled,
    isSecurityTagEnabled,
    modalVisible,
    setModalVisible,
    selectedDisplayA,
    selectedPrimaryReaderA,
    selectedGenericSpotDirA,
    selectedDisplayB,
    selectedPrimaryReaderB,
    selectedGenericSpotDirB,
    errors,
  } = WeighBridgeFunction({ id: id });
  const { styles } = ComponentStyles();
  const { containerStyles } = ContainerStyles();
  const { textStyles } = TextStyles();

  if (loader) {
    <View style={containerStyles.mainContainer}>
      <SequentialBouncingLoader />;
    </View>;
  }
  return (
    <View style={containerStyles.mainContainer}>
      {isConnected ? (
        <View style={containerStyles.mainContainer}>
          <ScrollView contentContainerStyle={containerStyles.scrollContainer}>
            {!smartControllerLoader ? (
              <View style={containerStyles.container}>
                <CustomDateTimePicker
                  visible={isCalendarVisible}
                  onClose={closeCalendarModal}
                  onDateSelect={handleDateSelect}
                />
                <CustomTextInput
                  label={Strings.NAME_S}
                  value={name}
                  editable={true}
                  errorMessage={errors.name}
                  keyboardType="default"
                  returnKeyType="next"
                  setTextInput={setName}
                  required={true}
                />
                <CustomTextInput
                  label={Strings.DELAY_ALERT_AFTER}
                  value={delay}
                  editable={true}
                  type="input"
                  errorMessage={errors.delay}
                  keyboardType="numeric"
                  returnKeyType="next"
                  setTextInput={setDelay}
                  required={true}
                />

                <CustomTextInput
                  value={selectedEvent.name}
                  onPress={() => handleFocus(Strings.EVENTS_S)}
                  errorMessage={errors.event}
                  label={Strings.TYPE}
                  disable={false}
                  type="dropdown"
                  editable={false}
                  setTextInput={undefined}
                  required={true}
                />

                <CustomTextInput
                  value={selectedSmartConnector.name}
                  onPress={() => handleFocus(Strings.SMART_CONTROLLER_S)}
                  label={Strings.SMART_CONTROLLER}
                  disable={false}
                  type="dropdown"
                  editable={false}
                  errorMessage={errors.selectedSmartConnector}
                  required={true}
                  setTextInput={undefined}
                />
                <CustomTextInput
                  value={selectedWeightParser.name}
                  onPress={() => handleFocus(Strings.WEIGHT_PARSER_s)}
                  label={Strings.WEIGHT_PARSER}
                  disable={false}
                  type="dropdown"
                  editable={false}
                  errorMessage={errors.selectedWeightParser}
                  required={true}
                  setTextInput={undefined}
                />
                <WeighBridgeComponent
                  error={errors}
                  platformReadyTicks={platformReadyTicks}
                  setPlatformReadyTicks={setPlatformReadyTicks}
                  platformMaxWeight={platformMaxWeight}
                  setPlatformMaxWeight={setPlatformMaxWeight}
                  platformMinWeight={platformMinWeight}
                  setPlatformMinWeight={setPlatformMinWeight}
                  stableWeightTolerance={stableWeightTolerance}
                  setStableWeightTolerance={setStableWeightTolerance}
                  stableWeightTicks={stableWeightTicks}
                  setStableWeightTicks={setStableWeightTicks}
                  minVehicleWeight={minVehicleWeight}
                  setMinVehicleWeight={setMinVehicleWeight}
                  minTagCount={minTagCount}
                  setMinTagCount={setMinTagCount}
                />
                <CustomTextInput
                  value={selectedDate}
                  onPress={() => handleFocus('')}
                  label={Strings.EXPIRY_DATE}
                  disable={false}
                  editable={false}
                  type="dropdown"
                  iconName=""
                  errorMessage={errors.selectedDate}
                  required={false}
                  setTextInput={undefined}
                />

                {/* Modal for selecting options */}

                {modalVisible && (
                  <View >
                    <GenericModal
                      options={getOptions()}
                      isVisible={modalVisible}
                      handleCloseModal={() => setModalVisible(false)}
                      onOptionSelected={handleOptionSelect}
                      nameKey={Strings.NAME_s}
                      valueKey={Strings.ID}
                    />
                  </View>
                )}

                <SwitchWithLabel
                  value={isDriverTagEnabled}
                  onChangeValue={toggleDriverTagSwitch}
                  label={Strings.DRIVER_TAG}
                />

                {isDriverTagEnabled && (
                  <CustomTextInput
                    label={Strings.DRIVER_TAG_TIMEOUT}
                    value={driverTagTimeOut}
                    editable={true}
                    errorMessage={errors.driverTagTimeOut}
                    keyboardType="numeric"
                    setTextInput={setDriverTagTimeOut}
                    required={true}
                    type="input"
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
                    value={securityTagTimeOut}
                    editable={true}
                    errorMessage={errors.sequrityDelay}
                    keyboardType="numeric"
                    setTextInput={setSecurityTagTimeOut}
                    required={true}
                    type="input"
                  />
                )}

                {selectedEvent.id && (
                  <View style={containerStyles.mainContainer}>
                    {/* Direction A Inputs */}
                    <View>
                      <Text style={[textStyles.sectionTitle, { paddingVertical: 10 }]}>{Strings.DIRECTION_S}{Strings.A}</Text>

                      <CustomTextInput
                        value={selectedDisplayA.name}
                        onPress={() => handleFocus(Strings.DISPLAY_A)}
                        label={Strings.DISPLAY}
                        editable={false}
                        type="dropdown"
                        setTextInput={errors.selectedDisplayA}
                        required={false}


                      />
                      {selectedEvent.id === Strings.UNIDIRECTIONAL_WEIGHBRIDGE ||
                        selectedEvent.id ===
                        Strings.UNIDIRECTIONAL_WEIGHBRIDGE_3_READER ||
                        selectedEvent.id === Strings.BIDIRECTIONAL_WEIGHBRIDGE ? (
                        <View>
                          <CustomTextInput
                            value={selectedPrimaryReaderA.name}
                            onPress={() => handleFocus(Strings.PRIMARY_READER_A)}
                            errorMessage={errors.selectedPrimaryReaderA}
                            label={Strings.PRIMARY_READERS}
                            editable={false}
                            type="dropdown"
                            setTextInput={undefined}
                            required={true}
                          />

                          <CustomTextInput
                            value={selectedSecondaryReaderA.name}
                            onPress={() => handleFocus(Strings.SECOUNDARY_READER_A)}
                            label={Strings.SECOUNDARY_READERS}
                            editable={false}
                            type="dropdown"
                            setTextInput={undefined}
                            required={false}
                          />
                        </View>
                      ) : (
                        <View>
                          <CustomTextInput
                            value={selectedGenericSpotDirA.name}
                            onPress={() => handleFocus(Strings.GENERIC_SPOT_A)}
                            errorMessage={errors.selectedGenericSpotDirA}
                            label={Strings.GENERIC_HEADER}
                            type="dropdown"
                            editable={false}
                            setTextInput={undefined}
                            required={true}
                          />
                        </View>
                      )}

                      <CustomTextInput
                        label={Strings.VALID_ID_STATE}
                        value={validIdA}
                        editable={true}
                        type="input"
                        setTextInput={setValidIdA}
                        required={false}
                      />
                    </View>

                    {/* Direction B Inputs */}
                    {(selectedEvent.id === Strings.BIDIRECTIONAL_WEIGHBRIDGE ||
                      selectedEvent.id ===
                      Strings.BIDIRECTIONAL_WEIGHBRIDGE_NO_READER) && (
                        <View>
                          <Text style={textStyles.sectionTitle}>{Strings.DIRECTION_S}{Strings.B}</Text>

                          <CustomTextInput
                            value={selectedDisplayB.name}
                            onPress={() => handleFocus(Strings.DISPLAYB)}
                            label={Strings.DISPLAY}
                            editable={false}
                            required={false}
                            type="dropdown"
                            setTextInput={undefined}
                          />

                          {selectedEvent.id === Strings.UNIDIRECTIONAL_WEIGHBRIDGE ||
                            selectedEvent.id ===
                            Strings.UNIDIRECTIONAL_WEIGHBRIDGE_3_READER ||
                            selectedEvent.id === Strings.BIDIRECTIONAL_WEIGHBRIDGE ? (
                            <View>
                              <CustomTextInput
                                value={selectedPrimaryReaderB.name}
                                onPress={() => handleFocus(Strings.PRIMARY_READERS_B)}
                                label={Strings.PRIMARY_READERS}
                                editable={false}
                                required={true}
                                type="dropdown"
                                setTextInput={undefined}
                                errorMessage={errors.selectedPrimaryReaderB}
                              />

                              <CustomTextInput
                                value={selectedSecondaryReaderB.name}
                                onPress={() => handleFocus(Strings.SECOUNDARY_READERS_B)}
                                label={Strings.SECOUNDARY_READERS}
                                editable={false}
                                type="dropdown"
                                required={false}
                                setTextInput={undefined}
                              />
                            </View>
                          ) : (
                            <View>
                              <CustomTextInput
                                value={selectedGenericSpotDirB.name}
                                onPress={() => handleFocus(Strings.GENERIC_SPOT_B)}
                                label={Strings.GENERIC_HEADER}
                                editable={false}
                                type="dropdown"
                                required={true}
                                setTextInput={undefined}


                                errorMessage={errors.selectedGenericSpotDirB}
                              />
                            </View>
                          )}

                          <CustomTextInput
                            label={Strings.VALID_ID_STATE}
                            value={validIdB}
                            type="input"
                            editable={true}
                            setTextInput={setValidIdB}
                            required={false}

                          />
                        </View>
                      )}
                  </View>
                )}

                <View>
                  <CustomButton
                    label={id ? Lable.UPDATE : Lable.SAVE}
                    onPress={handleUploadData}
                  />
                </View>
              </View>
            ) : (
              <View
                style={containerStyles.mainContainer}>
                <SequentialBouncingLoader />
              </View>
            )}
          </ScrollView>
        </View>
      ) : (
        <NoInternetScreen />
      )}
    </View>
  );
}
export default WeighBridgeAddForm;
