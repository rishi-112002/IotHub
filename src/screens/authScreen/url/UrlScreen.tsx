import React = require('react');
import {Animated, Text, TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../../../reuseableComponent/customButton/CustomButton';
import CustomTextInput from '../../../reuseableComponent/customTextInput/CustomTextInput';
import CustomLoader from '../../../reuseableComponent/loader/CustomLoader';
import UrlEffect from './UrlEffect';
import UrlStyles from './UrlStyles';

function UrlScreen() {
  const {
    errors,
    handleClick,
    handleUrlChange,
    isButtonDisabled,
    loading,
    navigation,
    setUrl,
    slideUpAnim,
    url,
  } = UrlEffect();
  const {styles} = UrlStyles();
  return (
    <View style={styles.mainContainer}>
      <View style={styles.row}>
        {url && (
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <MaterialIcons
              name="arrow-back"
              size={24}
              color="white"
              style={styles.backIcon}
            />
          </TouchableOpacity>
        )}
        <Text style={styles.headerTitle}>BaseUrl</Text>
      </View>
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{translateY: slideUpAnim}],
          },
        ]}>
        {loading && <CustomLoader />}
        {!url && <Text style={styles.heading}>Welcome</Text>}
        <Text style={styles.sub_heading}>
          Please Enter Base Url To Continue
        </Text>
        <View style={styles.inputContainer}>
          <CustomTextInput
            label="BaseUrl"
            value={url}
            onChangeText={handleUrlChange}
            errorMessage={errors.url}
            setTextInput={setUrl}
            required={true}
          />
        </View>
        <Text>
          You will be able to view and manage data once you enter a valid base
          URL.
        </Text>
        <View style={styles.customButtonContainer}>
          <CustomButton
            label={'Save'}
            onPress={handleClick}
            disabled={isButtonDisabled}
          />
        </View>
      </Animated.View>
    </View>
  );
}

export default UrlScreen;
