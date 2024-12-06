import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Animated,
} from 'react-native';
import LoginStyles from './LoginStyles';
import React, { useEffect } from 'react';
import colors from '../../../assets/color/colors';
import SuccessLoader from '../../../reuseableComponent/loader/LoginSuccessLoader';
import CustomTextInput from '../../../reuseableComponent/customTextInput/CustomTextInput';
import BusinessUnitModal from '../../../reuseableComponent/modal/BuinessUnitsModal';
import CustomButton from '../../../reuseableComponent/customButton/CustomButton';
import LoginEffect from "../../../screens/authScreen/login/LoginEffect"
import { Colors2 } from '../../../assets/color/Colors2';
import GenericModal from '../../../reuseableComponent/modal/GenralModal';
function LoginForm() {
  const {
    loader,
    userName,
    errors,
    handleUserNameChange,
    password,
    passwordVisible,
    handleCloseModal,
    handleVisibityClick,
    setPassword,
    slideUpAnim,
    buinessunits,
    isFocused,
    handleOpenModal,
    handleOptionSelected,
    selectedOption,
    baseUrls,
    navigation,
    handleLogin,
    isButtonDisabled,
  } = LoginEffect();
  const { styles } = LoginStyles();
  useEffect(() => {

  }, [])
  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor={Colors2.HelperTextColor} />
      <Text style={styles.signInStyle}>{"Log In"}</Text>
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
        ]}>
        <Text style={styles.heading}>Welcome Back</Text>
        <View style={{ height: "10%" }}></View>
        <CustomTextInput
          label="User name"
          value={userName}
          errorMessage={errors.userName}
          editable={true}
          style={{ flex: 1, color: Colors2.PrimaryTextColor }}
          type='input'
          setTextInput={handleUserNameChange}
          required={false}
        />
        <CustomTextInput
          label="Password"
          value={password}
          secureTextEntry={!passwordVisible}
          errorMessage={errors.password}
          iconName={passwordVisible ? 'visibility' : 'visibility-off'}
          handleVisibility={handleVisibityClick}
          editable={true}
          style={{ flex: 1, color: Colors2.PrimaryTextColor }}

          type='input'
          setTextInput={setPassword}
          required={false}
        />
        <View>
          <CustomTextInput
            value={selectedOption.name}
            setTextInput={undefined}
            label="Business unit"
            editable={false}
            type='dropdown'
            onPress={() => handleOpenModal()}
            style={{ flex: 1, color: Colors2.PrimaryTextColor }}

            required={false}
          />
          <GenericModal
            options={buinessunits}
            isVisible={isFocused}
            handleCloseModal={handleCloseModal}
            onOptionSelected={handleOptionSelected}
            nameKey="name"
            valueKey="value"
          />

        </View>
        <View style={{ marginTop: "10%" }}>

          <CustomButton
            label="Log In"
            onPress={handleLogin}
            disabled={isButtonDisabled}
          />
          <View style={styles.dividerContainer}>
            <View style={styles.line} />
            <Text style={styles.orText}>or</Text>
            <View style={styles.line} />
          </View>
          <View style={{ borderWidth: 1, borderColor: colors.AppPrimaryColor, marginTop: 20, alignItems: 'center', padding: 5, borderRadius: 20 }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('UrlScreen', { baseUrls });
              }}>
              <Text style={styles.subText}>Update/Change Server</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

export default LoginForm;
