import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Text, Alert, TouchableOpacity, StatusBar, Animated, Easing } from "react-native";
import CustomButton from "../../reuseableComponent/customButton/CustomButton";
import { RootState, store } from "../../reducer/Store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import colors from "../../assets/color/colors";
import BusinessUnitModal from "../../reuseableComponent/modal/BuinessUnitsModal";
import { loginUser } from "../../reducer/Login/LoginAction";
import NetInfo from "@react-native-community/netinfo";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import CustomTextInput from "../../reuseableComponent/customTextInput/CustomTextInput";
import SuccessLoader from "../../reuseableComponent/loader/LoginSuccessLoader";
import { AppNavigationParams } from "../../navigation/NavigationStackList";
function LoginForm() {
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<any>({ name: '', code: '' });
  const { buinessunits } = useSelector((State: RootState) => State.buinessUnits);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [loader, setLoader] = useState(false);  // Loader state
  const loginStatus = useSelector((state: RootState) => state.loginUser.status);
  const error = useSelector((state: RootState) => state.loginUser.error);
  const [isFocused, setIsFocused] = useState(false);
  const baseUrls = useSelector((state: RootState) => state.authentication.baseUrl);
  const slideUpAnim = useRef(new Animated.Value(200)).current;

  const handleOptionSelected = (option: any) => {
    setSelectedOption(option);
    setIsButtonDisabled(false);
  };

  const navigation = useNavigation<NavigationProp<AppNavigationParams>>();
  const [errors, setErrors] = useState<{ userName?: string; password?: string }>({});

  const validateForm = () => {
    const newErrors: { userName?: string; password?: string } = {};

    if (!userName) {
      newErrors.userName = "Username is required";
    } else if (/\s/.test(userName)) {
      newErrors.userName = "Username cannot contain spaces";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password should be min of 8 characters";
    }

    setErrors(newErrors);
    setLoader(true);
    return Object.keys(newErrors).length === 0;
  };
  const handleUserNameChange = (input: string) => {
    const newValue = input.replace(/\s/g, '');
    if (input !== newValue) {
      setErrors((prev) => ({ ...prev, userName: "Username cannot contain spaces" }));
    } else {
      setErrors((prev) => ({ ...prev, userName: undefined }));
    }
    setUserName(newValue);
  };

  const handleLogin = async () => {
    const netInfo = await NetInfo.fetch();

    if (!netInfo.isConnected) {
      Alert.alert("No Internet Connection", "Please check your internet connection and try again.");
      setLoader(false);
      return;
    }
    if (validateForm()) {

      const loginData = { username: userName, password: password, buCode: selectedOption.code };

      try {
        await store.dispatch(loginUser({ loginData, baseUrls }))
      } catch (e) {
        console.error("Login error: ", error);
      }
    }
  };

  const handleVisibityClick = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleCloseModal = () => {
    setIsFocused(false);
  };

  const handleOpenModal = () => {
    setIsFocused(true);
  };
  useEffect(() => {
    Animated.timing(slideUpAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  }, []);
  const handleLoginStatus = async () => {
    if (loginStatus === "succeeded") {
      setLoader(false);
      navigation.navigate("HomeScreen")
    } else if (loginStatus === "failed") {
      Alert.alert("Error", " Your authentication information is incorrect. Please try again.");
      setLoader(false);
    }
  };
  useEffect(() => {
    handleLoginStatus();
  }, [loginStatus]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.AppPrimaryColor }}>
      <StatusBar backgroundColor={colors.AppPrimaryColor} />
      <Text style={{
        paddingTop: "5%", color: colors.white, fontSize: 20, fontWeight: "700",
        paddingBottom: "5%", paddingStart: 20
      }}>
        Sign In
      </Text>
      {loader && (
        <View style={styles.loaderContainer}>
          <SuccessLoader />
        </View>
      )}
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{ translateY: slideUpAnim }],
          },
        ]}
      >
        <Text style={styles.heading}>Welcome Back</Text>
        <Text style={styles.sub_heading}>Hey There, SignIn To Continue</Text>
        <CustomTextInput
          label="Username"
          value={userName}
          errorMessage={errors.userName}
          editable={true}
          setTextInput={handleUserNameChange} required={false} />
        <CustomTextInput
          label="Password"
          value={password}
          secureTextEntry={!passwordVisible}
          errorMessage={errors.password}
          iconName={passwordVisible ? "visibility" : "visibility-off"}
          handleVisibility={handleVisibityClick}
          editable={true}
          setTextInput={setPassword} required={false} />
        <View>
          <CustomTextInput
            value={selectedOption.name}
            setTextInput={undefined}
            label="Business Unit"
            editable={false}
            onPress={() => handleOpenModal()} required={false} />
          <BusinessUnitModal
            businessUnits={buinessunits}
            isVisible={isFocused}
            handleCloseModal={handleCloseModal}
            handleOpenModal={handleOpenModal}
            onOptionSelected={handleOptionSelected}
            selectedOption={selectedOption.name}
          />
        </View>

        <View style={styles.textContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('UrlScreen', { baseUrls });
            }}>
            <Text style={styles.subText}>
              Update BaseUrl.?
            </Text>
          </TouchableOpacity>
        </View>
        <CustomButton label="SignIn" onPress={handleLogin} disabled={isButtonDisabled} />
      </Animated.View>
    </View >
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
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  heading: {
    fontSize: 25,
    fontWeight: "800",
    color: colors.AppPrimaryColor,
    paddingTop: 10,
    paddingHorizontal: 10,
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
  sub_heading: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.darkblack,
    paddingTop: 5,
    paddingBottom: 50,
    paddingHorizontal: 17,
  },
  textContainer: {
    alignItems: "flex-end",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  subText: {
    fontSize: 15,
    color: colors.blueDarkest,
    fontWeight: "600",
  },
});

export default LoginForm;
