import React from "react";
import { View } from "react-native";
import CustomTextInput from "../../reuseableComponent/customTextInput/CustomTextInput";
import SwithWithLable from "../../reuseableComponent/switch/SwitchWithLable";

function GenericAddinputComponent(props: { formData: any, isActive: any, onChangeValue: any, handleInputChange: any, errors: any }) {
    const { formData, handleInputChange, isActive, onChangeValue, errors } = props
    return (
        <View>
            <CustomTextInput
                label="Name"
                value={formData.name}
                editable={true}
                style={{ flex: 1 }}
                errorMessage={errors.name}
                keyboardType="default"
                returnKeyType="next" setTextInput={(value: any) => handleInputChange("name", value)} required={false} />
            <SwithWithLable value={isActive} onChangeValue={onChangeValue} lable={"Active"} />

            <CustomTextInput
                label="Delay alert after (milli Seconds)"
                value={formData.delay}
                editable={true}
                style={{ flex: 1 }}
                errorMessage={errors.delay}
                keyboardType="numeric"
                returnKeyType="next" setTextInput={(value: any) => handleInputChange("delay", value)} required={false} />
            <CustomTextInput
                label="Valid Id state"
                style={{ flex: 1 }}
                value={formData.validId}
                editable={true}
                returnKeyType="next" setTextInput={(value: any) => handleInputChange("validId", value)} required={false} />



            <CustomTextInput
                label="Min Tag Count"
                style={{ flex: 1 }}
                value={formData.minTagCount}
                keyboardType="numeric"
                editable={true}
                setTextInput={(value: any) => handleInputChange("minTagCount", value)} required={false} />

        </View>

    )

}
export default GenericAddinputComponent;