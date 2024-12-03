import React, {useMemo, useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  TextInputProps,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../assets/color/colors';
import fontSizes from '../../assets/fonts/FontSize';
import { Colors2 } from '../../assets/color/Colors2';

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
  setTextInput: any;
  required: boolean;
  type?: 'input' | 'dropdown'; // New prop to define type
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
  type = 'input', // Default to 'input' type
  ...rest
}: CustomTextInputProps) {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const labelStyle = useMemo(() => {
    return [
      styles.label,
      isFocused || value ? styles.labelFocused : styles.labelBlurred,
    ];
  }, [isFocused, value]);

  const inputContainerStyle = useMemo(() => {
    return [
      styles.inputContainer,
      { borderColor: isFocused ? colors.AppPrimaryColor : '#ccc' }
    ];
  }, [isFocused]);


  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={labelStyle}>
          {label}
          <Text style={{color: colors.redDarkest}}> {required && '*'}</Text>
        </Text>
      )}
      <TouchableOpacity
        style={[{ flexDirection: "row", marginTop: 5 }, inputContainerStyle]}

        onPress={type === 'dropdown' && editable ? onPress : undefined} // Use onPress for dropdown only
        disabled={type === 'input' || editable} // Disable only if it's input or editable
        activeOpacity={type === 'dropdown' ? 0.7 : 1}>
        <TextInput
          style={{ fontSize: 20 }}
          onFocus={editable ? handleFocus : undefined}
          onBlur={editable ? handleBlur : undefined}
          onChangeText={text => setTextInput(text)}
          placeholder={placeholder}
          placeholderTextColor="black"
          value={value}
          editable={type === 'input' && editable} // Allow editing only if type is 'input' and editable
          {...rest}
        />
        {iconName && type === 'input' && (
          <Icon
            name={iconName}
            size={24}
            color={isFocused ? colors.AppPrimaryColor : 'black'}
            style={styles.icon}
            onPress={handleVisibility}
          />
        )}
        {type === 'dropdown' && (
          <Icon
            name="arrow-drop-down"
            size={30}
            color={Colors2.SecondaryTextColor}
            style={styles.icon}
            onPress={onPress}
          />
        )}
      </TouchableOpacity>
      <View
        style={isFocused ? styles.underlineFocused : styles.underlineBlurred}
      />
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderRadius: 10,
    // justifyContent: "center"
  },
  input: {
    fontSize: fontSizes.smallText,
    color: 'red',
    flexGrow: 1,
    alignItems: 'baseline'
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
    marginTop: -5,
    height: 2,
    backgroundColor: colors.AppPrimaryColor,
  },
  underlineBlurred: {
    marginTop: -8,
    height: 2,
    backgroundColor: '#ccc',
  },
  label: {
    position: 'absolute',
    fontSize: fontSizes.text,
    color: '#8292B4',
    backgroundColor: '#fff',
    paddingHorizontal: 3,
  },
  labelFocused: {
    top: -8,
    fontSize: fontSizes.text,
    color: colors.AppPrimaryColor,
    fontWeight: '500',
  },
  labelBlurred: {
    top: 12,
    fontSize: fontSizes.text,
    color: '#8292B4',
  },
});

export default CustomTextInput;
