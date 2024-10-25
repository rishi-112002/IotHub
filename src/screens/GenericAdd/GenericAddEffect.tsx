import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigationProp, useNavigation } from "@react-navigation/native";

import { Alert, Text, View } from "react-native";
import { RootState } from "../../reducer/Store";
import { ApiCallsAddGenericSpot } from "../../api/ApiCallsByReducer";
import { resetDeleteStatus, resetStatus } from "../../reducer/genericSpot/uploadGenericDataReducer";
import React from "react";
import { StyleSheet } from "react-native";
import colors from "../../assets/color/colors";
import fontSizes from "../../assets/fonts/FontSize";

export const useGenericAddEffect = () => {
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();
    const navigation = useNavigation<NavigationProp<any>>();
    const uploadError = useSelector((state: RootState) => state.uploadGeneric.error);
    const deleteStatus = useSelector((state: RootState) => state.uploadGeneric.deleteStatus);
    const status = useSelector((state: RootState) => state.uploadGeneric.status);
    const baseUrls = useSelector((state: RootState) => state.authentication.baseUrl);

    useEffect(() => {
        ApiCallsAddGenericSpot({ baseUrl: baseUrls });
    }, [dispatch]);

    useEffect(() => {
        switch (status) {
            case "failed":
                if (uploadError) {
                    Alert.alert("Failed", uploadError);
                    dispatch(resetStatus());
                }
                break;
            case "succeeded":
                Alert.alert("Success", status);
                dispatch(resetStatus());
                navigation.goBack();
                break;
            case "loading":
                setLoader(true);
                break;
        }
    }, [uploadError, dispatch, status, navigation]);
    useEffect(() => {
        switch (deleteStatus) {
            case "failed":
                console.log("deleteStatus:", deleteStatus); // Make sure this logs the correct value
                Alert.alert("Failed");
                dispatch(resetDeleteStatus());
                setLoader(false); // Reset loader after failure
                break;
            case "succeeded":
                console.log("deleteStatus:", deleteStatus);
                Alert.alert("Success");
                dispatch(resetDeleteStatus());
                setLoader(false); // Reset loader after success
                break;
            case "loading":
                console.log("deleteStatus:", deleteStatus);
                setLoader(true); // Start loader when loading
                break;
            default:
                setLoader(false); // Ensure loader stops for any unexpected status
                break;
        }
    }, [dispatch, deleteStatus]);


    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <View>
                    <Text style={styles.headerTitle}> Add Generic Screen</Text>
                </View>
            ),
        });
    }, [navigation]);


    return { loader };
};
const styles = StyleSheet.create({
    headerTitle: {
        color: colors.darkblack,
        fontSize: fontSizes.heading,
    },
})
