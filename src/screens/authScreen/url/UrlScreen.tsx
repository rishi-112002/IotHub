import { Animated, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../../../reuseableComponent/customButton/CustomButton';
import CustomTextInput from '../../../reuseableComponent/customTextInput/CustomTextInput';
import CustomLoader from '../../../reuseableComponent/loader/CustomLoader';
import UrlEffect from './UrlEffect';
import UrlStyles from './UrlStyles';
import React from 'react';
import fontSizes from '../../../assets/fonts/FontSize';

function UrlScreen() {
  const {
    errors,
    handleClick,
    handleUrlChange,
    loading,
    navigation,
    setUrl,
    slideUpAnim,
    url } = UrlEffect();
  const { styles } = UrlStyles();
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
        <Text style={styles.headerTitle}>Server Configuration</Text>
      </View>
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{ translateY: slideUpAnim }],
          },
        ]}>
        {loading && <CustomLoader />}
        {!url && <Text style={styles.heading}>Welcome</Text>}
        <View style={{ marginTop: 10, gap: 5 }}>
          <Text style={styles.sub_heading}>
            Setup  Server
          </Text>
          <Text style={{ fontSize: fontSizes.smallText }}>
            Enter the server base url to setup and configure the app 
            according to your organisation .

          </Text>
        </View>
        <View style={styles.inputContainer}>
          <CustomTextInput
            label="Base Url"
            value={url}
            onChangeText={handleUrlChange}
            errorMessage={errors.url}
            setTextInput={setUrl}
            required={true}
            style={{ flex: 1 }}
          />
        </View>
        <View style={{ marginTop: 40 }}>
          <CustomButton
            label={'Save'}
            onPress={handleClick}
            disabled={false}
          />
        </View>
      </Animated.View>
    </View>
  );
}

export default UrlScreen;
