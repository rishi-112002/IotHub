import { StyleSheet } from "react-native";
import colors from "../assets/color/colors";
import fontSizes from "../assets/fonts/FontSize";

export function ModalStyles() {
    const modalStyles = StyleSheet.create({
        userModalContainer: {
            flex: 1,
            padding: 10,
            alignItems: 'flex-end',
        },
        userModalContent: {
            backgroundColor: 'white',
            borderRadius: 10,
            width: '40%',
        },
        filterModalHeading: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
        },
        userModalItem: {
            flexDirection: 'row',
            marginVertical: 10,
            marginHorizontal: 15
        },
        userModalText: {
            marginLeft: "auto",
            fontSize: 18,
        },
        calendarModalContainer: {
            flex: 1,
            padding: 40,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.darkerTransparent,  // Darker transparent background
        },
        generalModalContainer: {
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: colors.darkerTransparent,
        },
        generalModalContent: {
            backgroundColor: 'white',
            padding: 20,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
        },
        generalModalheading: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        generalModalTitle: {
            fontSize: fontSizes.heading,
            fontWeight: 'bold',
            marginBottom: 10,
            color: colors.AppPrimaryColor
        },
        generalModalheadingicon: {
            flexDirection: 'row',
            columnGap: 30,
        },
    })
    return { modalStyles }
}