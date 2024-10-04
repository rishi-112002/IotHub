import React, { useMemo, useState } from 'react';
import { View, TextInput, StyleSheet, Text, StyleProp, ViewStyle, TextStyle, TextInputProps } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../assets/color/colors';
import fontSizes from '../../assets/fonts/FontSize';

type CustomTextInputProps = {
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  errorMessage?: string;
  iconName?: string;
  handleVisibility?: () => void;
  placeholder?: string;
} & TextInputProps;

function CustomTextInputInsideLabel({
  label,
  containerStyle,
  inputStyle,
  errorMessage,
  iconName,
  handleVisibility,
  placeholder,
  ...rest
}: CustomTextInputProps) {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [text, setText] = useState<string>('');

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const labelStyle = useMemo(() => {
    return [styles.label, (isFocused || text) ? styles.labelFocused : styles.labelBlurred];
  }, [isFocused, text]);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={labelStyle}>{label}</Text>}
      <View style={[styles.inputContainer, { borderColor: isFocused ? colors.blueLighter : '#ccc' }]}>
        <TextInput
          style={[styles.input, inputStyle]}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={(input) => {
            setText(input);
            rest.onChangeText?.(input);
          }}
          placeholder={placeholder}
          placeholderTextColor="#8292B4"
          value={text}
          {...rest}
        />
        {iconName && (
          <Icon name={iconName} size={24} color={isFocused ? colors.blueLighter : "#666"} style={styles.icon} onPress={handleVisibility} />
        )}
      </View>
      <View style={isFocused ? styles.underlineFocused : styles.underlineBlurred} />
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    fontSize: fontSizes.text,
    paddingVertical: 10,
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
    height: 1,
    backgroundColor: '#ccc',
  },
  label: {
    position: 'absolute',
    left: 10,
    top: 12,
    fontSize: fontSizes.subheading,
    color: '#8292B4',
    backgroundColor: '#fff',
    paddingHorizontal: 5,
  },
  labelFocused: {
    top: -8,
    fontSize: 12,
    color: colors.blueLighter,
    fontWeight: '500',
  },
  labelBlurred: {
    top: 12,
    fontSize: 16,
    color: '#8292B4',
  },
});

export default CustomTextInputInsideLabel;
