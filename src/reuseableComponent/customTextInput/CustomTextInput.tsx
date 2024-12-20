import React, { useMemo, useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  TextInputProps,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../assets/color/colors';
import fontSizes from '../../assets/fonts/FontSize';
import { IconName } from '../../assets/constants/Lable';
import { InputStyles } from '../../styles/InputStyles';
import { TextStyles } from '../../styles/TextStyles';

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
  errorMessage,
  iconName,
  handleVisibility,
  placeholder,
  editable = true,
  onPress,
  value,
  setTextInput,
  required = false,
  type = 'input', // Default to 'input' type
}: CustomTextInputProps) {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const { textStyles } = TextStyles();
  const { inputStyles } = InputStyles();;
  const labelStyle = useMemo(() => {

    return [
      textStyles.CustomInputLabel,
      isFocused || value ? textStyles.CustomInputLabelFocused : textStyles.CustomInputLabelBlurred,
    ];
  }, [isFocused, value]);

  const inputContainerStyle = useMemo(() => {
    return [
      inputStyles.CustomInputInputContainer,
      { borderColor: isFocused ? colors.AppPrimaryColor : colors.SoftGray }
    ];
  }, [isFocused]);


  return (
    <View style={{ marginVertical: 7 }}>
      {label && (
        <Text style={labelStyle}>
          {label}
          <Text style={{ color: colors.redDarkest }}> {required && '*'}</Text>
        </Text>
      )}
      <TouchableOpacity
        style={[inputContainerStyle]}
        onPress={type === 'dropdown' && editable ? onPress : undefined} // Use onPress for dropdown only
        disabled={type === 'input' || editable} // Disable only if it's input or editable
        activeOpacity={type === 'dropdown' ? 0.7 : 1}>
        <TextInput
          style={{ fontSize: fontSizes.text, flex: 1, color: colors.darkblack }}
          onFocus={editable ? handleFocus : undefined}
          onBlur={editable ? handleBlur : undefined}
          onChangeText={text => setTextInput(text)}
          placeholder={placeholder}
          placeholderTextColor={colors.darkblack}
          value={value}
          editable={type === 'input' && editable} // Allow editing only if type is 'input' and editable
        />
        {iconName && type === 'input' && (
          <Icon
            name={iconName}
            size={24}
            color={isFocused ? colors.AppPrimaryColor : colors.darkblack}
            style={inputStyles.CustomInputIcon}
            onPress={handleVisibility}
          />
        )}
        {type === 'dropdown' && (
          <Icon
            name={IconName.ARROW_DROP_DOWN}
            size={30}
            color={colors.SecondaryTextColor}
            style={inputStyles.CustomInputIcon}
            onPress={onPress}
          />
        )}
      </TouchableOpacity>
      <View
        style={isFocused ? inputStyles.CustomInputUnderlineFocused : inputStyles.CustomInputUnderlineBlurred}
      />
      {errorMessage && <Text style={textStyles.CustomInputErrorText}>{errorMessage}</Text>}
    </View>
  );
}
export default CustomTextInput;
