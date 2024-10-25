import React from "react";
import { Image, TouchableOpacity, View } from "react-native";

function CustomIcon(props: { iconPath: any  , onPress:any}) {
    const { iconPath , onPress } = props
    return (
        <View>
            <TouchableOpacity onPress={onPress}>
                <Image source={iconPath} />
            </TouchableOpacity>
        </View>
    )
}
export default CustomIcon;