import { StyleSheet } from "react-native";
import colors from "../assets/color/colors";
import fontSizes from "../assets/fonts/FontSize";

export function InputStyles() {
    const inputStyles = StyleSheet.create({

        searchFilterInput: {
            flexDirection: 'row',
            alignItems: 'center',
            width: '95%',
            height: 45,
            borderWidth: 1,
            borderColor: colors.SoftGray,
            borderRadius: 30,
            fontSize: fontSizes.text,
            paddingLeft: 10,
            paddingRight: 10,
            backgroundColor: colors.backgroundColor,
        },
        searchTextInput: {
            width: '83%',
            fontSize: fontSizes.text,
        },
        searchInput: {
            flex: 1,
            paddingVertical: 4,
            paddingHorizontal: 8,
            fontSize: 16,
        },
        CustomInputContainer: {
            marginVertical: 10,
        },
        CustomInputInputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            borderColor: colors.SoftGray,
            borderRadius: 10,
        },

        CustomInputIcon: {
            marginLeft: 8,
        },

        CustomInputUnderlineFocused: {
            marginTop: -5,
            height: 2,
            backgroundColor: colors.AppPrimaryColor,
        },
        CustomInputUnderlineBlurred: {
            marginTop: -8,
            height: 2,
            backgroundColor: colors.SoftGray,
        },

    })
    return { inputStyles }
}
