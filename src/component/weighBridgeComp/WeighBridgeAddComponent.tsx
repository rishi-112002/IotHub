import { View } from 'react-native';
import CustomTextInput from '../../reuseableComponent/customTextInput/CustomTextInput';
import React from 'react';
import { Strings } from '../../assets/constants/Lable';

function WeighBridgeComponent(props: { platformReadyTicks: any, setPlatformReadyTicks: any, platformMaxWeight: any, setPlatformMaxWeight: any, platformMinWeight: any, setPlatformMinWeight: any, stableWeightTolerance: any, setStableWeightTolerance: any, stableWeightTicks: any, setStableWeightTicks: any, minVehicleWeight: any, setMinVehicleWeight: any, minTagCount: any, setMinTagCount: any }) {
    const { platformReadyTicks, setPlatformReadyTicks, platformMaxWeight, setPlatformMaxWeight, platformMinWeight, setPlatformMinWeight, stableWeightTolerance, setStableWeightTolerance, stableWeightTicks, setStableWeightTicks, minVehicleWeight, setMinVehicleWeight, minTagCount, setMinTagCount } = props
    return (
        <View>
            <CustomTextInput
                label={Strings.PLATFORM_READY_TICKS}
                style={{ flex: 1 }}
                value={platformReadyTicks}
                keyboardType="numeric"
                editable={true}
                setTextInput={setPlatformReadyTicks} required={true} />

            <CustomTextInput
                label={Strings.PLATFORM_READY_MAX_WEIGHT}
                style={{ flex: 1 }}
                value={platformMaxWeight}
                keyboardType="numeric"
                editable={true}
                setTextInput={setPlatformMaxWeight} required={true} />

            <CustomTextInput
                label={Strings.PLATFORM_READY_MIN_WEIGHT}
                style={{ flex: 1 }}
                value={platformMinWeight}
                keyboardType="numeric"
                editable={true}
                setTextInput={setPlatformMinWeight} required={true} />

            <CustomTextInput
                label={Strings.STABLE_WEIGHT_TOLERANCE}
                style={{ flex: 1 }}
                value={stableWeightTolerance}
                keyboardType="numeric"
                editable={true}
                setTextInput={setStableWeightTolerance} required={true} />

            <CustomTextInput
                label={Strings.STABLE_WEIGHT_TICKS}
                style={{ flex: 1 }}
                value={stableWeightTicks}
                keyboardType="numeric"
                editable={true}
                setTextInput={setStableWeightTicks} required={true} />

            <CustomTextInput
                label={Strings.MIN_VEHICLE_WEIGHT}
                style={{ flex: 1 }}
                value={minVehicleWeight}
                keyboardType="numeric"
                editable={true}
                setTextInput={setMinVehicleWeight} required={true} />

            <CustomTextInput
                label={Strings.MIN_TAG_COUNT}
                style={{ flex: 1 }}
                value={minTagCount}
                keyboardType="numeric"
                editable={true}
                setTextInput={setMinTagCount} required={false} />
        </View>
    )
}
export default WeighBridgeComponent;