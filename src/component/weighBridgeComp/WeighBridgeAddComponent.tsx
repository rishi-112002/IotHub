import { View } from 'react-native';
import CustomTextInput from '../../reuseableComponent/customTextInput/CustomTextInput';
import React from 'react';
import { Strings } from '../../assets/constants/Lable';

function WeighBridgeComponent(props: { error: any, platformReadyTicks: any, setPlatformReadyTicks: any, platformMaxWeight: any, setPlatformMaxWeight: any, platformMinWeight: any, setPlatformMinWeight: any, stableWeightTolerance: any, setStableWeightTolerance: any, stableWeightTicks: any, setStableWeightTicks: any, minVehicleWeight: any, setMinVehicleWeight: any, minTagCount: any, setMinTagCount: any }) {
    const { platformReadyTicks, error, setPlatformReadyTicks, platformMaxWeight, setPlatformMaxWeight, platformMinWeight, setPlatformMinWeight, stableWeightTolerance, setStableWeightTolerance, stableWeightTicks, setStableWeightTicks, minVehicleWeight, setMinVehicleWeight, minTagCount, setMinTagCount } = props
    console.log("min tag count  error ", error.minTagCount)
    return (
        <View>
            <CustomTextInput
                label={Strings.PLATFORM_READY_TICKS}
                value={platformReadyTicks}
                keyboardType="numeric"
                editable={true}
                errorMessage={error.platformReadyTicks}
                setTextInput={setPlatformReadyTicks} required={true} />

            <CustomTextInput
                label={Strings.PLATFORM_READY_MAX_WEIGHT}
                value={platformMaxWeight}
                errorMessage={error.platformMaxWeight}
                keyboardType="numeric"
                editable={true}
                setTextInput={setPlatformMaxWeight}
                required={true} />

            <CustomTextInput
                label={Strings.PLATFORM_READY_MIN_WEIGHT}
                value={platformMinWeight}
                errorMessage={error.platformMinWeight}
                keyboardType="numeric"
                editable={true}
                setTextInput={setPlatformMinWeight} required={true} />

            <CustomTextInput
                label={Strings.STABLE_WEIGHT_TOLERANCE}
                value={stableWeightTolerance}
                errorMessage={error.stableWeightTolerance}
                keyboardType="numeric"
                editable={true}
                setTextInput={setStableWeightTolerance} required={true} />

            <CustomTextInput
                label={Strings.STABLE_WEIGHT_TICKS}
                value={stableWeightTicks}
                errorMessage={error.stableWeightTicks}
                keyboardType="numeric"
                editable={true}
                setTextInput={setStableWeightTicks}
                required={true} />

            <CustomTextInput
                label={Strings.MIN_VEHICLE_WEIGHT}
                value={minVehicleWeight}
                errorMessage={error.minVehicleWeight}
                keyboardType="numeric"
                editable={true}
                setTextInput={setMinVehicleWeight}
                required={true} />

            <CustomTextInput
                label={Strings.MIN_TAG_COUNT}
                value={minTagCount}
                errorMessage={error.minTagCount}
                keyboardType="numeric"
                editable={true}
                setTextInput={setMinTagCount} required={false} />
        </View>
    )
}
export default WeighBridgeComponent;