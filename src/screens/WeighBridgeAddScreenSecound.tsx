import { View, ActivityIndicator, ScrollView, Alert, Text } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import colors from "../assets/color/colors";
import GenericModal from "../reuseableComponent/modal/GenralModal";
import { RootState, store } from "../reducer/Store";
import { GetDisplays, GetReader } from "../reducer/spotAddDetails/SpotAddDetailsAction";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../reuseableComponent/customButton/CustomButton";
import { NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import CustomTextInput from "../reuseableComponent/customTextInput/CustomTextInput";
import { StyleSheet } from "react-native";
import fontSizes from "../assets/fonts/FontSize";
import { AppNavigationParams } from "../navigation/NavigationStackList";
import { SpotsDataByType } from "../reducer/uploadGenericData/uploadGenericDataAction";
import { weighBridgeAdd, WeighBridgeSpotData } from "../reducer/weighBridge/WeighBridgeAction";
import { resetStatus } from "../reducer/weighBridge/WeighBridgeReducer";

interface firstScreenData {
    data: { type: any };

}

function WeighbridgesAddScreenSecound() {
    const [modalVisible, setModalVisible] = useState(false);
    const [loader, setLoader] = useState(false);
    const navigation = useNavigation<NavigationProp<AppNavigationParams>>();
    const status = useSelector((state: RootState) => state.weighBridge.status);
    const baseUrls = useSelector((state: RootState) => state.authentication.baseUrl);
    const displays = useSelector((state: RootState) => state.spotAddDetail.display);
    const readers = useSelector((state: RootState) => state.spotAddDetail.reader);
    const GenericSpots = useSelector((state: RootState) => state.weighBridge.genericData);
    const uploadError = useSelector((state: RootState) => state.weighBridge.error);
    const smartControllerLoader = useSelector((state: RootState) => state.spotAddDetail.smartControllerLoader);
    const dispatch = useDispatch()

    // Direction A states
    const [validIdA, setValidIdA] = useState("");
    const [selectedDisplayA, setSelectedDisplayA] = useState<any>({ name: '', id: '' });
    const [selectedPrimaryReaderA, setSelectedPrimaryReaderA] = useState<any>({ name: '', id: '' });
    const [selectedSecondaryReaderA, setSelectedSecondaryReaderA] = useState<any>({ name: '', id: '' });

    // Direction B states
    const [validIdB, setValidIdB] = useState("");
    const [selectedDisplayB, setSelectedDisplayB] = useState<any>({ name: '', id: '' });
    const [selectedPrimaryReaderB, setSelectedPrimaryReaderB] = useState<any>({ name: '', id: '' });
    const [selectedSecondaryReaderB, setSelectedSecondaryReaderB] = useState<any>({ name: '', id: '' });
    const [selectedGenericSpotDirA, setSelectedGenericSpotDirA] = useState<any>({ name: '', id: '' });
    const [selectedGenericSpotDirB, setSelectedGenericSpotDirB] = useState<any>({ name: '', id: '' });
    const buCode = useSelector((state: RootState) => state.authentication.buCode);
    const token = useSelector((state: RootState) => state.authentication.token);

    const [currentField, setCurrentField] = useState<string | null>(null);

    const route = useRoute<RouteProp<{ params: firstScreenData }>>();
    const firstScreenData = route.params?.data || {};

    const isFormValid = () => {
        return (
            (firstScreenData.type === "UNIDIRECTIONAL_WEIGHBRIDGE" ||
                firstScreenData.type === "BIDIRECTIONAL_WEIGHBRIDGE_3_READER" ||
                firstScreenData.type === "BIDIRECTIONAL_WEIGHBRIDGE")
                ? selectedPrimaryReaderA.name.trim() !== ''
                : selectedPrimaryReaderB.name.trim() !== ''
        );
    };


    const handleOptionSelect = (selected: any) => {
        switch (currentField) {
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

    const handleFocus = (field: string) => {
        setModalVisible(!modalVisible);
        setCurrentField(field);
    };

    const getOptions = () => {
        if (currentField?.includes('display')) {
            return displays;
        } else if (currentField?.includes('Reader')) {
            return readers;
        }
        else if (currentField?.includes('genericSpot')) {
            return GenericSpots;
        }
        return [];
    };

    useEffect(() => {
        store.dispatch(GetReader({ baseUrl: baseUrls }));
        store.dispatch(GetDisplays({ baseUrl: baseUrls }));
        store.dispatch(SpotsDataByType({ baseUrl: baseUrls, spotType: "GENERIC_SPOT", token: token, buCode: buCode }))
        store.dispatch(WeighBridgeSpotData({ baseUrl: baseUrls, buCode: buCode, token: token, spotType: "" }))

    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <View>
                    <Text style={styles.headerTitle}>Add Direction</Text>
                </View>
            ),
            headerRight: () => (
                <Text style={{ marginEnd: 20 }}>
                    2/2
                </Text>
            ),
        });
    }, [navigation]);


    if (loader) {
        return <ActivityIndicator size="large" color={colors.AppPrimaryColor} style={{ flex: 1, backgroundColor: colors.white }} />;
    }

    const handleSave = () => {
        let typeSpecificFields = {};

        // Switch to handle type-specific data
        switch (firstScreenData.type) {
            case 'UNIDIRECTIONAL_WEIGHBRIDGE':
                typeSpecificFields = {
                    validDiDirA: validIdA,
                    primaryReaderIdDirA: selectedPrimaryReaderA.id,
                };
                break;

            case 'BIDIRECTIONAL_WEIGHBRIDGE':
            case 'BIDIRECTIONAL_WEIGHBRIDGE_3_READER':
                typeSpecificFields = {
                    validDiDirA: validIdA,
                    primaryReaderIdDirA: selectedPrimaryReaderA.id,
                    primaryReaderIdDirB: selectedPrimaryReaderB.id,
                };
                break;

            case 'UNIDIRECTIONAL_WEIGHBRIDGE_NO_READER':
                // No specific fields needed
                break;

            case 'BIDIRECTIONAL_WEIGHBRIDGE_NO_READER':
                typeSpecificFields = {
                    validDiDirA: validIdA,

                };
                break;
        }

        const secoundScreenInput = {
            ...typeSpecificFields,
            genericSpotDirA: selectedGenericSpotDirA.id || null,
            genericSpotDirB: selectedGenericSpotDirB.id || null,
        };

        const saveData = {
            ...firstScreenData,
            ...secoundScreenInput
        };

        try {
            store.dispatch(weighBridgeAdd({
                baseUrls: baseUrls,
                weighData: saveData,
                token: token,
                buCode: buCode
            }));
        } catch (error) {
            console.log("uploadError in weighBridge add screen", uploadError);
        }

        console.log("data from secoundScreen", saveData);
    };
    useEffect(() => {
        switch (status) {
            case "failed":
                if (uploadError) {
                    Alert.alert("Failed", uploadError);
                    dispatch(resetStatus())
                }
                break;
            case "succeeded":
                Alert.alert("Success", status);
                dispatch(resetStatus())
                navigation.navigate("WeighbridgesScreen")
                break;
            case "loading":
                setLoader(true);
                break;
        }


    }, [uploadError, dispatch, status])
    return (
        <ScrollView contentContainerStyle={{ backgroundColor: colors.white, flex: 1 }}>
            {!smartControllerLoader ? (
                <View style={{ padding: 20, flex: 1 }}>
                    {/* Direction A Inputs */}
                    <View>
                        <Text style={styles.directionText}>Direction A</Text>

                        <CustomTextInput
                            value={selectedDisplayA.name}
                            onPress={() => handleFocus('displayA')}
                            label="Display"
                            editable={false} setTextInput={undefined} required={false} />
                        {firstScreenData.type === "UNIDIRECTIONAL_WEIGHBRIDGE" || firstScreenData.type === "BIDIRECTIONAL_WEIGHBRIDGE_3_READER" || firstScreenData.type === "BIDIRECTIONAL_WEIGHBRIDGE" ?
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
                    {(firstScreenData.type === "BIDIRECTIONAL_WEIGHBRIDGE" || firstScreenData.type === "BIDIRECTIONAL_WEIGHBRIDGE_NO_READER")
                        &&
                        <View>
                            <Text style={styles.directionText}>Direction B</Text>

                            <CustomTextInput
                                value={selectedDisplayB.name}
                                onPress={() => handleFocus('displayB')}
                                label="Display"
                                editable={false}
                                required={false} setTextInput={undefined} />

                            {firstScreenData.type === "UNIDIRECTIONAL_WEIGHBRIDGE" || firstScreenData.type === "BIDIRECTIONAL_WEIGHBRIDGE_3_READER" || firstScreenData.type === "BIDIRECTIONAL_WEIGHBRIDGE" ? (
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

                    {/* Save Button */}
                    <View>
                        <CustomButton
                            label="Save"
                            onPress={handleSave}
                            disabled={!isFormValid()}
                        />
                    </View>
                </View>
            ) : (
                <ActivityIndicator size="large" style={{ flex: 1 }} />
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    headerTitle: {
        color: colors.darkblack,    
        fontSize: fontSizes.heading,
    },
    directionText: { color: colors.darkblack, paddingVertical: 10 }
});

export default WeighbridgesAddScreenSecound;
