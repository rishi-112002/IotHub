import { Text, View, StyleSheet, Switch, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import CustomSubHeader from "../reuseableComponent/header/CustomSubHeader";
import CustomTextInputInsideLable from "../reuseableComponent/customTextInput/CustomTextInputInsideLabel";
import colors from "../assets/color/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import GenericModal from "../reuseableComponent/modal/GenralModal";
import { RootState, store } from "../reducer/Store";
import { GetDisplays, GetReader, GetSmartControllers, GetWeightBridge } from "../reducer/genericAddDetails/GenericAddDetailsAction";
import { useSelector } from "react-redux";
import CustomButton from "../reuseableComponent/customButton/CustomButton";
import { uploadGenericData } from "../reducer/uploadGenericData/uploadGenericDataAction";

function GenericAddScreen() {
    const [name, setName] = useState("");
    const [delay, setDelay] = useState("");
    const [validId, setvalidId] = useState("");
    const [sequrityTagTimeOut, setSequrityTagTimeOut] = useState("");
    const [driverTagTimeOut, setDriverTagTimeOut] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const baseUrls = useSelector((state: RootState) => state.authentication.baseUrl);
    const buCode = useSelector((state: RootState) => state.authentication.buCode);
    const token = useSelector((state: RootState) => state.authentication.token);
    const smartController = useSelector((state: RootState) => state.genericAddDetail.smartController);
    const displays = useSelector((state: RootState) => state.genericAddDetail.display);
    const readers = useSelector((state: RootState) => state.genericAddDetail.reader);
    const Weightbridge = useSelector((state: RootState) => state.genericAddDetail.weighBriges);
    const displaysLoader = useSelector((state: RootState) => state.genericAddDetail.displaysLoader);
    const smartControllerLoader = useSelector((state: RootState) => state.genericAddDetail.smartControllerLoader);
    const readerLoader = useSelector((state: RootState) => state.genericAddDetail.readerLoader);
    const [currentField, setCurrentField] = useState<string | null>(null);
    const [selectedReader, setSelectedReader] = useState<any>({ name: '', id: '' });
    const [selectedDisplay, setSelectedDisplay] = useState<any>({ name: '', id: '' });
    const [selectedSmartConnector, setSelectedSmartConnector] = useState<any>({ name: '', id: '' });
    const [selectedEvent, setSelectedEvent] = useState<any>({ name: '', id: '' });
    const [selectedWeighBridge, setSelectedWeighBridge] = useState<any>({ name: '', id: '' });
    const [selectedDirection, setSelectedDirection] = useState<any>({ name: '', id: '' });

    const events = [
        {
            name: "None", id: 'NONE'
        },
        {
            name: "Tag entry", id: "TAG ENTRY"
        },
        {
            name: "Tag entry and exit", id: 'TAG ENTRY AND EXIT'
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

    // Function to handle option selection from modal
    const handleOptionSelect = (selected: any) => {
        if (currentField === 'display') {
            return setSelectedDisplay(selected);
        } else if (currentField === 'reader') {
            return setSelectedReader(selected);

        }
        else if (currentField === "smartController") {
            return setSelectedSmartConnector(selected);

        }
        else if (currentField === "events") {
            return setSelectedEvent(selected)
        }
        else if (currentField === "weightbridge") {
            return setSelectedWeighBridge(selected)
        }
        else if (currentField === "direction") {
            return setSelectedDirection(selected)
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


        const dataToSave =
        {
            active: false,
            buCode: buCode,
            delayAlertAfter: delay,
            driverTag: false,
            events: selectedEvent.id,
            name:name,
            securityTag: false,
            tagCount: null,
            type: "GENERIC_SPOT",
            weighbridgeDirection: null,
            weighbridgeEntry: false,
            weighbridgeId: null
          }
        store.dispatch(uploadGenericData({
            baseUrls: baseUrls, genericData: dataToSave,
            token: token , buCode:buCode
        }))
    };


    useEffect(() => {
        store.dispatch(GetReader({ baseUrl: baseUrls }))
        store.dispatch(GetDisplays({ baseUrl: baseUrls }))
        store.dispatch(GetSmartControllers({ baseUrl: baseUrls }))
        store.dispatch(GetWeightBridge({ baseUrl: baseUrls }))
    }, [])
    return (
        <ScrollView>
            <CustomSubHeader spotName={"GenericSpot ADD"} />
            {!smartControllerLoader ? <View style={{ padding: 20 }}>

                <View style={styles.row}>
                    <Text style={styles.labelText}>Active</Text>
                    <Switch
                        trackColor={{ false: colors.gray, true: colors.blueLighter }}
                        thumbColor={!isActiveEnabled ? colors.white : colors.AppPrimaryColor}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleActiveSwitch}
                        value={isActiveEnabled}
                    />
                </View>
                <CustomTextInputInsideLable
                    label="Name"
                    value={name}
                    onChangeText={(text)=>setName(text)}
                    placeHolder=""

                />
                <CustomTextInputInsideLable
                    label="Delay alert after (milli Seconds)"
                    value={delay}
                    onChangeText={setDelay}
                    placeHolder=""
                />
                <CustomTextInputInsideLable
                    label="Valid Id state"
                    value={validId}
                    onChangeText={setvalidId}
                    placeHolder=""
                />
                <View>
                    <Text style={styles.lableHeading}>Smart Controller</Text>
                    <TouchableOpacity style={styles.inputContainer} onPress={() => handleFocus('smartController')}>
                        <TextInput
                            value={selectedSmartConnector.name}
                            placeholder=""
                            style={styles.input}
                            editable={false}
                        />
                        <Icon name="arrow-drop-down" size={30} color={colors.blueDarkest} style={styles.icon} />
                    </TouchableOpacity>
                </View>

                {/* Input for Display */}
                <View>
                    <Text style={styles.lableHeading}>Display</Text>
                    <TouchableOpacity style={styles.inputContainer} onPress={() => handleFocus('display')}>
                        <TextInput
                            value={selectedDisplay.name}
                            placeholder=""
                            style={styles.input}
                            editable={false}
                        />
                        <Icon name="arrow-drop-down" size={30} color={colors.blueDarkest} style={styles.icon} />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.lableHeading}>Event</Text>
                    <TouchableOpacity style={styles.inputContainer} onPress={() => handleFocus('events')}>
                        <TextInput
                            value={selectedEvent.name}
                            placeholder=""
                            style={styles.input}
                            editable={false}
                        />
                        <Icon name="arrow-drop-down" size={30} color={colors.blueDarkest} style={styles.icon} />
                    </TouchableOpacity>
                </View>

                <View>
                    <View>
                        <Text style={styles.lableHeading}>Primary Reader</Text>
                        <TouchableOpacity style={styles.inputContainer} onPress={() => handleFocus('reader')}
                            disabled={selectedEvent.id === "NONE"}>
                            <TextInput
                                value={selectedReader.name}
                                placeholder=""
                                style={styles.input}
                                editable={false}
                            />
                            <Icon name="arrow-drop-down" size={30} color={colors.blueDarkest} style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={styles.lableHeading}>Secoundary Reader</Text>
                        <TouchableOpacity style={styles.inputContainer} onPress={() => handleFocus('reader')}
                            disabled={selectedEvent.id === "NONE"}>
                            <TextInput
                                value={selectedReader.name}
                                placeholder=""
                                style={styles.input}
                                editable={false}
                            />
                            <Icon name="arrow-drop-down" size={30} color={colors.blueDarkest} style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                </View>


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
                <View style={styles.row}>
                    <Text style={styles.labelText}>Driver Tag</Text>
                    <Switch
                        trackColor={{ false: colors.gray, true: colors.blueLighter }}
                        thumbColor={!isDriverTagEnabled ? colors.white : colors.AppPrimaryColor}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleDriverTagSwitch}
                        value={isDriverTagEnabled}
                    />
                </View>
                {
                    isDriverTagEnabled &&
                    <CustomTextInputInsideLable
                        label="Driver Tag TimeOut (In MilliSecound)"
                        value={driverTagTimeOut}
                        onChangeText={setDriverTagTimeOut}
                        placeHolder=""
                    />

                }

                <View style={styles.row}>
                    <Text style={styles.labelText}>Security Tag</Text>
                    <Switch
                        trackColor={{ false: colors.gray, true: colors.blueLighter }}
                        thumbColor={!isSecurityTagEnabled ? colors.white : colors.AppPrimaryColor}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSecurityTagSwitch}
                        value={isSecurityTagEnabled}
                    />
                </View>
                {
                    isSecurityTagEnabled &&
                    <CustomTextInputInsideLable
                        label="Sequirty Tag TimeOut (InMilliSecound)"
                        value={sequrityTagTimeOut}
                        onChangeText={setSequrityTagTimeOut}
                        placeHolder=""
                    />

                }

                <View style={styles.row}>
                    <Text style={styles.labelText}>Weightbridge Entry</Text>
                    <Switch
                        trackColor={{ false: colors.gray, true: colors.blueLighter }}
                        thumbColor={!isWeightBridgeEntryEnabled ? colors.white : colors.AppPrimaryColor}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleWeightBridgeEntrySwitch}
                        value={isWeightBridgeEntryEnabled}
                    />
                </View>
                {
                    isWeightBridgeEntryEnabled &&
                    <View>
                        <View>
                            <Text style={styles.lableHeading}>WeighBridge</Text>
                            <TouchableOpacity style={styles.inputContainer} onPress={() => handleFocus('weightbridge')}>
                                <TextInput
                                    value={selectedWeighBridge.name}
                                    placeholder=""
                                    style={styles.input}
                                    editable={false}
                                />
                                <Icon name="arrow-drop-down" size={30} color={colors.blueDarkest} style={styles.icon} />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text style={styles.lableHeading}>WeighBridge Direction</Text>
                            <TouchableOpacity style={styles.inputContainer} onPress={() => handleFocus('direction')}>
                                <TextInput
                                    value={selectedDirection.name}
                                    placeholder=""
                                    style={styles.input}
                                    editable={false}
                                />
                                <Icon name="arrow-drop-down" size={30} color={colors.blueDarkest} style={styles.icon} />
                            </TouchableOpacity>
                        </View>
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
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    labelText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    lableHeading: {
        fontSize: 15,
        fontWeight: "700",
        color: colors.darkblack,
    },
    input: {
        flex: 1,
        color: "black",
        fontSize: 15,
        paddingVertical: 10,
    },
    icon: {
        paddingLeft: 10,
    },
});

export default GenericAddScreen;

