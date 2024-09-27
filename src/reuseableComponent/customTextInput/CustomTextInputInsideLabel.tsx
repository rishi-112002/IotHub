import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, StyleProp, ViewStyle, TextStyle, Animated, TextInputProps } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../assets/color/colors';

type CustomTextInputProps = {
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  errorMessage?: string;
  iconName?: string;
  handleVisiblity?: any
  placeHolder?: string
} & TextInputProps;

function CustomTextInputInsideLabel({
  label,
  containerStyle,
  inputStyle,
  errorMessage,
  iconName,
  handleVisiblity,
  placeHolder,
  ...rest
}: CustomTextInputProps) {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [text, setText] = useState<string>('');

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.lableHeading}>
        {label}
      </Text>
      <View style={[styles.inputContainer, { borderColor: isFocused ? colors.blueLighter : '#ccc' }]}>

        <TextInput
          style={[styles.input, inputStyle , {fontSize :15}]}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={(input) => {
            setText(input);
            rest.onChangeText?.(input);
          }}
          value={text}
          placeholder={placeHolder}
          {...rest}
          placeholderTextColor={"gray"}
        />
        {iconName && <Icon name={iconName} size={20} color="#333" style={styles.icon} onPress={handleVisiblity} />}
      </View>
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    width: '100%',
  },
  inputContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
  },
  input: {
    flex: 1,
    color: "black",
    borderRadius: 10,
    alignItems: 'center',
    alignContent: 'center',
    paddingStart: 10,
    paddingLeft: 15
  },
  icon: {
    marginRight: 8,
  },
  lableHeading: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.darkblack
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});

export default CustomTextInputInsideLabel;
