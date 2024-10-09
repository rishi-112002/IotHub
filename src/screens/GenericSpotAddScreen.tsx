import { View, ActivityIndicator, ScrollView, Alert, Text } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import CustomSubHeader from "../reuseableComponent/header/CustomSubHeader";
import colors from "../assets/color/colors";
import GenericModal from "../reuseableComponent/modal/GenralModal";
import { RootState, store } from "../reducer/Store";
import { GetDisplays, GetReader, GetSmartControllers, GetWeightBridge } from "../reducer/genericAddDetails/GenericAddDetailsAction";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../reuseableComponent/customButton/CustomButton";
import { uploadGenericData } from "../reducer/uploadGenericData/uploadGenericDataAction";
import SwithWithLable from "../reuseableComponent/switch/SwitchWithLable";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import CustomTextInput from "../reuseableComponent/customTextInput/CustomTextInput";
import { StyleSheet } from "react-native";
import fontSizes from "../assets/fonts/FontSize";
import { AppNavigationParams } from "../navigation/NavigationStackList";

function GenericAddScreen() {
    const [name, setName] = useState("");
    const [delay, setDelay] = useState("");
    const [validId, setvalidId] = useState("");
    const [sequrityTagTimeOut, setSequrityTagTimeOut] = useState("");
    const [driverTagTimeOut, setDriverTagTimeOut] = useState("");
    const [minTagCount, setMinTagCount] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [loader, setLoader] = useState(false);
    const navigation = useNavigation<NavigationProp<AppNavigationParams>>();
    const [uploadData, setUploadData] = useState({})
    const uploadError = useSelector((state: RootState) => state.uploadGeneric.error);
    const status = useSelector((state: RootState) => state.uploadGeneric.status);
    const dispatch = useDispatch();
    const baseUrls = useSelector((state: RootState) => state.authentication.baseUrl);
    const buCode = useSelector((state: RootState) => state.authentication.buCode);
    const token = useSelector((state: RootState) => state.authentication.token);
    const smartController = useSelector((state: RootState) => state.genericAddDetail.smartController);
    const displays = useSelector((state: RootState) => state.genericAddDetail.display);
    const readers = useSelector((state: RootState) => state.genericAddDetail.reader);
    const Weightbridge = useSelector((state: RootState) => state.genericAddDetail.weighBriges);
    const smartControllerLoader = useSelector((state: RootState) => state.genericAddDetail.smartControllerLoader);
    const [currentField, setCurrentField] = useState<string | null>(null);
    const [selectedReader, setSelectedReader] = useState<any>({ name: '', id: '' });
    const [selectedDisplay, setSelectedDisplay] = useState<any>({ name: '', id: '' });
    const [selectedSmartConnector, setSelectedSmartConnector] = useState<any>({ name: '', id: '' });
    const [selectedEvent, setSelectedEvent] = useState<any>({ name: '', id: '' });
    const [selectedWeighBridge, setSelectedWeighBridge] = useState<any>({ name: '', id: '' });
    const [selectedDirection, setSelectedDirection] = useState<any>({ name: '', id: '' });
    const [errors, setErrors] = useState<{
        name?: string; delay?: string, event?: string, sequrityDelay?: string, direction?: string,
        weighBridge?: string, driverTagTimeOut?: string
    }>({});
    const events = [
        {
            name: "None", id: 'NONE'
        },
        {
            name: "Tag entry", id: "TAG_ENTRY"
        },
        {
            name: "Tag entry and exit", id: 'TAG_ENTRY_AND_EXIT'
        }
    ]

    const direction = [
        {
            name: "A", id: 'A'
        },
        {
            name: "B", id: "B"
        },
    ]


    const [isDriverTagEnabled, setIsDriverTagEnabled] = useState(false);
    const toggleDriverTagSwitch = () => setIsDriverTagEnabled(prevState => !prevState);

    const [isSecurityTagEnabled, setIsSecurityTagEnabled] = useState(false);
    const toggleSecurityTagSwitch = () => setIsSecurityTagEnabled(prevState => !prevState);

    const [isWeightBridgeEntryEnabled, setIsWeightBridgeEntryEnabled] = useState(false);
    const toggleWeightBridgeEntrySwitch = () => setIsWeightBridgeEntryEnabled(prevState => !prevState);

    const [isActiveEnabled, setIsActiveEnabled] = useState(false);
    const toggleActiveSwitch = () => setIsActiveEnabled(prevState => !prevState);

    const handleOptionSelect = (selected: any) => {
        switch (currentField) {
            case 'display':
                setSelectedDisplay(selected);
                break;
            case 'reader':
                setSelectedReader(selected);
                break;
            case 'smartController':
                setSelectedSmartConnector(selected);
                break;
            case 'events':
                setSelectedEvent(selected);
                break;
            case 'weightbridge':
                setSelectedWeighBridge(selected);
                break;
            case 'direction':
                setSelectedDirection(selected);
                break;
        }
        setModalVisible(false);
        setCurrentField(null);
    };


    // Function to handle input focus and show the modal with the correct options
    const handleFocus = (field: string) => {
        setCurrentField(field);
        setModalVisible(true);
    };

    // Get the options based on the currently focused field
    const getOptions = () => {
        if (currentField === 'display') {
            return displays;
        } else if (currentField === 'reader') {
            return readers;
        }
        else if (currentField === "smartController") {
            return smartController
        }
        else if (currentField === "events") {
            return events
        }
        else if (currentField === "weightbridge") {
            return Weightbridge
        }
        else if (currentField === "direction") {
            return direction
        }

        return [];
    };
    const handleSaveData = () => {

        const newErrors: {
            name?: string; delay?: string, event?: string, sequrityDelay?: string, direction?: string,
            weighBridge?: string, driverTagTimeOut?: string
        } = {};

        if (!selectedEvent.id) {
            newErrors.event = "Event is required";
        }
        if (!name) {
            newErrors.name = "Name is required";
        }
        if (!delay) {
            newErrors.delay = "Delay is required";
        }
        if (isDriverTagEnabled) {
            if (!driverTagTimeOut) {
                newErrors.driverTagTimeOut = "Driver Tag TimeOut is required";
            }
        }
        if (isSecurityTagEnabled) {
            if (!sequrityTagTimeOut) {
                newErrors.sequrityDelay = "Sequrity Delay is required";
            }
        }

        if (isWeightBridgeEntryEnabled) {
            if (!selectedDirection) {
                newErrors.direction = "Direction is required"
            }
            if (selectedWeighBridge) {
                newErrors.weighBridge = "WeighBridge is required"
            }
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setLoader(true);
        const dataToSave = {
            active: isActiveEnabled,
            buCode: buCode,
            delayAlertAfter: delay,
            driverTag: isDriverTagEnabled,
            ...(isDriverTagEnabled && { driverTagTimeOut: driverTagTimeOut }),
            events: selectedEvent.id ? selectedEvent.id : null,
            name: name,
            securityTag: isSecurityTagEnabled,
            ...(isSecurityTagEnabled && { sequrityTagTimeOut: sequrityTagTimeOut }),
            tagCount: minTagCount ? minTagCount : null,
            type: "GENERIC_SPOT",
            weighbridgeDirection: isWeightBridgeEntryEnabled
                ? selectedDirection.id
                    ? selectedDirection.id
                    : null
                : null,
            weighbridgeEntry: isWeightBridgeEntryEnabled,
            weighbridgeId: isWeightBridgeEntryEnabled
                ? selectedWeighBridge.id
                    ? selectedWeighBridge.id
                    : null
                : null,
        };
        console.log("data for save ", dataToSave)
        try {
            store.dispatch(uploadGenericData({
                baseUrls: baseUrls, genericData: dataToSave,
                token: token, buCode: buCode
            }))
            setLoader(false)
        } catch (error) {
            console.log("uploadError in Generic add screen", uploadError)
        }
    };
    useEffect(() => {
        console.log("Updated upload data: ", uploadData);
    }, [uploadData]);

    useEffect(() => {
        store.dispatch(GetReader({ baseUrl: baseUrls }))
        store.dispatch(GetDisplays({ baseUrl: baseUrls }))
        store.dispatch(GetSmartControllers({ baseUrl: baseUrls }))
        store.dispatch(GetWeightBridge({ baseUrl: baseUrls }))
    }, [])
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <View>
                    <Text style={styles.headerTitle}> GenericSpot ADD</Text>
                </View>
            ),
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



    return (
        <ScrollView contentContainerStyle={{ backgroundColor: colors.white }}>
            {!smartControllerLoader ? <View style={{ padding: 20 }}>

                <CustomTextInput
                    label="Name"
                    value={name}
                    editable={true}
                    style={{ flex: 1 }}

                    errorMessage={errors.name}
                    keyboardType="default"
                    returnKeyType="next" setTextInput={setName}
                />
                <SwithWithLable value={isActiveEnabled} onChangeValue={toggleActiveSwitch} lable={"Active"} />

                <CustomTextInput
                    label="Delay alert after (milli Seconds)"
                    value={delay}
                    editable={true}
                    style={{ flex: 1 }}

                    errorMessage={errors.delay}
                    keyboardType="numeric"
                    returnKeyType="next" setTextInput={setDelay} />
                <CustomTextInput
                    label="Valid Id state"
                    style={{ flex: 1 }}

                    value={validId}
                    editable={true}
                    returnKeyType="next" setTextInput={setvalidId} />
                <CustomTextInput
                    value={selectedSmartConnector.name}
                    onPress={() => handleFocus('smartController')}
                    style={{ flex: 1 }}

                    label={"Smart Controller"} disable={false}
                    editable={false} setTextInput={undefined} />
                <CustomTextInput
                    value={selectedDisplay.name}
                    style={{ flex: 1 }}

                    onPress={() => handleFocus('display')}
                    errorMessage={undefined}
                    label={"Display"} disable={false}
                    editable={false} setTextInput={undefined} />

                <CustomTextInput
                    value={selectedEvent.name}
                    onPress={() => handleFocus('events')}
                    style={{ flex: 1 }}

                    errorMessage={errors.event}
                    label={"Event"} disable={false}
                    editable={false} setTextInput={undefined} />

                <CustomTextInput
                    value={selectedReader.name}
                    onPress={() => handleFocus('reader')}
                    errorMessage={errors.event}
                    style={{ flex: 1 }}
                    label={"Primary Reader"}
                    disable={selectedEvent.id === "NONE" ? true : false}
                    editable={false} setTextInput={undefined} />


                <CustomTextInput
                    style={{ flex: 1 }}
                    value={selectedReader.name}
                    onPress={() => handleFocus('reader')}
                    errorMessage={errors.event}
                    label={"Secoundary Reader"}
                    disable={selectedEvent.id === "NONE" ? true : false}
                    editable={false} setTextInput={undefined} />

                <CustomTextInput
                    label="Min Tag Count"
                    style={{ flex: 1 }}

                    value={minTagCount}
                    keyboardType="numeric"
                    editable={true}
                    setTextInput={setMinTagCount}
                />

                {/* Modal for selecting options */}
                {modalVisible && (
                    <GenericModal
                        options={getOptions()}
                        isVisible={modalVisible}
                        handleCloseModal={() => setModalVisible(false)}
                        onOptionSelected={handleOptionSelect}
                        nameKey="name"
                        valueKey="id"
                    />
                )}
                <SwithWithLable value={isDriverTagEnabled} onChangeValue={toggleDriverTagSwitch} lable={"Driver Tag"} />

                {
                    isDriverTagEnabled &&
                    <CustomTextInput
                        label="Driver Tag TimeOut (In MilliSecound)"
                        value={driverTagTimeOut}
                        style={{ flex: 1 }}

                        editable={true}
                        errorMessage={errors.driverTagTimeOut}
                        keyboardType="numeric" setTextInput={setDriverTagTimeOut}
                    />

                }
                <SwithWithLable value={isSecurityTagEnabled} onChangeValue={toggleSecurityTagSwitch} lable={"Security Tag"} />

                {
                    isSecurityTagEnabled &&
                    <CustomTextInput
                        label="Sequirty Tag TimeOut (InMilliSecound)"
                        value={sequrityTagTimeOut}
                        editable={true}
                        style={{ flex: 1 }}
                        errorMessage={errors.sequrityDelay}
                        keyboardType="numeric" setTextInput={setSequrityTagTimeOut}
                    />

                }
                <SwithWithLable value={isWeightBridgeEntryEnabled} onChangeValue={toggleWeightBridgeEntrySwitch} lable={"Weightbridge Entry"} />
                {
                    isWeightBridgeEntryEnabled &&
                    <View>
                        <CustomTextInput
                            style={{ flex: 1 }}
                            value={selectedReader.name}
                            onPress={() => handleFocus('weightbridge')}
                            errorMessage={errors.weighBridge}
                            label={"WeighBridge"} disable={false} setTextInput={undefined} />


                        <CustomTextInput
                            style={{ flex: 1 }}
                            value={selectedReader.name}
                            onPress={() => handleFocus('direction')}
                            errorMessage={errors.direction}
                            label={"WeighBridge Direction"} disable={false} setTextInput={undefined} />
                    </View>

                }

                <View>
                    <CustomButton label={"Save"} onPress={
                        handleSaveData
                    } />
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
export default GenericAddScreen;

