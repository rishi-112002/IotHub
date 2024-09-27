import React, { useEffect, useState, useRef } from "react";
import {
    Alert,
    Animated,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Easing,
    ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { RootState } from "../reducer/Store";
import { setBaseUrl } from "../reducer/Login/LoginReducer";
import { fetchConfigDetails } from "../api/Api";
import CustomTextInputInsideLable from "../reuseableComponent/customTextInput/CustomTextInputInsideLabel";
import CustomButton from "../reuseableComponent/customButton/CustomButton";
import colors from "../assets/color/colors";
import { RootStackParamList } from "../navigation/AppNavigation";

interface urlScreenParams {
    baseUrls: string;
}

function UrlScreen() {
    const route = useRoute<RouteProp<{ params: urlScreenParams }, 'params'>>();
    const passedBaseUrl = route.params?.baseUrls || "";
    const [url, setUrl] = useState(passedBaseUrl);
    const isLogedIn = useSelector((state: RootState) => state.authentication.isLogedIn);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const dispatch = useDispatch();
    const [errors, setErrors] = useState<{ url?: string }>({});
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
    const slideUpAnim = useRef(new Animated.Value(200)).current;
    const [loading, setLoading] = useState(false)


    const handleUrlChange = (input: string) => {
        const newValue = input.replace(/\s/g, "");
        if (input !== newValue) {
            setErrors((prev) => ({ ...prev, url: "URL cannot contain spaces" }));
        } else {
            setErrors((prev) => ({ ...prev, url: undefined }));
        }
        setUrl(newValue);

        if (newValue.startsWith("http://") || newValue.startsWith("https://")) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    };

    const handleClick = async () => {
        const newErrors: { url?: string } = {};

        if (!url) {
            newErrors.url = "Please enter the URL";
        } else {
            setLoading(true);
            try {
                if (await fetchConfigDetails(url)) {
                    await AsyncStorage.setItem("baseurl", url);
                    dispatch(setBaseUrl(url));
                    if (url === passedBaseUrl) {
                        if (isLogedIn) {
                            navigation.navigate("HomeScreen");
                        } else {
                            navigation.navigate("LoginScreen");
                        }
                    } else {
                        navigation.navigate("LoginScreen");
                    }
                } else {
                    Alert.alert("Error", "Please check the URL and try again.");
                }
            } catch (error) {
                Alert.alert("Error", "Failed to fetch configuration. Please check the URL and try again.");
            } finally {
                setLoading(false); // Hide loader after processing
            }
        }

        setErrors(newErrors);
    };

    useEffect(() => {
        Animated.timing(slideUpAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
            easing: Easing.out(Easing.ease),
        }).start();
    }, []);
    useEffect(() => {
        if (url) {
            setIsButtonDisabled(false)
        }
    })

    return (
        <View style={{ flex: 1, backgroundColor: colors.AppPrimaryColor }}>
            <View style={{ flexDirection: "row", paddingBottom: "5%", paddingStart: 10, paddingTop: "5%" }}>
                {url && (
                    <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
                        <MaterialIcons name="arrow-back" size={24} color="white" style={styles.backIcon} />
                    </TouchableOpacity>
                )}
                <Text style={styles.headerTitle}>BaseUrl</Text>
            </View>
            <Animated.View
                style={[
                    styles.container,
                    {
                        transform: [{ translateY: slideUpAnim }],
                    },
                ]}
            >
                {loading && <ActivityIndicator size={30} style={{ flex: 1, justifyContent: "center" }} />}
                {!url && <Text style={styles.heading}>Welcome</Text>}
                <Text style={styles.sub_heading}>Please Enter Base Url To Continue</Text>
                <View style={styles.inputContainer}>
                    <CustomTextInputInsideLable
                        label="BaseUrl"
                        value={url}
                        onChangeText={handleUrlChange}
                        errorMessage={errors.url}
                    />
                </View>
                <Text>You will be able to view and manage data once you enter a valid base URL.</Text>
                <View style={styles.customButtonContainer}>
                    <CustomButton label={"Save"} onPress={handleClick} disabled={isButtonDisabled} />
                </View>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        backgroundColor: "white",
        borderTopEndRadius: 25,
        borderTopStartRadius: 25,
    },
    inputContainer: {
        paddingTop: 30,
    },
    heading: {
        fontSize: 25,
        fontWeight: "700",
        color: colors.darkblack,
        paddingTop: 10,
        paddingHorizontal: 10,
    },
    sub_heading: {
        fontSize: 18,
        paddingTop: 10,
        fontWeight: "600",
        color: colors.darkblack,
        paddingHorizontal: 10,
        paddingBottom: 15,
    },
    customButtonContainer: {
        paddingTop: "70%",
    },
    backIcon: {
        marginRight: 15,
    },
    headerTitle: {
        color: colors.white,
        fontSize: 20,
        fontWeight: "700",
    },
});

export default UrlScreen;
