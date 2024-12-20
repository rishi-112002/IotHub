import { StyleSheet } from "react-native";
import colors from "../assets/color/colors";
import fontSizes from "../assets/fonts/FontSize";

export function CardStyles() {
    const cardStyles = StyleSheet.create({
        cardRow: {
            alignItems: "center",
            paddingHorizontal: 0,
        },
        card: {
            width: "45%", // Each card takes 45% of the row width
            borderRadius: 10,
            paddingHorizontal: 15,
            backgroundColor: colors.DividerColor,
            paddingTop: 15,
            paddingBottom: 10,
            margin: 5, // Small margin for spacing
            alignItems: "center",
            justifyContent: "center",
            marginHorizontal: 10,
            height: "80%"
        },
        cardCount: {
            fontSize: fontSizes.subheader,
            fontWeight: "bold",
        },
        cardStyle: {
            flex: 1,
            paddingHorizontal: 10,
            backgroundColor: colors.white
        },
        cardView: {
            elevation: 1, padding: 5, backgroundColor: colors.white, borderRadius: 20, flex: 1
        },
        cardRowConatiner: {
            flexDirection: 'row',
            marginTop: 5,
            gap: 20,
        },
    })
    return { cardStyles }
}