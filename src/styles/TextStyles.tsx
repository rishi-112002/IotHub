import { StyleSheet } from "react-native";
import colors from "../assets/color/colors";
import fontSizes from "../assets/fonts/FontSize";

export function TextStyles() {
    const textStyles = StyleSheet.create({
        userCloseText: {
            color: 'blue',
            fontSize: 16,
        },
        screenName: {
            fontSize: 18,
            color: colors.darkblack,
            fontWeight: 'bold',
        },
        nameText: {
            flex: 1,
            marginTop: 4,
            fontSize: fontSizes.title,
            color: colors.SecondaryTextColor,
        },
        statusText: {
            fontSize: fontSizes.smallText,
            color: colors.PrimaryTextColor,
        },
        ipText: {
            marginTop: 4,
            fontSize: fontSizes.smallText,
            color: colors.SecondaryTextColor,
        },
        commandNameText: {
            marginTop: 0,
            fontSize: fontSizes.title,
            color: colors.SecondaryTextColor,
        },
        detailText: {
            fontSize: fontSizes.smallText,
            color: colors.SecondaryTextColor,
        },
        noDataText: {
            textAlign: 'center',
            fontSize: fontSizes.text,
            color: colors.lightGray,
        },
        userModalText: {
            marginLeft: "auto",
            fontSize: 18,
        },
        menuOptionText: {
            marginLeft: 10, // Spacing between icon and text
            fontSize: fontSizes.text, // Customize the text size
            color: colors.darkblack,
        },
        modalHeading: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
        },
        generalModalHeading: {
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        modalTitle: {
            fontSize: fontSizes.heading,
            fontWeight: '500',
            color: colors.AppPrimaryColor,
        },

        drawerSubMenuText: {
            marginLeft: 10,
            fontSize: fontSizes.smallText,
            color: colors.gray,
        },

        cardTitle: {
            fontSize: fontSizes.text,
            fontWeight: "500",
            color: colors.SecondaryTextColor,
            marginTop: 5,
            textAlign: "center",
        },
        emptyText: { fontSize: fontSizes.subheading, color: colors.gray },
        infoText: {
            fontSize: fontSizes.smallText,
            color: colors.HelperTextColor,
        },
        filterCountText: {
            color: colors.white,
            fontSize: fontSizes.vSmallText,
            fontWeight: 'bold',
        },
        CustomInputErrorText: {
            color: colors.redBase,
            fontSize: fontSizes.smallText,
            marginTop: 4,
        },
        badgeText: {
            fontSize: fontSizes.smallText,
            textAlign: 'center',
            color: colors.blueDarkest,
        },
        switchLabel: {
            fontSize: fontSizes.subheading,
            color: colors.PrimaryTextColor, // Text color
        },
        alertMessage: {
            fontSize: fontSizes.heading,
            paddingVertical: 20,
            paddingHorizontal: 25,
            textAlign: 'left',
            color: colors.PrimaryTextColor
        },
        resetText: {
            color: colors.AppPrimaryColor,
            fontSize: fontSizes.text, fontWeight: "500"
        },
        message: {
            marginTop: 10,
            color: '#FFFFFF',
            fontSize: fontSizes.title,
        },
        searchTextInput: {
            width: '83%',
            fontSize: fontSizes.text,
        },
        filterText: {
            marginLeft: 8,
            fontSize: fontSizes.title,
            color: colors.PrimaryTextColor
        },
        CustomInputLabel: {
            position: 'absolute',
            fontSize: fontSizes.text,
            color: colors.AppPrimaryColor,
            backgroundColor: colors.white,
            paddingHorizontal: 3,
        },
        drawerBuCodeText: { textAlign: 'center', color: colors.white, fontSize: fontSizes.vSmallText },

        drawerSubtitle: {
            fontSize: fontSizes.smallText,
            color: colors.white,
        },
        drawerItemText: {
            marginLeft: 10,
            fontSize: fontSizes.text,
            color: colors.darkblack,
        },
        CustomInputLabelFocused: {
            top: -8,
            fontSize: fontSizes.text,
            color: colors.AppPrimaryColor,
            fontWeight: '500',
        },
        CustomInputLabelBlurred: {
            top: 12,
            fontSize: fontSizes.text,
            color: colors.gray,
        },
        generalItemText: {
            fontSize: fontSizes.text,
            color: colors.PrimaryTextColor,
            fontWeight: '400',
            flexShrink: 1,
        },
        CustomInputInput: {
            fontSize: fontSizes.smallText,
            color: colors.redBase,
            flexGrow: 1,
            alignItems: 'baseline'
        },
        tabLabel: {
            fontSize: 14,
            color: colors.darkblack,
        },
        sectionText: {
            fontSize: fontSizes.text,
            color: colors.SecondaryTextColor,
            textAlign: 'right',
            flex: 1,
        },
        readerText: {
            marginLeft: 10,
            fontSize: fontSizes.text,
            color: '#555',
        },
        footerText: {
            marginLeft: 10,
            fontSize: fontSizes.text,
            color: colors.gray,
        },
        value: {
            fontSize: fontSizes.smallText,
            color: colors.SecondaryTextColor,
        },
        input: {
            flex: 1,
            color: colors.PrimaryTextColor
        },
        viewAllText: {
            color: colors.AppPrimaryColor,
            fontSize: fontSizes.text,
            fontWeight: "500",
        },
        valueText: {
            fontSize: fontSizes.smallText,
            color: colors.SecondaryTextColor,
            fontWeight: '500',
            marginTop: 2,
        },
        label: {
            fontSize: fontSizes.smallText,
            color: colors.HelperTextColor,
            fontWeight: '600',
        },
        drawerHeaderTitle: {
            fontSize: fontSizes.subheader,
            fontWeight: 'bold',
            color: colors.white,
        },

        sectionTitle: {
            fontSize: fontSizes.subheading,
            fontWeight: '500',
            color: colors.darkblack,
        },

        alertTitle: {
            fontSize: fontSizes.subheader,
            fontWeight: 'bold',
            paddingVertical: 20,
            paddingHorizontal: 25,
            color: colors.inkDarkest,
            backgroundColor: colors.CloudyWhite,
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
        },

        searchCancelText: {
            color: colors.AppPrimaryColor,
            fontSize: fontSizes.title,
        },
        detailsText: {
            fontSize: fontSizes.smallText,
            color: colors.HelperTextColor,
        },
        totalText: {
            fontSize: fontSizes.smallText
        },
        spotTitle: {
            fontSize: fontSizes.title,
            color: colors.SecondaryTextColor,
        },
        heading: {
            fontSize: fontSizes.heading,
            fontWeight: "bold",
            color: "#000",
        },
        typeText: {
            fontSize: fontSizes.smallText,
            color: colors.SecondaryTextColor,
        },
    })
    return {
        textStyles
    }
}