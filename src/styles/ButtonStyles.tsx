import { StyleSheet } from "react-native"
import colors from "../assets/color/colors"
import fontSizes from "../assets/fonts/FontSize"

export function ButtonStyles() {
    const buttonStyles = StyleSheet.create({
        segmentedButton: {
            padding: 0,
        },
        viewAllButton: {
            alignSelf: "flex-end",
        },
        button: {
            backgroundColor: colors.AppPrimaryColor,
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center',
        },
        buttonLabel: {
            color: colors.white,
            fontSize: fontSizes.title,
            fontWeight: 'bold',
        },
        buttonDisabled: {
            backgroundColor: colors.LightGray,
        },
        floatingActionButton: {
            position: 'absolute',
            backgroundColor: colors.AppPrimaryColor,
            tintColor: colors.white,
            padding: 0,
            marginBottom: 40,
            marginEnd: 30,
            bottom: 0,
            right: 0,
        },
        segemntedButtonText: { fontSize: fontSizes.vSmallText },
        searchCancelButton: {
            paddingHorizontal: 8,
        },
        generalCloseButton: {
            alignItems: 'center',
        },
        clearButton: {
            borderRadius: 30,
            padding: 1,
        },
        filterClearButton: {
            marginLeft: 10, // Add spacing between the text and the close button
            backgroundColor: colors.DividerColor, // Optional: Add a background color for the button
            borderRadius: 15, // Optional: Make it circular
            padding: 2, // Add padding for better touch experience
        },
        buttonContainer: {
            padding: 15,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignSelf: 'flex-end',
            width: '70%',
        },
        cancelButton: {
            borderColor: colors.lightGray,
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
            marginRight: 10,
            flex: 1,
        },
        okButton: {
            backgroundColor: colors.AppPrimaryColor,
            padding: 10,
            borderRadius: 10,
            flex: 1,
        },
        okButtonText: {
            color: colors.white,
            fontSize: fontSizes.title,
            fontWeight: 'bold',
            textAlign: 'center',
        },
        cancelButtonText: {
            color: colors.darkblack,
            fontSize: fontSizes.title,
            fontWeight: 'bold',
            textAlign: 'center',
        },
        userCloseButton: {
            marginTop: 20,
        },

    })
    return {
        buttonStyles
    }
}