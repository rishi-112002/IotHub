import { View, ScrollView } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGenericAddEffect } from "./GenericAddEffect";
import { RootState, store } from "../../reducer/Store";
import { uploadGenericData } from "../../reducer/uploadGenericData/uploadGenericDataAction";
import { ApiCallsAddGenericSpot } from "../../api/ApiCallsByReducer";
import SequentialBouncingLoader from "../../reuseableComponent/loader/BallBouncingLoader";
import { direction, events } from "../../assets/constants/Constant";
import CustomTextInput from "../../reuseableComponent/customTextInput/CustomTextInput";
import colors from "../../assets/color/colors";
import SwithWithLable from "../../reuseableComponent/switch/SwitchWithLable";
import GenericAddComponentDropDowns from "./GenericAddComponentDropDowns";
import GenericModal from "../../reuseableComponent/modal/GenralModal";
import CustomButton from "../../reuseableComponent/customButton/CustomButton";
import GenericAddinputComponent from "./GenericAddInputComponent";

function GenericAddForm() {
    const { loader } = useGenericAddEffect();
    const [formData, setFormData] = useState({
        name: "",
        delay: "",
        validId: "",
        driverTagTimeOut: "",
        sequrityTagTimeOut: "", 
        minTagCount: "",
    });
    const [modalVisible, setModalVisible] = useState(false);
    const uploadError = useSelector((state: RootState) => state.uploadGeneric.error);
    const dispatch = useDispatch();
    const baseUrls = useSelector((state: RootState) => state.authentication.baseUrl);
    const buCode = useSelector((state: RootState) => state.authentication.buCode);
    const token = useSelector((state: RootState) => state.authentication.token);
    const smartController = useSelector((state: RootState) => state.spotAddDetail.smartController);
    const displays = useSelector((state: RootState) => state.spotAddDetail.display);
    const readers = useSelector((state: RootState) => state.spotAddDetail.reader);
    const Weightbridge = useSelector((state: RootState) => state.spotAddDetail.weighBriges);
    const smartControllerLoader = useSelector((state: RootState) => state.spotAddDetail.smartControllerLoader);
    const displayLoader = useSelector((state: RootState) => state.spotAddDetail.displaysLoader);
    const readerLoader = useSelector((state: RootState) => state.spotAddDetail.readerLoader);
    const [currentField, setCurrentField] = useState<string | null>(null);
    const [selectedSecoundaryReader, setSelectedSecoundaryReader] = useState<any>({ name: '', id: '' });
    const [selectedPrimaryReader, setSelectedPrimaryReader] = useState<any>({ name: '', id: '' });
    const [selectedDisplay, setSelectedDisplay] = useState<any>({ name: '', id: '' });
    const [selectedSmartConnector, setSelectedSmartConnector] = useState<any>({ name: '', id: '' });
    const [selectedEvent, setSelectedEvent] = useState<any>({ name: '', id: '' });
    const [selectedWeighBridge, setSelectedWeighBridge] = useState<any>({ name: '', id: '' });
    const [selectedDirection, setSelectedDirection] = useState<any>({ name: '', id: '' });
    const [errors, setErrors] = useState<{
        name?: string; delay?: string, event?: string, sequrityDelay?: string, direction?: string,
        weighBridge?: string, driverTagTimeOut?: string
    }>({});

    const [isDriverTagEnabled, setIsDriverTagEnabled] = useState(false);
    const toggleDriverTagSwitch = () => setIsDriverTagEnabled(prevState => !prevState);

    const [isSecurityTagEnabled, setIsSecurityTagEnabled] = useState(false);
    const toggleSecurityTagSwitch = () => setIsSecurityTagEnabled(prevState => !prevState);

    const [isWeightBridgeEntryEnabled, setIsWeightBridgeEntryEnabled] = useState(false);
    const toggleWeightBridgeEntrySwitch = () => setIsWeightBridgeEntryEnabled(prevState => !prevState);

    const [isActiveEnabled, setIsActiveEnabled] = useState(false);
    const toggleActiveSwitch = () => setIsActiveEnabled(prevState => !prevState);
    const handleOptionSelect = useCallback((selected: any) => {
        switch (currentField) {
            case 'display':
                setSelectedDisplay(selected);
                break;
            case 'primaryReader':
                setSelectedPrimaryReader(selected);
                break;
            case 'secoundaryReader':
                setSelectedSecoundaryReader(selected);
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
    }, [currentField]);

    // Function to handle input focus and show the modal with the correct options
    const handleFocus = useCallback((field: string) => {
        setCurrentField(field);
        setModalVisible(true);
    }, []);
    const handleSaveData = useCallback(() => {
        const newErrors: {
            name?: string; delay?: string, event?: string, sequrityDelay?: string, direction?: string,
            weighBridge?: string, driverTagTimeOut?: string
        } = {};

        if (!selectedEvent.id) {
            newErrors.event = "Event is required";
        }
        if (!formData.name) {
            newErrors.name = "Name is required";
        }
        if (!formData.delay) {
            newErrors.delay = "Delay is required";
        }
        if (isDriverTagEnabled && !formData.driverTagTimeOut) {
            newErrors.driverTagTimeOut = "Driver Tag TimeOut is required";
        }
        if (isSecurityTagEnabled && !formData.sequrityTagTimeOut) {
            newErrors.sequrityDelay = "Sequrity Delay is required";
        }
        if (isWeightBridgeEntryEnabled) {
            if (!selectedDirection) {
                newErrors.direction = "Direction is required";
            }
            if (!selectedWeighBridge) {
                newErrors.weighBridge = "WeighBridge is required";
            }
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const dataToSave = {
            active: isActiveEnabled,
            buCode: buCode,
            delayAlertAfter: formData.delay,
            driverTag: isDriverTagEnabled,
            ...(isDriverTagEnabled && { driverTagTimeOut: formData.driverTagTimeOut }),
            events: selectedEvent.id ? selectedEvent.id : null,
            name: formData.name,
            securityTag: isSecurityTagEnabled,
            ...(isSecurityTagEnabled && { sequrityTagTimeOut: formData.sequrityTagTimeOut }),
            tagCount: formData.minTagCount ? formData.minTagCount : null,
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
        console.log("data for save ", dataToSave);

        try {
            store.dispatch(uploadGenericData({
                baseUrls: baseUrls, genericData: dataToSave,
                token: token, buCode: buCode
            }));
        } catch (error) {
            console.log("uploadError in Generic add screen", uploadError);
        }
    }, [
        formData.name, formData.delay, isDriverTagEnabled, formData.driverTagTimeOut, isSecurityTagEnabled,
        formData.sequrityTagTimeOut, selectedEvent, selectedDirection, selectedWeighBridge,
        isActiveEnabled, formData.minTagCount, buCode, baseUrls, token, isWeightBridgeEntryEnabled, uploadError
    ]);
    useEffect(() => {
        ApiCallsAddGenericSpot({ baseUrl: baseUrls })
    }, [dispatch])
    if (smartControllerLoader || displayLoader || readerLoader || loader) {
        return (
            <View style={{ flex: 1 }}>
                <SequentialBouncingLoader />
            </View>
        );
    }
    const getOptions = () => {
        if (currentField === 'display') {
            return displays;
        } else if (currentField === 'secoundaryReader') {
            return readers;
        }
        else if (currentField === 'primaryReader') {
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
    console.log("current filed ", currentField)
    const handleInputChange = (name: any, value: any) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    return (
        <ScrollView contentContainerStyle={{ backgroundColor: colors.white }} style={{ flex: 1 }}>
            {!smartControllerLoader ? <View style={{ padding: 20 }}>
                <GenericAddinputComponent formData={formData} isActive={isActiveEnabled} onChangeValue={toggleActiveSwitch} handleInputChange={handleInputChange} errors={errors} />
                <View>
                    <GenericAddComponentDropDowns smartController={selectedSmartConnector.name} display={selectedDisplay.name} event={selectedEvent.name} primaryReader={selectedPrimaryReader.name} secoundryReader={selectedSecoundaryReader.name} eventId={selectedEvent.id} setCurrentField={setCurrentField} setModalVisible={setModalVisible} />
                </View>
                <SwithWithLable value={isDriverTagEnabled} onChangeValue={toggleDriverTagSwitch} lable={"Driver Tag"} />

                {
                    isDriverTagEnabled &&
                    <CustomTextInput
                        label="Driver Tag TimeOut (In MilliSecound)"
                        value={formData.driverTagTimeOut}
                        style={{ flex: 1 }}
                        editable={true}
                        errorMessage={errors.driverTagTimeOut}
                        keyboardType="numeric" setTextInput={(value: any) => handleInputChange("drivertagTimeOut", value)} required={false} />

                }
                <SwithWithLable value={isSecurityTagEnabled} onChangeValue={toggleSecurityTagSwitch} lable={"Security Tag"} />

                {
                    isSecurityTagEnabled &&
                    <CustomTextInput
                        label="Sequirty Tag TimeOut (InMilliSecound)"
                        value={formData.sequrityTagTimeOut}
                        editable={true}
                        style={{ flex: 1 }}
                        errorMessage={errors.sequrityDelay}
                        keyboardType="numeric" setTextInput={(value: any) => handleInputChange("sequirtyTagTimeOut", value)} required={false} />

                }
                <SwithWithLable value={isWeightBridgeEntryEnabled} onChangeValue={toggleWeightBridgeEntrySwitch} lable={"Weightbridge Entry"} />
                {
                    isWeightBridgeEntryEnabled &&
                    <View>
                        <CustomTextInput
                            style={{ flex: 1 }}
                            value={selectedWeighBridge.name}
                            onPress={() => handleFocus('weightbridge')}
                            errorMessage={errors.weighBridge}
                            label={"WeighBridge"} disable={false} setTextInput={undefined} required={true} editable={false} />


                        <CustomTextInput
                            style={{ flex: 1 }}
                            value={selectedDirection.name}
                            onPress={() => handleFocus('direction')}
                            errorMessage={errors.direction}
                            label={"WeighBridge Direction"} disable={false} setTextInput={undefined} required={true} editable={false} />
                    </View>

                }
                <GenericModal
                    options={getOptions()}
                    isVisible={modalVisible}
                    handleCloseModal={() => setModalVisible(false)}
                    onOptionSelected={handleOptionSelect}
                    nameKey="name"
                    valueKey="id"
                />

                <View>
                    <CustomButton label={"Save"} onPress={
                        handleSaveData
                    } />
                </View>

            </View> : <View style={{ flex: 1 }}>
                <SequentialBouncingLoader />
            </View>
            }
        </ScrollView >
    );
}
export default GenericAddForm;