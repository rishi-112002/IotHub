import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Text, TextInput, Keyboard, ActivityIndicator, Alert, TouchableOpacity, StatusBar, Animated, Easing } from "react-native";
import CustomTextInputInsideLable from "../reuseableComponent/customTextInput/CustomTextInputInsideLabel";
import CustomButton from "../reuseableComponent/customButton/CustomButton";
import { RootState, store } from "../reducer/Store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import colors from "../assets/color/colors";
import BusinessUnitModal from "../reuseableComponent/modal/BuinessUnitsModal";
import Icon from "react-native-vector-icons/MaterialIcons";
import { loginUser } from "../reducer/Login/LoginAction";
import NetInfo from "@react-native-community/netinfo";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/AppNavigation";
function LoginForm() {
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<any>({ name: '', code: '' });
  const { buinessunits } = useSelector((State: RootState) => State.buinessUnits);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [isDropDownVisible, setIsDropDownVisible] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [loader, setLoader] = useState(false);  // Loader state
  const loginStatus = useSelector((state: RootState) => state.loginUser.status);
  const [isFocused, setIsFocused] = useState(false);
  const baseUrls = useSelector((state: RootState) => state.authentication.baseUrl);
  const slideUpAnim = useRef(new Animated.Value(200)).current;

  const handleOptionSelected = (option: any) => {
    setSelectedOption(option);
    setIsButtonDisabled(false);
  };

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
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
      setLoader(true);
      const loginData = { username: userName, password: password, buCode: selectedOption.code };

      try {
        await store.dispatch(loginUser({ loginData, baseUrls }))
      } catch (error) {
        console.error("Login error: ", error);
        Alert.alert("Error", "Something went wrong");
      } finally {
        setLoader(false);
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

  const handleFocus = () => {
    Keyboard.dismiss();
    setIsFocused(true);
  };

  useEffect(() => {
    if (userName && password.length >= 8) {
      setIsDropDownVisible(true);
    } else {
      setIsDropDownVisible(false);
    }
  }, [userName, password]);
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
      await AsyncStorage.setItem('userName', userName);
      await AsyncStorage.setItem('buCode', selectedOption.code);
      setLoader(false);
    } else if (loginStatus === "failed") {
      Alert.alert("Warning", "Please fill proper details");
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
          <ActivityIndicator size="large" color={colors.blueDarkest} />
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
        <CustomTextInputInsideLable
          label="Username"
          value={userName}
          onChangeText={handleUserNameChange}
          errorMessage={errors.userName}
          placeHolder="enter your userName"
        />
        <CustomTextInputInsideLable
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!passwordVisible}
          errorMessage={errors.password}
          iconName={passwordVisible ? "visibility" : "visibility-off"}
          handleVisiblity={handleVisibityClick}
          placeHolder="enter your Password"
        />
        {isDropDownVisible && (
          <View>
            <Text style={styles.lableHeading}>Business Unit</Text>
            <View style={styles.inputContainer}>
              <TextInput
                value={selectedOption.name}
                placeholder="Select Business unit"
                style={styles.input}
                onFocus={handleFocus}
              />
              <Icon name="arrow-drop-down" size={30} color={colors.blueDarkest} style={styles.icon} />
            </View>
            <BusinessUnitModal
              businessUnits={buinessunits}
              isVisible={isFocused}
              handleCloseModal={handleCloseModal}
              handleOpenModal={handleOpenModal}
              onOptionSelected={handleOptionSelected}
              selectedOption={selectedOption.name}
            />
          </View>
        )}
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
