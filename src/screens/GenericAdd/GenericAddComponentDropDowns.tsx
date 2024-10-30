import {StyleSheet, View} from 'react-native';
import CustomTextInput from '../../reuseableComponent/customTextInput/CustomTextInput';
import React, {useCallback} from 'react';

function GenericAddComponentDropDowns(props: {
  smartController: any;
  display: any;
  event: any;
  primaryReader: any;
  secoundryReader: any;
  eventId: any;
  setCurrentField: any;
  setModalVisible: any;
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
        onPress={() => handleFocus('smartController')}
        style={style.input}
        label={'Smart Controller'}
        disable={false}
        editable={false}
        setTextInput={undefined}
        required={false}
      />
      <CustomTextInput
        value={display}
        style={style.input}
        onPress={() => handleFocus('display')}
        errorMessage={undefined}
        label={'Display'}
        disable={false}
        editable={false}
        setTextInput={undefined}
        required={false}
      />

      <CustomTextInput
        value={event}
        onPress={() => handleFocus('events')}
        style={style.input}
        label={'Event'}
        disable={false}
        editable={false}
        setTextInput={undefined}
        required={false}
      />
      {eventId !== 'NONE' && (
        <View>
          <CustomTextInput
            value={primaryReader}
            onPress={() => handleFocus('primaryReader')}
            style={style.input}
            label={'Primary Reader'}
            disable={eventId === 'NONE' ? true : false}
            editable={false}
            setTextInput={undefined}
            required={true}
          />

          <CustomTextInput
            style={style.input}
            value={secoundryReader}
            onPress={() => handleFocus('secoundaryReader')}
            label={'Secoundary Reader'}
            disable={eventId === 'NONE' ? true : false}
            editable={false}
            setTextInput={undefined}
            required={eventId !== 'TAG_ENTRY' ? true : false}
          />
        </View>
      )}
    </View>
  );
}
const style = StyleSheet.create({
  input: {
    flex: 1,
  },
});
export default GenericAddComponentDropDowns;
