import React, { useState } from 'react';
import CustomDateTimePicker from '../../reuseableComponent/modal/CalendarWithTime';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import CustomTextInput from '../../reuseableComponent/customTextInput/CustomTextInput';
import WeighBridgeComponent from './WeighBridgeAddComponent';
import GenericModal from '../../reuseableComponent/modal/GenralModal';
import SwithWithLable from '../../reuseableComponent/switch/SwitchWithLable';
import { useSelector } from 'react-redux';
import { RootState, store } from '../../reducer/Store';
import { types } from '../../assets/constants/Constant';
import CustomButton from '../../reuseableComponent/customButton/CustomButton';
import colors from '../../assets/color/colors';
import fontSizes from '../../assets/fonts/FontSize';
import { weighBridgeAdd } from '../../reducer/weighBridge/WeighBridgeAction';
import WeighBridgeEffectHooks from './WeighBridgeEffectHooks';
import SequentialBouncingLoader from '../../reuseableComponent/loader/BallBouncingLoader';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


function WeighBridgeAddForm() {
    const { loader , displays , smartController , smartControllerLoader , weightParsers } = WeighBridgeEffectHooks()

    const [name, setName] = useState('');
    const [delay, setDelay] = useState('');
    const [minTagCount, setMinTagCount] = useState('');
    const [securityTagTimeOut, setSecurityTagTimeOut] = useState('');
    const [driverTagTimeOut, setDriverTagTimeOut] = useState('');
    const [platformReadyTicks, setPlatformReadyTicks] = useState();
    const [platformMaxWeight, setPlatformMaxWeight] = useState(0);
    const [platformMinWeight, setPlatformMinWeight] = useState();
    const [stableWeightTolerance, setStableWeightTolerance] = useState();
    const [stableWeightTicks, setStableWeightTicks] = useState();
    const [minVehicleWeight, setMinVehicleWeight] = useState(0);
    const [expiryDateValue, setExpiryDateValue] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [currentField, setCurrentField] = useState<string | null>(null);
    const [selectedSmartConnector, setSelectedSmartConnector] = useState<any>({ name: '', id: '' });
    const [selectedEvent, setSelectedEvent] = useState<any>({ name: '', id: '' });
    const [selectedWeightParser, setselectedWeightPars] = useState<any>({ name: '', id: '' });
    const GenericSpots = useSelector((state: RootState) => state.weighBridge.genericData);
    const readers = useSelector((state: RootState) => state.spotAddDetail.reader);

    // Direction A states
    const [validIdA, setValidIdA] = useState('');
    const [selectedDisplayA, setSelectedDisplayA] = useState<any>({ name: '', id: '' });
    const [selectedPrimaryReaderA, setSelectedPrimaryReaderA] = useState<any>({ name: '', id: '' });
    const [selectedSecondaryReaderA, setSelectedSecondaryReaderA] = useState<any>({ name: '', id: '' });

    // Direction B states
    const [validIdB, setValidIdB] = useState('');
    const [selectedDisplayB, setSelectedDisplayB] = useState<any>({ name: '', id: '' });
    const [selectedPrimaryReaderB, setSelectedPrimaryReaderB] = useState<any>({ name: '', id: '' });
    const [selectedSecondaryReaderB, setSelectedSecondaryReaderB] = useState<any>({ name: '', id: '' });
    const [selectedGenericSpotDirA, setSelectedGenericSpotDirA] = useState<any>({ name: '', id: '' });
    const [selectedGenericSpotDirB, setSelectedGenericSpotDirB] = useState<any>({ name: '', id: '' });

    const buCode = useSelector((state: RootState) => state.authentication.buCode);
    const baseUrls = useSelector((state: RootState) => state.authentication.baseUrl);
    const token = useSelector((state: RootState) => state.authentication.token);



    const [isDriverTagEnabled, setIsDriverTagEnabled] = useState(false);
    const toggleDriverTagSwitch = () => setIsDriverTagEnabled(prevState => !prevState);

    const [isSecurityTagEnabled, setIsSecurityTagEnabled] = useState(false);
    const toggleSecurityTagSwitch = () => setIsSecurityTagEnabled(prevState => !prevState);
    const [isCalendarVisible, setCalendarVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');

    const openCalendarModal = () => setCalendarVisible(true);
    const closeCalendarModal = () => setCalendarVisible(false);

    const handleDateSelect = (date: React.SetStateAction<string>, dateValue: any) => {
        console.log('date', date, dateValue)
        setExpiryDateValue(dateValue)
        setSelectedDate(date);
        closeCalendarModal();  // Close the modal after selecting the date
    };


    const handleOptionSelect = (selected: any) => {
        switch (currentField) {
            case 'smartController':
                setSelectedSmartConnector(selected);
                break;
            case 'events':
                setSelectedEvent(selected);
                break;
            case 'weightParsers':
                setselectedWeightPars(selected);
                break;
            case 'displayA':
                setSelectedDisplayA(selected);
                break;
            case 'primaryReaderA':
                setSelectedPrimaryReaderA(selected);
                break;
            case 'secondaryReaderA':
                setSelectedSecondaryReaderA(selected);
                break;
            case 'displayB':
                setSelectedDisplayB(selected);
                break;
            case 'primaryReaderB':
                setSelectedPrimaryReaderB(selected);
                break;
            case 'secondaryReaderB':
                setSelectedSecondaryReaderB(selected);
                break;
            case 'genericSpotA':
                setSelectedGenericSpotDirA(selected);
                break;
            case 'genericSpotB':
                setSelectedGenericSpotDirB(selected);
                break;


        }
        setModalVisible(false);
        setCurrentField(null);
    };


    // Function to handle input focus and show the modal with the correct options
    const handleFocus = (field: string) => {
        if (field) {
            setModalVisible(!modalVisible);
            setCurrentField(field);
        }
        else {
            console.log('filed', field)
            openCalendarModal()
        }
        if (currentField?.includes('display')) {
            return displays;
        } else if (currentField?.includes('Reader')) {
            return readers;
        }
        else if (currentField?.includes('genericSpot')) {
            return GenericSpots;
        }
    };
    
    // Get the options based on the currently focused field
    const getOptions = () => {
        if (currentField === 'display') {
            return displays;
        }
        else if (currentField === 'smartController') {
            return smartController;
        }
        else if (currentField === 'events') {
            return types;
        }
        else if (currentField === 'weightParsers') {
            return weightParsers;
        }
        else if (currentField?.includes('display')) {
            return displays;
        } else if (currentField?.includes('Reader')) {
            return readers;
        }
        else if (currentField?.includes('genericSpot')) {
            return GenericSpots;
        }
        return [];
    };
    const isFormValid = () => {
        return (
            name?.trim() !== '' &&
                delay?.trim() !== '' &&
                selectedEvent?.name?.trim() !== '' &&
                selectedSmartConnector?.name?.trim() !== '' &&
                selectedWeightParser?.name?.trim() !== '' &&
                platformReadyTicks !== '' &&
                platformMaxWeight !== null &&
                platformMinWeight !== null &&
                stableWeightTolerance !== null &&
                stableWeightTicks !== null &&
                minVehicleWeight !== null &&
                (
                    selectedEvent.id === 'UNIDIRECTIONAL_WEIGHBRIDGE' ||
                    selectedEvent.id === 'UNIDIRECTIONAL_WEIGHBRIDGE_3_READER' ||
                    selectedEvent.id === 'BIDIRECTIONAL_WEIGHBRIDGE'
                )
                ? selectedPrimaryReaderA?.name?.trim() !== ''
                : (
                    selectedEvent.id === 'BIDIRECTIONAL_WEIGHBRIDGE_NO_READER'
                        ? (
                            typeof selectedGenericSpotDirA === 'string' && selectedGenericSpotDirA.trim() !== '' &&
                            typeof selectedGenericSpotDirB === 'string' && selectedGenericSpotDirB.trim() !== ''
                        )
                        : selectedEvent.id === 'UNIDIRECTIONAL_WEIGHBRIDGE_NO_READER'
                            ? (
                                typeof selectedGenericSpotDirA === 'string' && selectedGenericSpotDirA.trim() !== ''
                            )
                            : selectedPrimaryReaderB?.name?.trim() !== ''
                )
        );
    };



    function handleUploadData() {
        if (platformMaxWeight > minVehicleWeight) {
            Alert.alert(
                'Warning',
                'Platform Max Weight is greater than Min Vehicle Weight',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed', minVehicleWeight, platformMaxWeight) }
                ],
                { cancelable: false }
            );
        }
        console.log('selectedEvent.id', selectedEvent.id);
        let typeSpecificFields = {};
        switch (selectedEvent.id) {
            case 'UNIDIRECTIONAL_WEIGHBRIDGE':
                typeSpecificFields = {
                    validDiDirA: validIdA,
                    primaryReaderIdDirA: selectedPrimaryReaderA.id,
                    displayIdDirA: selectedDisplayA.id,
                };
                break;

            case 'BIDIRECTIONAL_WEIGHBRIDGE':
                typeSpecificFields = {
                    primaryReaderIdDirB: selectedPrimaryReaderB.id,
                    validDiDirA: validIdA,
                    primaryReaderIdDirA: selectedPrimaryReaderA.id,
                    validDiDirB: validIdB,
                    displayIdDirA: selectedDisplayA.id,
                    displayIdDirB: selectedDisplayB.id,
                };
                break;
            case 'UNIDIRECTIONAL_WEIGHBRIDGE_3_READER':
                typeSpecificFields = {
                    validDiDirA: validIdA,
                    primaryReaderIdDirA: selectedPrimaryReaderA.id,
                    displayIdDirA: selectedDisplayA.id,

                };
                break;

            case 'UNIDIRECTIONAL_WEIGHBRIDGE_NO_READER':
                typeSpecificFields = {
                    validDiDirA: validIdA,
                    displayIdDirA: selectedDisplayA.id,
                };
                break;

            case 'BIDIRECTIONAL_WEIGHBRIDGE_NO_READER':
                typeSpecificFields = {
                    validDiDirA: validIdA,
                    validDiDirB: validIdB,
                    displayA: selectedDisplayA.id,
                    displayB: selectedDisplayB.id,
                };
                break;
        }
        const input = {
            active: false,
            buCode: buCode,
            delayAlertAfter: delay ? Number(delay) : null,
            driverTag: isDriverTagEnabled,
            expiryDate: expiryDateValue ? expiryDateValue : null,
            maxPlatformReadyWeight: Number(platformMaxWeight),
            minPlatformReadyWeight: Number(platformMinWeight),
            minVehicleWeight: Number(minVehicleWeight),
            name: name,
            securityTag: isSecurityTagEnabled,
            smartioId: selectedSmartConnector.id,
            stableWeightTolerance: stableWeightTolerance,
            tagCount: Number(minTagCount),
            ticksForPlatformReady: Number(platformReadyTicks),
            ticksForStableWeight: Number(stableWeightTicks),
            type: selectedEvent.id,
            weightParserId: selectedWeightParser.id,
            genericSpotDirA: selectedGenericSpotDirA.id || null,
            genericSpotDirB: selectedGenericSpotDirB.id || null,
        };
        const dataToUpload = {
            ...typeSpecificFields,
            ...input,

        };
        try {
            store.dispatch(weighBridgeAdd({
                baseUrls: baseUrls,
                weighData: dataToUpload,
                token: token,
                buCode: buCode,
            }));
        }
        catch (
        error
        ) {
            console.log(error);
        }

        console.log('firstScreenData to pass', dataToUpload);
    }
    if (loader) {
        <SequentialBouncingLoader />;
    }
    return (
        <GestureHandlerRootView>
            <ScrollView contentContainerStyle={{ backgroundColor: colors.white, flexGrow: 1 }}>
                {!smartControllerLoader ?
                    <View style={{ padding: 20, flexGrow: 1 }}>
                        <CustomDateTimePicker visible={isCalendarVisible} onClose={closeCalendarModal} onDateSelect={handleDateSelect} />

                        <CustomTextInput
                            label="Name"
                            value={name}
                            editable={true}
                            style={{ flex: 1 }}
                            errorMessage={undefined}
                            keyboardType="default"
                            returnKeyType="next" setTextInput={setName} required={true} />

                        <CustomTextInput
                            label="Delay alert after (milli Seconds)"
                            value={delay}
                            editable={true}
                            style={{ flex: 1 }}
                            errorMessage={undefined}
                            keyboardType="numeric"
                            returnKeyType="next" setTextInput={setDelay} required={true} />


                        <CustomTextInput
                            value={selectedEvent.name}
                            onPress={() => handleFocus('events')}
                            style={{ flex: 1 }}
                            errorMessage={undefined}
                            label={'Type'} disable={false}
                            editable={false} setTextInput={undefined} required={true} />

                        <CustomTextInput
                            value={selectedSmartConnector.name}
                            onPress={() => handleFocus('smartController')}
                            label={'Smart Controller'}
                            disable={false}
                            style={{ flex: 1 }}
                            editable={false}
                            setTextInput={undefined} required={true} />
                        <CustomTextInput
                            value={selectedWeightParser.name}
                            onPress={() => handleFocus('weightParsers')}
                            label={'Weight parser'}
                            disable={false}
                            style={{ flex: 1 }}
                            editable={false}
                            setTextInput={undefined} required={true} />
                        <WeighBridgeComponent platformReadyTicks={platformReadyTicks} setPlatformReadyTicks={setPlatformReadyTicks} platformMaxWeight={platformMaxWeight} setPlatformMaxWeight={setPlatformMaxWeight} platformMinWeight={platformMinWeight} setPlatformMinWeight={setPlatformMinWeight} stableWeightTolerance={stableWeightTolerance} setStableWeightTolerance={setStableWeightTolerance} stableWeightTicks={stableWeightTicks} setStableWeightTicks={setStableWeightTicks} minVehicleWeight={minVehicleWeight} setMinVehicleWeight={setMinVehicleWeight} minTagCount={minTagCount} setMinTagCount={setMinTagCount} />
                        <CustomTextInput
                            value={selectedDate}
                            onPress={() => handleFocus('')}
                            label={'Expiry Date'}
                            disable={false}
                            style={{ flex: 1 }}
                            editable={false}
                            iconName=""
                            setTextInput={undefined} required={false} />


                        {/* Modal for selecting options */}

                        {modalVisible && (
                            // Alert.alert("hello")
                            <View style={{ backgroundColor: 'pink', flex: 1 }}>
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

                        <SwithWithLable value={isDriverTagEnabled} onChangeValue={toggleDriverTagSwitch} lable={'Driver Tag'} />

                        {
                            isDriverTagEnabled &&
                            <CustomTextInput
                                label="Driver Tag TimeOut (In MilliSecound)"
                                value={driverTagTimeOut}
                                style={{ flex: 1 }}
                                editable={true}
                                errorMessage={undefined}
                                keyboardType="numeric" setTextInput={setDriverTagTimeOut} required={true} />

                        }
                        <SwithWithLable value={isSecurityTagEnabled} onChangeValue={toggleSecurityTagSwitch} lable={'Security Tag'} />
                        {
                            isSecurityTagEnabled &&
                            <CustomTextInput
                                label="Sequirty Tag TimeOut (InMilliSecound)"
                                value={securityTagTimeOut}
                                editable={true}
                                style={{ flex: 1 }}
                                errorMessage={undefined}
                                keyboardType="numeric" setTextInput={setSecurityTagTimeOut} required={true} />

                        }

                        {selectedEvent.id &&
                            <View style={{ flex: 1 }}>
                                {/* Direction A Inputs */}
                                <View>
                                    <Text style={styles.directionText}>Direction A</Text>

                                    <CustomTextInput
                                        value={selectedDisplayA.name}
                                        onPress={() => handleFocus('displayA')}
                                        label="Display"
                                        editable={false} setTextInput={undefined} required={false} />
                                    {selectedEvent.id === 'UNIDIRECTIONAL_WEIGHBRIDGE' || selectedEvent.id === 'UNIDIRECTIONAL_WEIGHBRIDGE_3_READER' || selectedEvent.id === 'BIDIRECTIONAL_WEIGHBRIDGE' ?
                                        (<View>
                                            <CustomTextInput
                                                value={selectedPrimaryReaderA.name}
                                                onPress={() => handleFocus('primaryReaderA')}
                                                errorMessage={undefined}
                                                label="Primary Reader"
                                                editable={false} setTextInput={undefined} required={true} />

                                            <CustomTextInput
                                                value={selectedSecondaryReaderA.name}
                                                onPress={() => handleFocus('secondaryReaderA')}
                                                label="Secondary Reader"
                                                editable={false} setTextInput={undefined} required={false} />
                                        </View>) :
                                        (<View>
                                            <CustomTextInput
                                                value={selectedGenericSpotDirA.name}
                                                onPress={() => handleFocus('genericSpotA')}
                                                errorMessage={undefined}
                                                label="Generic Spot"
                                                editable={false} setTextInput={undefined} required={true} />

                                        </View>
                                        )
                                    }

                                    <CustomTextInput
                                        label="Valid Id state"
                                        value={validIdA}
                                        editable={true}
                                        setTextInput={setValidIdA} required={false} />
                                </View>

                                {/* Direction B Inputs */}
                                {(selectedEvent.id === 'BIDIRECTIONAL_WEIGHBRIDGE' || selectedEvent.id === 'BIDIRECTIONAL_WEIGHBRIDGE_NO_READER')
                                    &&
                                    <View>
                                        <Text style={styles.directionText}>Direction B</Text>

                                        <CustomTextInput
                                            value={selectedDisplayB.name}
                                            onPress={() => handleFocus('displayB')}
                                            label="Display"
                                            editable={false}
                                            required={false} setTextInput={undefined} />

                                        {selectedEvent.id === 'UNIDIRECTIONAL_WEIGHBRIDGE' || selectedEvent.id === 'UNIDIRECTIONAL_WEIGHBRIDGE_3_READER' || selectedEvent.id === 'BIDIRECTIONAL_WEIGHBRIDGE' ? (
                                            <View>
                                                <CustomTextInput
                                                    value={selectedPrimaryReaderB.name}
                                                    onPress={() => handleFocus('primaryReaderB')}
                                                    label="Primary Reader"
                                                    editable={false}
                                                    required={true} setTextInput={undefined} />

                                                <CustomTextInput
                                                    value={selectedSecondaryReaderB.name}
                                                    onPress={() => handleFocus('secondaryReaderB')}
                                                    label="Secondary Reader"
                                                    editable={false}
                                                    required={false} setTextInput={undefined} />
                                            </View>
                                        ) : (
                                            <View>
                                                <CustomTextInput
                                                    value={selectedGenericSpotDirB.name}
                                                    onPress={() => handleFocus('genericSpotB')}
                                                    label="Generic Spot"
                                                    editable={false}
                                                    required={true} setTextInput={undefined} />
                                            </View>
                                        )}

                                        <CustomTextInput
                                            label="Valid Id state"
                                            value={validIdB}
                                            editable={true}
                                            setTextInput={setValidIdB}
                                            required={false}
                                        />
                                    </View>
                                }


                            </View>}

                        <View>
                            <CustomButton label={'save'}
                                onPress={handleUploadData}
                                disabled={isFormValid()}
                            />
                        </View>


                    </View> : <ActivityIndicator size={'large'} style={{ flex: 1 }} />
                }
            </ScrollView >
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    headerTitle: {
        color: colors.darkblack,
        fontSize: fontSizes.heading,
    },
    directionText: { color: colors.darkblack, paddingVertical: 10 }

})
export default WeighBridgeAddForm;

