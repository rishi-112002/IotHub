import React from 'react';
import CustomDateTimePicker from '../../reuseableComponent/modal/CalendarWithTime';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import CustomTextInput from '../../reuseableComponent/customTextInput/CustomTextInput';
import GenericModal from '../../reuseableComponent/modal/GenralModal';
import CustomButton from '../../reuseableComponent/customButton/CustomButton';
import colors from '../../assets/color/colors';
import fontSizes from '../../assets/fonts/FontSize';
import SequentialBouncingLoader from '../../reuseableComponent/loader/BallBouncingLoader';
import WeighBridgeFunction from '../../CustomHooks/weighBridgeHooks/weighBridgeFunctions';
import SwitchWithLabel from '../../reuseableComponent/switch/SwitchWithLable';
import WeighBridgeComponent from './WeighBridgeAddComponent';
import {useNetwork} from '../../contextApi/NetworkContex';

function WeighBridgeAddForm(props: {id: any}) {
  const {id} = props;
  const {isConnected} = useNetwork();

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
  } = WeighBridgeFunction({id: id});

  if (loader) {
    <View style={{flex: 1}}>
      <SequentialBouncingLoader />;
    </View>;
  }
  return (
    <>
      {isConnected ? (
        <View style={{flex: 1}}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {!smartControllerLoader ? (
              <View style={styles.container}>
                <CustomDateTimePicker
                  visible={isCalendarVisible}
                  onClose={closeCalendarModal}
                  onDateSelect={handleDateSelect}
                />

                <CustomTextInput
                  label="Name"
                  value={name}
                  editable={true}
                  style={styles.flexInput}
                  errorMessage={errors.name}
                  keyboardType="default"
                  returnKeyType="next"
                  setTextInput={setName}
                  required={true}
                />

                <CustomTextInput
                  label="Delay alert after (millisecond)"
                  value={delay}
                  editable={true}
                  type="input"
                  style={styles.flexInput}
                  errorMessage={errors.delay}
                  keyboardType="numeric"
                  returnKeyType="next"
                  setTextInput={setDelay}
                  required={true}
                />

                <CustomTextInput
                  value={selectedEvent.name}
                  onPress={() => handleFocus('events')}
                  style={styles.flexInput}
                  errorMessage={errors.event}
                  label={'Type'}
                  disable={false}
                  type="dropdown"
                  editable={false}
                  setTextInput={undefined}
                  required={true}
                />

                <CustomTextInput
                  value={selectedSmartConnector.name}
                  onPress={() => handleFocus('smartController')}
                  label={'Smart Controller'}
                  disable={false}
                  style={styles.flexInput}
                  type="dropdown"
                  editable={false}
                  errorMessage={errors.selectedSmartConnector}
                  required={true}
                  setTextInput={undefined}
                />
                <CustomTextInput
                  value={selectedWeightParser.name}
                  onPress={() => handleFocus('weightParsers')}
                  label={'Weight parser'}
                  disable={false}
                  type="dropdown"
                  style={styles.flexInput}
                  editable={false}
                  errorMessage={errors.selectedWeightParser}
                  required={true}
                  setTextInput={undefined}
                />
                <WeighBridgeComponent
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
                  label={'Expiry Date'}
                  disable={false}
                  style={styles.flexInput}
                  editable={false}
                  type="dropdown"
                  iconName=""
                  errorMessage={errors.selectedDate}
                  required={false}
                  setTextInput={undefined}
                />

                {/* Modal for selecting options */}

                {modalVisible && (
                  // Alert.alert("hello")
                  <View style={styles.flexInput}>
                    <GenericModal
                      options={getOptions()}
                      isVisible={modalVisible}
                      handleCloseModal={() => setModalVisible(false)}
                      onOptionSelected={handleOptionSelect}
                      nameKey="name"
                      valueKey="id"
                    />
                  </View>
                )}

                <SwitchWithLabel
                  value={isDriverTagEnabled}
                  onChangeValue={toggleDriverTagSwitch}
                  label={'Driver Tag'}
                />

                {isDriverTagEnabled && (
                  <CustomTextInput
                    label="Driver Tag TimeOut (In millisecond)"
                    value={driverTagTimeOut}
                    style={styles.flexInput}
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
                  label={'Security Tag'}
                />
                {isSecurityTagEnabled && (
                  <CustomTextInput
                    label="Security Tag TimeOut (millisecond)"
                    value={securityTagTimeOut}
                    editable={true}
                    style={styles.flexInput}
                    errorMessage={errors.securityTagTimeOut}
                    keyboardType="numeric"
                    setTextInput={setSecurityTagTimeOut}
                    required={true}
                    type="input"
                  />
                )}

                {selectedEvent.id && (
                  <View style={styles.flexInput}>
                    {/* Direction A Inputs */}
                    <View>
                      <Text style={styles.directionText}>Direction A</Text>

                      <CustomTextInput
                        value={selectedDisplayA.name}
                        onPress={() => handleFocus('displayA')}
                        label="Display"
                        editable={false}
                        type="dropdown"
                        setTextInput={errors.selectedDisplayA}
                        required={false}
                      />
                      {selectedEvent.id === 'UNIDIRECTIONAL_WEIGHBRIDGE' ||
                      selectedEvent.id ===
                        'UNIDIRECTIONAL_WEIGHBRIDGE_3_READER' ||
                      selectedEvent.id === 'BIDIRECTIONAL_WEIGHBRIDGE' ? (
                        <View>
                          <CustomTextInput
                            value={selectedPrimaryReaderA.name}
                            onPress={() => handleFocus('primaryReaderA')}
                            errorMessage={errors.selectedPrimaryReaderA}
                            label="Primary Reader"
                            editable={false}
                            type="dropdown"
                            setTextInput={undefined}
                            required={true}
                          />

                          <CustomTextInput
                            value={selectedSecondaryReaderA.name}
                            onPress={() => handleFocus('secondaryReaderA')}
                            label="Secondary Reader"
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
                            onPress={() => handleFocus('genericSpotA')}
                            errorMessage={errors.selectedGenericSpotDirA}
                            label="Generic Spot"
                            type="dropdown"
                            editable={false}
                            setTextInput={undefined}
                            required={true}
                          />
                        </View>
                      )}

                      <CustomTextInput
                        label="Valid Id state"
                        value={validIdA}
                        editable={true}
                        type="input"
                        setTextInput={setValidIdA}
                        required={false}
                      />
                    </View>

                    {/* Direction B Inputs */}
                    {(selectedEvent.id === 'BIDIRECTIONAL_WEIGHBRIDGE' ||
                      selectedEvent.id ===
                        'BIDIRECTIONAL_WEIGHBRIDGE_NO_READER') && (
                      <View>
                        <Text style={styles.directionText}>Direction B</Text>

                        <CustomTextInput
                          value={selectedDisplayB.name}
                          onPress={() => handleFocus('displayB')}
                          label="Display"
                          editable={false}
                          required={false}
                          type="dropdown"
                          setTextInput={undefined}
                        />

                        {selectedEvent.id === 'UNIDIRECTIONAL_WEIGHBRIDGE' ||
                        selectedEvent.id ===
                          'UNIDIRECTIONAL_WEIGHBRIDGE_3_READER' ||
                        selectedEvent.id === 'BIDIRECTIONAL_WEIGHBRIDGE' ? (
                          <View>
                            <CustomTextInput
                              value={selectedPrimaryReaderB.name}
                              onPress={() => handleFocus('primaryReaderB')}
                              label="Primary Reader"
                              editable={false}
                              required={true}
                              type="dropdown"
                              setTextInput={undefined}
                              errorMessage={errors.selectedPrimaryReaderB}
                            />

                            <CustomTextInput
                              value={selectedSecondaryReaderB.name}
                              onPress={() => handleFocus('secondaryReaderB')}
                              label="Secondary Reader"
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
                              onPress={() => handleFocus('genericSpotB')}
                              label="Generic Spot"
                              editable={false}
                              type="dropdown"
                              required={true}
                              setTextInput={undefined}
                              errorMessage={errors.selectedGenericSpotDirB}
                            />
                          </View>
                        )}

                        <CustomTextInput
                          label="Valid Id state"
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
                    label={id ? 'update' : 'save'}
                    onPress={handleUploadData}
                  />
                </View>
              </View>
            ) : (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: '90%',
                }}>
                <SequentialBouncingLoader />
              </View>
            )}
          </ScrollView>
        </View>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignSelf: 'center'}}>
          <Text>No Internet Connection</Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    color: colors.darkblack,
    fontSize: fontSizes.heading,
  },
  directionText: {color: colors.darkblack, paddingVertical: 10},
  scrollContainer: {
    backgroundColor: colors.white,
    flexGrow: 1,
    // flex:1,
  },
  container: {
    padding: 20,
    flexGrow: 1,
  },
  flexInput: {
    flex: 1,
  },
  modalContainer: {
    backgroundColor: 'pink',
    flex: 1,
  },
  buttonContainer: {
    marginTop: 20,
  },
  loader: {
    flex: 1,
  },
});
export default WeighBridgeAddForm;
