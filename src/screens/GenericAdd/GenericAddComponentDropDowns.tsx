import { View } from "react-native";
import CustomTextInput from "../../reuseableComponent/customTextInput/CustomTextInput";
import React, { useCallback } from "react";

function GenericAddComponentDropDowns(props: { smartController: any, display: any, event: any, primaryReader: any, secoundryReader: any, eventId: any, setCurrentField: any, setModalVisible: any }) {
    const { display, event, primaryReader, secoundryReader, smartController, eventId, setModalVisible, setCurrentField } = props;
    const handleFocus = useCallback((field: string) => {
        setCurrentField(field);
        setModalVisible(true);
    }, []);

    return (
        <View>
            <CustomTextInput
                value={smartController}
                onPress={() => handleFocus('smartController')}
                style={{ flex: 1 }}
                label={"Smart Controller"} disable={false}
                editable={false} setTextInput={undefined} required={false} />
            <CustomTextInput
                value={display}
                style={{ flex: 1 }}
                onPress={() => handleFocus('display')}
                errorMessage={undefined}
                label={"Display"} disable={false}
                editable={false} setTextInput={undefined} required={false} />

            <CustomTextInput
                value={event}
                onPress={() => handleFocus('events')}
                style={{ flex: 1 }}
                label={"Event"} disable={false}
                editable={false} setTextInput={undefined} required={false} />

            <CustomTextInput
                value={primaryReader}
                onPress={() => handleFocus('primaryReader')}

                style={{ flex: 1 }}
                label={"Primary Reader"}
                disable={eventId === "NONE" ? true : false}
                editable={false} setTextInput={undefined} required={false} />


            <CustomTextInput
                style={{ flex: 1 }}
                value={secoundryReader}
                onPress={() => handleFocus('secoundaryReader')}
                label={"Secoundary Reader"}
                disable={eventId === "NONE" ? true : false}
                editable={false} setTextInput={undefined} required={false} />




        </View>


    )

}
export default GenericAddComponentDropDowns; 