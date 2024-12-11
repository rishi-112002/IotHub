import React from 'react';
import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle, TextStyle, View } from 'react-native';
import colors from '../../assets/color/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Strings } from '../../assets/constants/Lable';
import fontSizes from '../../assets/fonts/FontSize';

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
  labelStyle,
  disabled = false,
  loading = false,
  icon,
}: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, buttonStyle, disabled && styles.disabled]}
      disabled={disabled}
    >
      {loading ? (
        <Text style={[styles.label, labelStyle]}>`${Strings.LOADING}...`</Text>
      ) : (
        <View style={{ flexDirection: "row", columnGap: 10 }}>
          <Text style={[styles.label, labelStyle]}>{label}</Text>
          {icon && <Icon name={icon} size={20} color={colors.white} />}

        </View>

      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.AppPrimaryColor,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: colors.white,
    fontSize: fontSizes.title,
    fontWeight: 'bold',
  },
  disabled: {
    backgroundColor:colors.LightGray,
  },
});

export default CustomButton;
