import React from 'react';
import { StyleSheet, View } from 'react-native';
import CustomTextInput from '../../reuseableComponent/customTextInput/CustomTextInput';
import SwitchWithLabel from '../../reuseableComponent/switch/SwitchWithLable';
import { Colors2 } from '../../assets/color/Colors2';

function GenericAddInputComponent(props: {
  formData: any;
  isActive: any;
  onChangeValue: any;
  handleInputChange: any;
  errors: any;
  id: any,
  handleNameChange: any;
  handleDriverTagChange: any
}) {
  const { formData, handleInputChange, isActive, onChangeValue, errors, id, handleDriverTagChange,handleNameChange } = props;
  return (
    <View>
      <CustomTextInput
        label="Name"
        value={formData.name}
        editable={!isActive || !id}
        type='input'
        style={style.input}
        errorMessage={errors.name}
        keyboardType="default"
        returnKeyType="next"
        setTextInput={handleNameChange}
        required={true}
      />
      <SwitchWithLabel
        value={isActive}
        onChangeValue={onChangeValue}
        label={'Active'}
      />

      <CustomTextInput
        label="Delay alert after (milliSeconds)"
        value={formData.delay}
        editable={!isActive || !id}
        type='input'
        style={style.input}
        errorMessage={errors.delay}
        keyboardType="numeric"
        returnKeyType="next"
        setTextInput={handleDriverTagChange}
        required={true}
      />
      <CustomTextInput
        label="Valid Id state"
        style={style.input}
        value={formData.validId}
        editable={!isActive || !id}
        type='input'
        returnKeyType="next"
        setTextInput={(value: any) => handleInputChange('validId', value)}
        required={false}
      />

      <CustomTextInput
        label="Min Tag Count"
        style={style.input}
        value={formData.minTagCount}
        keyboardType="numeric"
        editable={!isActive || !id}
        type='input'
        setTextInput={(value: any) => handleInputChange('minTagCount', value)}
        required={false}
      />
    </View>
  );
}
const style = StyleSheet.create({
  input: {
    flex: 1,
    color: Colors2.PrimaryTextColor
  },
});
export default GenericAddInputComponent;
