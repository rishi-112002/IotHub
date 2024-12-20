import { View } from 'react-native';
import CustomTextInput from '../../reuseableComponent/customTextInput/CustomTextInput';
import React, { useCallback } from 'react';
import { Strings } from '../../assets/constants/Lable';
import { ComponentStyles } from '../../styles/ComponentStyles';
function GenericAddComponentDropDowns(props: {
  smartController: any;
  display: any;
  event: any;
  primaryReader: any;
  secoundryReader: any;
  eventId: any;
  setCurrentField: any;
  setModalVisible: any;
  id: any;
  isActive: any;
  error: any,
}) {
  const {
    display,
    event,
    primaryReader,
    secoundryReader,
    smartController,
    eventId,
    setModalVisible,
    setCurrentField,
    id,
    isActive,
    error
  } = props;
  const handleFocus = useCallback(
    (field: string) => {
      setCurrentField(field);
      setModalVisible(true);
    },
    [setCurrentField, setModalVisible],
  );
  const { styles } = ComponentStyles();
  return (
    <View>
      <CustomTextInput
        value={smartController}
        onPress={() => handleFocus(Strings.SMART_CONTROLLER_S)}
        label={Strings.SMART_CONTROLLER}
        disable={false}
        type='dropdown'
        editable={!isActive || !id}
        setTextInput={undefined}
        required={false}
      />
      <CustomTextInput
        value={display}

        onPress={() => handleFocus(Strings.DISPLAY_s)}
        errorMessage={undefined}
        label={Strings.DISPLAY}
        disable={false}
        type='dropdown'
        editable={!isActive || !id}
        setTextInput={undefined}
        required={false}
      />

      <CustomTextInput
        value={event}
        onPress={() => handleFocus(Strings.EVENTS_S)}

        label={Strings.EVENT}
        disable={false}
        type='dropdown'
        editable={!isActive || !id}
        setTextInput={undefined}
        required={true}
        errorMessage={error.event}
      />
      {(eventId === Strings.TAG_ENTRY || eventId === Strings.TAG_ENTRY_AND_EXIT) && (
        <View>
          <CustomTextInput
            value={primaryReader}
            onPress={() => handleFocus(Strings.PRIMARY_READERS_S)}

            label={Strings.PRIMARY_READERS}
            disable={eventId === Strings.NONE ? true : false}
            type='dropdown'
            editable={!isActive || !id}
            setTextInput={undefined}
            required={true}
          />

          <CustomTextInput

            value={secoundryReader}
            onPress={() => handleFocus(Strings.SECOUNDARY_READERS_s)}
            label={Strings.SECOUNDARY_READERS}
            disable={eventId === Strings.NONE ? true : false}
            type='dropdown'
            editable={!isActive || !id}
            setTextInput={undefined}
            required={eventId !== Strings.TAG_ENTRY ? true : false}
          />
        </View>
      )}
    </View>
  );
}
export default GenericAddComponentDropDowns;
