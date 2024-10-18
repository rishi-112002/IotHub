import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigationProp, useNavigation } from "@react-navigation/native";

import { Alert, Text, View } from "react-native";
import { RootState } from "../../reducer/Store";
import { ApiCallsAddGenericSpot } from "../../api/ApiCallsByReducer";
import { resetStatus } from "../../reducer/uploadGenericData/uploadGenericDataReducer";
import React from "react";
import { StyleSheet } from "react-native";
import colors from "../../assets/color/colors";
import fontSizes from "../../assets/fonts/FontSize";

export const useGenericAddEffect = () => {
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();
    const navigation = useNavigation<NavigationProp<any>>();
    const uploadError = useSelector((state: RootState) => state.uploadGeneric.error);
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
