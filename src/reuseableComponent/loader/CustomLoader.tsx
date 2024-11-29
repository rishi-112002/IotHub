import { View, ActivityIndicator, StyleSheet } from "react-native"
import colors from "../../assets/color/colors"
import React from "react"

function CustomLoader() {
    return (
        <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={colors.blueDarkest} />
        </View>
    )

}
const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
    },
})
export default CustomLoader