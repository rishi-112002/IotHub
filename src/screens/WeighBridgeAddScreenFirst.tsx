import { View, ActivityIndicator, ScrollView, Alert, Text } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import colors from "../assets/color/colors";
import GenericModal from "../reuseableComponent/modal/GenralModal";
import { RootState, store } from "../reducer/Store";
import { GetDisplays, GetReader, GetSmartControllers, GetWeightBridge, GetWeightParsers } from "../reducer/spotAddDetails/SpotAddDetailsAction";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../reuseableComponent/customButton/CustomButton";
import SwithWithLable from "../reuseableComponent/switch/SwitchWithLable";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import CustomTextInput from "../reuseableComponent/customTextInput/CustomTextInput";
import { StyleSheet } from "react-native";
import fontSizes from "../assets/fonts/FontSize";
import { AppNavigationParams } from "../navigation/NavigationStackList";
import CustomDateTimePicker from "../reuseableComponent/modal/CalendarWithTime";

function WeighbridgesAddScreen() {
    const [name, setName] = useState("");
    const [delay, setDelay] = useState("");
    const [sequrityTagTimeOut, setSequrityTagTimeOut] = useState("");
    const [driverTagTimeOut, setDriverTagTimeOut] = useState("");
    const [minTagCount, setMinTagCount] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [loader, setLoader] = useState(false);
    const navigation = useNavigation<NavigationProp<AppNavigationParams>>();
    const uploadError = useSelector((state: RootState) => state.uploadGeneric.error);
    const status = useSelector((state: RootState) => state.uploadGeneric.status);
    const dispatch = useDispatch();
    const baseUrls = useSelector((state: RootState) => state.authentication.baseUrl);
    const smartController = useSelector((state: RootState) => state.spotAddDetail.smartController);
    const displays = useSelector((state: RootState) => state.spotAddDetail.display);
    const weightParsers = useSelector((state: RootState) => state.spotAddDetail.weightParsers);
    const smartControllerLoader = useSelector((state: RootState) => state.spotAddDetail.smartControllerLoader);
    const [currentField, setCurrentField] = useState<string | null>(null);
    const [selectedSmartConnector, setSelectedSmartConnector] = useState<any>({ name: '', id: '' });
    const [selectedEvent, setSelectedEvent] = useState<any>({ name: '', id: '' });
    const [selectedWeightParser, setselectedWeightPars] = useState<any>({ name: "", id: "" });
    const [platformReadyTicks, setPlatformReadyTicks] = useState();
    const [platformMaxWeight, setPlatformMaxWeight] = useState();
    const [platformMinWeight, setPlatformMinWeight] = useState();
    const [stableWeightTolerance, setStableWeightTolerance] = useState();
    const [stableWeightTicks, setStableWeightTicks] = useState();
    const [minVehicleWeight, setMinVehicleWeight] = useState();
    const [expiryDateValue, setExpiryDateValue] = useState("");

    const buCode = useSelector((state: RootState) => state.authentication.buCode);
    const events = [

        { name: "Unidirectional", id: 'UNIDIRECTIONAL_WEIGHBRIDGE' },
        { name: "Bidirectional3R", id: 'BIDIRECTIONAL_WEIGHBRIDGE_3_READER' },
        { name: "Bidirectional", id: 'BIDIRECTIONAL_WEIGHBRIDGE' },
        { name: "BidirectionalNR", id: 'BIDIRECTIONAL_WEIGHBRIDGE_NO_READER' },
        { name: "UnidirectionalNR", id: 'UNIDIRECTIONAL_WEIGHBRIDGE_NO_READER' },

    ]


    const [isDriverTagEnabled, setIsDriverTagEnabled] = useState(false);
    const toggleDriverTagSwitch = () => setIsDriverTagEnabled(prevState => !prevState);

    const [isSecurityTagEnabled, setIsSecurityTagEnabled] = useState(false);
    const toggleSecurityTagSwitch = () => setIsSecurityTagEnabled(prevState => !prevState);
    const [isCalendarVisible, setCalendarVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');

    const openCalendarModal = () => setCalendarVisible(true);
    const closeCalendarModal = () => setCalendarVisible(false);

    const handleDateSelect = (date: React.SetStateAction<string>, dateValue: any) => {
        console.log("date", date, dateValue)
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
            console.log("filed", field)
            openCalendarModal()
        }
    };

    // Get the options based on the currently focused field
    const getOptions = () => {
        if (currentField === 'display') {
            return displays;
        }
        else if (currentField === "smartController") {
            return smartController
        }
        else if (currentField === "events") {
            return events
        }
        else if (currentField === "weightParsers") {
            return weightParsers
        }
        return [];
    };
    console.log("weightParsers", weightParsers)

    useEffect(() => {
        store.dispatch(GetReader({ baseUrl: baseUrls }))
        store.dispatch(GetDisplays({ baseUrl: baseUrls }))
        store.dispatch(GetSmartControllers({ baseUrl: baseUrls }))
        store.dispatch(GetWeightBridge({ baseUrl: baseUrls }))
        store.dispatch(GetWeightParsers({ baseUrl: baseUrls }))
    }, [])
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <View>
                    <Text style={styles.headerTitle}> Add Weighbridge</Text>
                </View>
            ),
            headerRight: () => (
                <Text style={{ marginEnd: 20 }}>
                    1/2
                </Text>
            )
        });
    }, [navigation]);
    useEffect(() => {
        console.log("error in add screen", uploadError, status)
        switch (status) {
            case "failed":
                if (uploadError) {
                    Alert.alert("Failed", uploadError);
                }
                break;
            case "succeeded":
                Alert.alert("Success", status);
                navigation.goBack()
                break;
            case "loading":
                setLoader(true);
                break;
        }

    }, [uploadError, dispatch, status]
    )
    if (loader) {
        return <ActivityIndicator size="large" color={colors.AppPrimaryColor} style={{ flex: 1, backgroundColor: colors.white }} />;
    }
    const isFormValid = () => {
        return (
            name.trim() !== '' &&
            delay.trim() !== '' &&
            selectedEvent.name.trim() !== '' &&
            selectedSmartConnector.name.trim() !== '' &&
            selectedWeightParser.name.trim() !== '' &&
            platformReadyTicks !== "" &&
            platformMaxWeight !== "" &&
            platformMinWeight !== null &&
            stableWeightTolerance !== null &&
            stableWeightTicks !== null &&
            minVehicleWeight !== null
        );
    };
    function handleNextClick() {
        const firstScreenInput = {
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
          

        };
        console.log("firstScreenData to pass", firstScreenInput.type)
        navigation.navigate("WeighbridgesAddScreenSecound", { data: firstScreenInput })
    }

    return (
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
                        label={"Type"} disable={false}
                        editable={false} setTextInput={undefined} required={true} />

                    <CustomTextInput
                        value={selectedSmartConnector.name}
                        onPress={() => handleFocus('smartController')}
                        label={"Smart Controller"}
                        disable={false}
                        style={{ flex: 1 }}
                        editable={false}
                        setTextInput={undefined} required={true} />
                    <CustomTextInput
                        value={selectedWeightParser.name}
                        onPress={() => handleFocus('weightParsers')}
                        label={"Weight parser"}
                        disable={false}
                        style={{ flex: 1 }}
                        editable={false}
                        setTextInput={undefined} required={true} />
                    <CustomTextInput
                        label="Platform ready ticks"
                        style={{ flex: 1 }}
                        value={platformReadyTicks}
                        keyboardType="numeric"
                        editable={true}
                        setTextInput={setPlatformReadyTicks} required={true} />

                    <CustomTextInput
                        label="Platform ready max weight"
                        style={{ flex: 1 }}
                        value={platformMaxWeight}
                        keyboardType="numeric"
                        editable={true}
                        setTextInput={setPlatformMaxWeight} required={true} />

                    <CustomTextInput
                        label="Platform ready min weight"
                        style={{ flex: 1 }}
                        value={platformMinWeight}
                        keyboardType="numeric"
                        editable={true}
                        setTextInput={setPlatformMinWeight} required={true} />

                    <CustomTextInput
                        label="Stable weight tolerance"
                        style={{ flex: 1 }}
                        value={stableWeightTolerance}
                        keyboardType="numeric"
                        editable={true}
                        setTextInput={setStableWeightTolerance} required={true} />

                    <CustomTextInput
                        label="Stable weight ticks"
                        style={{ flex: 1 }}
                        value={stableWeightTicks}
                        keyboardType="numeric"
                        editable={true}
                        setTextInput={setStableWeightTicks} required={true} />

                    <CustomTextInput
                        label="Min vehicle weight"
                        style={{ flex: 1 }}
                        value={minVehicleWeight}
                        keyboardType="numeric"
                        editable={true}
                        setTextInput={setMinVehicleWeight} required={true} />

                    <CustomTextInput
                        label="Min tag count"
                        style={{ flex: 1 }}
                        value={minTagCount}
                        keyboardType="numeric"
                        editable={true}
                        setTextInput={setMinTagCount} required={false} />
                    <CustomTextInput
                        value={selectedDate}
                        onPress={() => handleFocus("")}
                        label={"Expiry Date"}
                        disable={false}
                        style={{ flex: 1 }}
                        editable={false}
                        iconName=""
                        setTextInput={undefined} required={false} />


                    {/* Modal for selecting options */}

                    {modalVisible && (
                        // Alert.alert("hello")
                        <View style={{ backgroundColor: "pink", flex: 1 }}>
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

                    <SwithWithLable value={isDriverTagEnabled} onChangeValue={toggleDriverTagSwitch} lable={"Driver Tag"} />

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
                    <SwithWithLable value={isSecurityTagEnabled} onChangeValue={toggleSecurityTagSwitch} lable={"Security Tag"} />
                    {
                        isSecurityTagEnabled &&
                        <CustomTextInput
                            label="Sequirty Tag TimeOut (InMilliSecound)"
                            value={sequrityTagTimeOut}
                            editable={true}
                            style={{ flex: 1 }}
                            errorMessage={undefined}
                            keyboardType="numeric" setTextInput={setSequrityTagTimeOut} required={true} />

                    }
                    <View>
                        <CustomButton label={"Next"}
                            onPress={handleNextClick}
                            icon={"arrow-forward"}
                            disabled={!isFormValid()}
                        />
                    </View>

                </View> : <ActivityIndicator size={"large"} style={{ flex: 1 }} />
            }
        </ScrollView >
    );
}
const styles = StyleSheet.create({
    headerTitle: {
        color: colors.darkblack,
        fontSize: fontSizes.heading,
    },
})
export default WeighbridgesAddScreen;

