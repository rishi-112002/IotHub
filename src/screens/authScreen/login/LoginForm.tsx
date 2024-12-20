import {View, Text, TouchableOpacity, StatusBar, Animated} from 'react-native';
import { STYLES } from '../../ScreensStyles';
import React from 'react';
import colors from '../../../assets/color/colors';
import SuccessLoader from '../../../reuseableComponent/loader/LoginSuccessLoader';
import CustomTextInput from '../../../reuseableComponent/customTextInput/CustomTextInput';
import CustomButton from '../../../reuseableComponent/customButton/CustomButton';
import LoginEffect from './LoginEffect';
import GenericModal from '../../../reuseableComponent/modal/GenralModal';
import {Lable, IconName, Strings} from '../../../assets/constants/Lable';
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
  return (
    <View style={STYLES.mainContainer}>
      <StatusBar backgroundColor={colors.HelperTextColor} />
      <Text style={STYLES.Login_signInStyle}>{Lable.LOG_IN}</Text>
      {loader && (
        <View style={STYLES.Login_loaderContainer}>
          <SuccessLoader />
        </View>
      )}
      <Animated.View
        style={[
          STYLES.Login_container,
          {
            transform: [{translateY: slideUpAnim}],
          },
        ]}>
        <Text style={STYLES.Login_heading}>{Strings.WELCOME_BACK}</Text>
        <View style={{height: '10%'}}></View>
        <CustomTextInput
          label={Lable.USER_NAME}
          value={userName}
          errorMessage={errors.userName}
          editable={true}
          style={STYLES.Login_Custom_Input_Style}
          type="input"
          setTextInput={handleUserNameChange}
          required={false}
        />
        <CustomTextInput
          label={Lable.PASSWORD}
          value={password}
          secureTextEntry={!passwordVisible}
          errorMessage={errors.password}
          iconName={
            passwordVisible ? IconName.VISIBILITY : IconName.VISIBILITY_OFF
          }
          handleVisibility={handleVisibityClick}
          editable={true}
          style={STYLES.Login_Custom_Input_Style}
          type="input"
          setTextInput={setPassword}
          required={false}
        />
        <View>
          <CustomTextInput
            value={selectedOption.name}
            setTextInput={undefined}
            label={Lable.BUSINESS_UNIT}
            editable={false}
            type="dropdown"
            onPress={() => handleOpenModal()}
            style={STYLES.Login_Custom_Input_Style}
            required={false}
          />
          <GenericModal
            options={buinessunits}
            isVisible={isFocused}
            handleCloseModal={handleCloseModal}
            onOptionSelected={handleOptionSelected}
            nameKey={Strings.NAME_s}
            valueKey={'code'}
          />
        </View>
        <View style={{marginTop: '10%'}}>
          <CustomButton
            label={Lable.LOG_IN}
            onPress={handleLogin}
            disabled={isButtonDisabled}
          />
          <View style={STYLES.Login_dividerContainer}>
            <View style={STYLES.Login_line} />
            <Text style={STYLES.Login_orText}>or</Text>
            <View style={STYLES.Login_line} />
          </View>
          <View
            style={STYLES.Login_Button}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('UrlScreen', {baseUrls});
              }}>
              <Text style={STYLES.Login_subText}>{Strings.UPDATE_CHANGE_SERVER}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

export default LoginForm;
