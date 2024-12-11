import { StyleSheet, View } from 'react-native';
import CustomTextInput from '../../reuseableComponent/customTextInput/CustomTextInput';
import React, { useCallback } from 'react';
import { Strings } from '../../assets/constants/Lable';
import colors from '../../assets/color/colors';
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

  return (
    <View>
      <CustomTextInput
        value={smartController}
        onPress={() => handleFocus(Strings.SMART_CONTROLLER_S)}
        style={style.input}
        label={Strings.SMART_CONTROLLER}
        disable={false}
        type='dropdown'
        editable={!isActive || !id}
        setTextInput={undefined}
        required={false}
      />
      <CustomTextInput
        value={display}
        style={style.input}
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
        style={style.input}
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
            style={style.input}
            label={Strings.PRIMARY_READERS}
            disable={eventId === Strings.NONE ? true : false}
            type='dropdown'
            editable={!isActive || !id}
            setTextInput={undefined}
            required={true}
          />

          <CustomTextInput
            style={style.input}
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
const style = StyleSheet.create({
  input: {
    flex: 1,
    color: colors.PrimaryTextColor
  },
});
export default GenericAddComponentDropDowns;
