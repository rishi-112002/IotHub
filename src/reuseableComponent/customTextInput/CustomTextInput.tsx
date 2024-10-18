import React, { useMemo, useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, ViewStyle, TextStyle, TextInputProps } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../assets/color/colors';
import fontSizes from '../../assets/fonts/FontSize';

type CustomTextInputProps = {
  label?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  errorMessage?: string;
  iconName?: string;
  handleVisibility?: () => void;
  placeholder?: string;
  editable?: boolean;
  onPress?: () => void;
  disable?: boolean;
  setTextInput: any
  required: boolean
} & TextInputProps;

function CustomTextInput({
  label,
  containerStyle,
  inputStyle,
  errorMessage,
  iconName,
  handleVisibility,
  placeholder,
  editable = true,
  onPress,
  disable = false,
  value,
  setTextInput,
  required = false,
  errorMessage: error,
  ...rest
}: CustomTextInputProps) {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const labelStyle = useMemo(() => {
    return [styles.label, (isFocused || value) ? styles.labelFocused : styles.labelBlurred];
  }, [isFocused, value]);

  const inputContainerStyle = useMemo(() => {
    return [styles.inputContainer, { borderColor: isFocused ? colors.blueLighter : '#ccc' }];
  }, [isFocused]);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={labelStyle}>{label}<Text style={{ color: colors.redDarkest }}>{" "}{required && "*"}</Text></Text>}
      <TouchableOpacity
        style={inputContainerStyle}
        onPress={editable ? undefined : onPress}
        disabled={editable ? false : disable}
        activeOpacity={editable ? 1 : 0.7}
      >
        <TextInput
          style={[styles.input, inputStyle]}
          onFocus={editable ? handleFocus : undefined}
          onBlur={editable ? handleBlur : undefined}
          onChangeText={(text) => setTextInput(text)}
          placeholder={placeholder}
          placeholderTextColor="#8292B4"
          value={editable ? value : value}
          editable={editable}
          {...rest}
        />
        {iconName && (
          <Icon name={iconName} size={24} color={isFocused ? colors.AppPrimaryColor : "#666"} style={styles.icon} onPress={handleVisibility} />
        )}
        {!editable && <Icon name="arrow-drop-down" size={30} color={colors.blueDarkest} style={styles.icon} />}
      </TouchableOpacity>
      <View style={isFocused ? styles.underlineFocused : styles.underlineBlurred} />
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderRadius: 10,
  },
  input: {
    flex: 1,
    fontSize: fontSizes.vSmallText,
    color: '#262626',
  },
  icon: {
    marginLeft: 8,
  },
  errorText: {
    color: 'red',
    fontSize: fontSizes.smallText,
    marginTop: 4,
  },
  underlineFocused: {
    height: 2,
    backgroundColor: colors.blueLighter,
  },
  underlineBlurred: {
    height: 2,
    backgroundColor: '#ccc',
  },
  label: {
    position: 'absolute',
    top: 12,
    fontSize: fontSizes.subheading,
    color: '#8292B4',
    backgroundColor: '#fff',
    paddingHorizontal: 5,
  },
  labelFocused: {
    top: -8,
    fontSize: 12,
    color: colors.AppPrimaryColor,
    fontWeight: '500',
  },
  labelBlurred: {
    top: 12,
    fontSize: 16,
    color: '#8292B4',
  },
});

export default CustomTextInput;
