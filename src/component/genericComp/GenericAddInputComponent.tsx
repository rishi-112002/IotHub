import React from 'react';
import { View } from 'react-native';
import CustomTextInput from '../../reuseableComponent/customTextInput/CustomTextInput';
import SwitchWithLabel from '../../reuseableComponent/switch/SwitchWithLable';
import { Strings } from '../../assets/constants/Lable';
import { ComponentStyles } from '../../styles/ComponentStyles';
import { TextStyles } from '../../styles/TextStyles';
import { ButtonStyles } from '../../styles/ButtonStyles';
import { CardStyles } from '../../styles/CardStyles';
import { ContainerStyles } from '../../styles/ContainerStyles';

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
  const { formData, handleInputChange, isActive, onChangeValue, errors, id, handleDriverTagChange, handleNameChange } = props;
  return (
    <View>
      <CustomTextInput
        label={Strings.NAME_S}
        value={formData.name}
        editable={!isActive || !id}
        type='input'
        errorMessage={errors.name}
        keyboardType="default"
        returnKeyType="next"
        setTextInput={handleNameChange}
        required={true}
      />
      <SwitchWithLabel
        value={isActive}
        onChangeValue={onChangeValue}
        label={Strings.ACTIVE}
      />

      <CustomTextInput
        label={Strings.DELAY_ALERT_AFTER}
        value={formData.delay}
        editable={!isActive || !id}
        type='input'
        errorMessage={errors.delay}
        keyboardType="numeric"
        returnKeyType="next"
        setTextInput={handleDriverTagChange}
        required={true}
      />
      <CustomTextInput
        label={Strings.VALID_ID_STATE}
        value={formData.validId}
        editable={!isActive || !id}
        type='input'
        returnKeyType="next"
        setTextInput={(value: any) => handleInputChange(Strings.VALID_ID, value)}
        required={false}
      />

      <CustomTextInput
        label={Strings.MIN_TAG_COUNT}
        value={formData.minTagCount}
        keyboardType="numeric"
        editable={!isActive || !id}
        type='input'
        setTextInput={(value: any) => handleInputChange(Strings.MIN_TAG_COUNT_S, value)}
        required={false}
      />
    </View>
  );
}
export default GenericAddInputComponent;
