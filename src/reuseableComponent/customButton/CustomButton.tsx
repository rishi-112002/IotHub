import React from 'react';
import { TouchableOpacity, Text, StyleProp, ViewStyle, TextStyle, View } from 'react-native';
import colors from '../../assets/color/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Strings } from '../../assets/constants/Lable';
import { ButtonStyles } from '../../styles/ButtonStyles';
import { ContainerStyles } from '../../styles/ContainerStyles';
import { TextStyles } from '../../styles/TextStyles';

type ButtonProps = {
  label: string;
  onPress: () => void;
  buttonStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  loading?: boolean;
  icon?: any
}

function CustomButton({
  label,
  onPress,
  buttonStyle,
  disabled = false,
  loading = false,
  icon,
}: ButtonProps) {
    const { buttonStyles } = ButtonStyles();
    const { textStyles } = TextStyles();
    const { containerStyles } = ContainerStyles();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[buttonStyles.button, buttonStyle, disabled && buttonStyles.buttonDisabled]}
      disabled={disabled}
    >
      {loading ? (
        <Text style={[textStyles.label]}>`${Strings.LOADING}...`</Text>
      ) : (
        <View style={containerStyles.spotIconContainer}>
          <Text style={[textStyles.label, { color: colors.white }]}>{label}</Text>
          {icon && <Icon name={icon} size={20} color={colors.white} />}

        </View>

      )}
    </TouchableOpacity>
  );
}


export default CustomButton;
