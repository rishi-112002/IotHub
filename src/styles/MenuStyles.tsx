import { StyleSheet } from "react-native";
import colors from "../assets/color/colors";
import fontSizes from "../assets/fonts/FontSize";

export function MenuStyles() {
    const menuStyles = StyleSheet.create({
        drawerSubMenu: {
            paddingLeft: 40, // Indent sub-items
            paddingVertical: 5, // Reduce space between submenu items
        },
        drawerSubMenuItem: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 5, // Reduce vertical padding
        },
        drawerSubMenuText: {
            marginLeft: 10,
            fontSize: fontSizes.smallText,
            color: colors.gray,
        },
        menuOption: {
            flexDirection: 'row', // To align icon and text horizontally
            alignItems: 'center', // Align items vertically in the center
            paddingVertical: 5, // Padding for touchable area
        },
        menuOptionText: {
            marginLeft: 10, // Spacing between icon and text
            fontSize: fontSizes.text, // Customize the text size
            color: colors.darkblack,
        },
        filterMenuContainer: {
            marginTop: 60,
            width: '50%',
            backgroundColor: colors.white,
            padding: 5,
            borderRadius: 10,
            alignSelf: 'flex-end',
            marginRight: 10,
            elevation: 5,
        },
    })
    return { menuStyles }
}