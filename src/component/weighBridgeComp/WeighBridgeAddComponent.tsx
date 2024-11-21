import { View } from 'react-native';
import CustomTextInput from '../../reuseableComponent/customTextInput/CustomTextInput';
import React from 'react';

function WeighBridgeComponent(props:{platformReadyTicks:any ,setPlatformReadyTicks: any , platformMaxWeight: any ,setPlatformMaxWeight: any,platformMinWeight: any,setPlatformMinWeight: any,stableWeightTolerance: any ,setStableWeightTolerance: any ,  stableWeightTicks: any , setStableWeightTicks: any  , minVehicleWeight: any , setMinVehicleWeight: any  ,minTagCount: any, setMinTagCount: any }){
    const {platformReadyTicks ,setPlatformReadyTicks , platformMaxWeight ,setPlatformMaxWeight,platformMinWeight,setPlatformMinWeight,stableWeightTolerance ,setStableWeightTolerance ,  stableWeightTicks , setStableWeightTicks  , minVehicleWeight , setMinVehicleWeight  ,minTagCount, setMinTagCount }= props
    return(
        <View>
        <CustomTextInput
        label="Platform ready ticks"
        style={{ flex: 1 }}
        value={platformReadyTicks}
        keyboardType="numeric"
        editable={true}
        setTextInput={setPlatformReadyTicks} required={true} />

    <CustomTextInput
        label="Platform ready max weight"
        style={{ flex: 1 }}
        value={platformMaxWeight}
        keyboardType="numeric"
        editable={true}
        setTextInput={setPlatformMaxWeight} required={true} />

    <CustomTextInput
        label="Platform ready min weight"
        style={{ flex: 1 }}
        value={platformMinWeight}
        keyboardType="numeric"
        editable={true}
        setTextInput={setPlatformMinWeight} required={true} />

    <CustomTextInput
        label="Stable weight tolerance"
        style={{ flex: 1 }}
        value={stableWeightTolerance}
        keyboardType="numeric"
        editable={true}
        setTextInput={setStableWeightTolerance} required={true} />

    <CustomTextInput
        label="Stable weight ticks"
        style={{ flex: 1 }}
        value={stableWeightTicks}
        keyboardType="numeric"
        editable={true}
        setTextInput={setStableWeightTicks} required={true} />

    <CustomTextInput
        label="Min vehicle weight"
        style={{ flex: 1 }}
        value={minVehicleWeight}
        keyboardType="numeric"
        editable={true}
        setTextInput={setMinVehicleWeight} required={true} />

    <CustomTextInput
        label="Min tag count"
        style={{ flex: 1 }}
        value={minTagCount}
        keyboardType="numeric"
        editable={true}
        setTextInput={setMinTagCount} required={false} />
        </View>
    )
}
export default WeighBridgeComponent;