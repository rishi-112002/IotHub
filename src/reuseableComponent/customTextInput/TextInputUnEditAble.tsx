import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import colors from "../../assets/color/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import fontSizes from "../../assets/fonts/FontSize";

function TextInputUnEditAble(props: { value: any, onPress: any, error: any, lable: any, disable: any }) {
    const { value, onPress, error, lable, disable } = props
    return (
        <View style={{ flex: 1, flexDirection: "column", rowGap: 10, padding: 10 }}>
            <Text style={styles.lableHeading}>{lable}</Text>
            <TouchableOpacity style={styles.inputContainer} onPress={onPress} disabled={disable}>
                <TextInput
                    value={value}
                    style={styles.input}
                    editable={false}
                />
                {
                    error &&
                    <Text style={styles.errorText}>
                        {error}
                    </Text>
                }
                <Icon name="arrow-drop-down" size={30} color={colors.blueDarkest} style={styles.icon} />
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: colors.white,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,

    },
    lableHeading: {
        fontSize: fontSizes.subheading,
        fontWeight: "500",
        color: colors.darkblack,
    },
    input: {
        flex: 1,
        color: "black",
        fontSize: fontSizes.text,
        paddingVertical: 10,
    },
    icon: {
        paddingLeft: 10,
    },
    errorText: {
        color: 'red',
        fontSize: fontSizes.smallText,
        marginTop: 4,
    },
})
export default TextInputUnEditAble;
