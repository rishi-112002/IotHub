import { Animated, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../../../reuseableComponent/customButton/CustomButton';
import CustomTextInput from '../../../reuseableComponent/customTextInput/CustomTextInput';
import CustomLoader from '../../../reuseableComponent/loader/CustomLoader';
import UrlEffect from './UrlEffect';
import UrlStyles from './UrlStyles';
import React from 'react';
import fontSizes from '../../../assets/fonts/FontSize';
import { IconName, Lable, Strings } from '../../../assets/constants/Lable';
import colors from '../../../assets/color/colors';

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
              name={IconName.ARROW_BACK}
              size={24}
              color={colors.white}
              style={styles.backIcon}
            />
          </TouchableOpacity>
        )}
        <Text style={styles.headerTitle}>{Strings.SERVER_CONFIGURATION}</Text>
      </View>
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{ translateY: slideUpAnim }],
          },
        ]}>
        {loading && <CustomLoader />}
        {!url && <Text style={styles.heading}>{Strings.WELCOME}</Text>}
        <View style={{ marginTop: 10, gap: 5 }}>
          <Text style={styles.sub_heading}>
            {Strings.SETUP_SERVER}
          </Text>
          <Text style={{ fontSize: fontSizes.smallText }}>
            {Strings.BASE_URL_DESCRIPTION}
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <CustomTextInput
            label={Lable.BASE_URL}
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
            label={Lable.SAVE}
            onPress={handleClick}
            disabled={false}
          />
        </View>
      </Animated.View>
    </View>
  );
}

export default UrlScreen;
