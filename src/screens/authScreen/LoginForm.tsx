import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Animated,
} from 'react-native';
import CustomButton from '../../reuseableComponent/customButton/CustomButton';
import colors from '../../assets/color/colors';
import BusinessUnitModal from '../../reuseableComponent/modal/BuinessUnitsModal';
import CustomTextInput from '../../reuseableComponent/customTextInput/CustomTextInput';
import SuccessLoader from '../../reuseableComponent/loader/LoginSuccessLoader';
import LoginEffect from './login/LoginEffect';
import React = require('react');
import LoginStyles from './login/LoginStyles';
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
  const {styles} = LoginStyles();
  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor={colors.AppPrimaryColor} />
      <Text style={styles.signInStyle}>Sign In</Text>
      {loader && (
        <View style={styles.loaderContainer}>
          <SuccessLoader />
        </View>
      )}
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{translateY: slideUpAnim}],
          },
        ]}>
        <Text style={styles.heading}>Welcome Back</Text>
        <Text style={styles.sub_heading}>Hey There, SignIn To Continue</Text>
        <CustomTextInput
          label="Username"
          value={userName}
          errorMessage={errors.userName}
          editable={true}
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
          setTextInput={setPassword}
          required={false}
        />
        <View>
          <CustomTextInput
            value={selectedOption.name}
            setTextInput={undefined}
            label="Business Unit"
            editable={false}
            onPress={() => handleOpenModal()}
            required={false}
          />
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
              navigation.navigate('UrlScreen', {baseUrls});
            }}>
            <Text style={styles.subText}>Update BaseUrl.?</Text>
          </TouchableOpacity>
        </View>
        <CustomButton
          label="SignIn"
          onPress={handleLogin}
          disabled={isButtonDisabled}
        />
      </Animated.View>
    </View>
  );
}

export default LoginForm;
