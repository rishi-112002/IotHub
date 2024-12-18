import React from "react";
import { Image, TouchableOpacity, View, ImageStyle, StyleProp } from "react-native";
import colors from "../../assets/color/colors";

interface CustomIconProps {
    iconPath: any;
    onPress: any;
    style?: StyleProp<ImageStyle>;
}

function CustomIcon(props: CustomIconProps) {
    const { iconPath, onPress, style = {} } = props;

    return (
        <View>
            <TouchableOpacity onPress={onPress}>
                <Image source={iconPath} style={{ tintColor: colors.IconColor }} />
            </TouchableOpacity>
        </View>
    );
}

export default CustomIcon;
