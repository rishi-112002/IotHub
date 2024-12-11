import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Animated,
} from 'react-native';
import LoginStyles from './LoginStyles';
import React from 'react';
import colors from '../../../assets/color/colors';
import SuccessLoader from '../../../reuseableComponent/loader/LoginSuccessLoader';
import CustomTextInput from '../../../reuseableComponent/customTextInput/CustomTextInput';
import CustomButton from '../../../reuseableComponent/customButton/CustomButton';
import LoginEffect from "./LoginEffect"
import GenericModal from '../../../reuseableComponent/modal/GenralModal';
import { Lable, IconName, Strings } from '../../../assets/constants/Lable';
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
  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor={colors.HelperTextColor} />
      <Text style={styles.signInStyle}>{Lable.LOG_IN}</Text>
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
        <Text style={styles.heading}>{Strings.WELCOME_BACK}</Text>
        <View style={{ height: "10%" }}></View>
        <CustomTextInput
          label={Lable.USER_NAME}
          value={userName}
          errorMessage={errors.userName}
          editable={true}
          style={{ flex: 1, color: colors.PrimaryTextColor }}
          type='input'
          setTextInput={handleUserNameChange}
          required={false}
        />
        <CustomTextInput
          label={Lable.PASSWORD}
          value={password}
          secureTextEntry={!passwordVisible}
          errorMessage={errors.password}
          iconName={passwordVisible ? IconName.VISIBILITY : IconName.VISIBILITY_OFF}
          handleVisibility={handleVisibityClick}
          editable={true}
          style={{ flex: 1, color: colors.PrimaryTextColor }}
          type='input'
          setTextInput={setPassword}
          required={false}
        />
        <View>
          <CustomTextInput
            value={selectedOption.name}
            setTextInput={undefined}
            label={Lable.BUSINESS_UNIT}
            editable={false}
            type='dropdown'
            onPress={() => handleOpenModal()}
            style={{ flex: 1, color: colors.PrimaryTextColor }}

            required={false}
          />
          <GenericModal
            options={buinessunits}
            isVisible={isFocused}
            handleCloseModal={handleCloseModal}
            onOptionSelected={handleOptionSelected}
            nameKey={Strings.NAME_s}
            valueKey={"code"}
          />

        </View>
        <View style={{ marginTop: "10%" }}>

          <CustomButton
            label={Lable.LOG_IN}
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
              <Text style={styles.subText}>{Strings.UPDATE_CHANGE_SERVER}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

export default LoginForm;
