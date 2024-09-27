import React from 'react';
import { TextInput, View, StyleSheet, TextInputProps, Text, StyleProp, ViewStyle, TextStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type CustomTextInputProps = {
  label?: string;
  containerStyle?: StyleProp<ViewStyle>; 
  inputStyle?: StyleProp<TextStyle>; 
  errorMessage?: string;
  iconName?: string; 
} & TextInputProps; 

function CustomTextInput({
  label = "hello",
  containerStyle,
  inputStyle,
  errorMessage="error",
  iconName ="location-on",
  ...rest 
}: CustomTextInputProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
        {iconName && (
          <Icon name={iconName} size={20} color="#333" style={styles.icon} />
        )}
        <TextInput style={[styles.input, inputStyle]} {...rest} />
      </View>
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    width: '100%',
  },
  label: {
    marginBottom: 4,
    color: '#333',
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
    color: '#333',
  },
  icon: {
    marginRight: 8,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});
export default CustomTextInput;
