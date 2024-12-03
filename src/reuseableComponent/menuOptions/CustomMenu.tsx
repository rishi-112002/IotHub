import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from "react-native-popup-menu";
import Icon from "react-native-vector-icons/MaterialIcons";
import colors from "../../assets/color/colors";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { AppNavigationParams } from "../../navigation/NavigationStackList";
import fontSizes from "../../assets/fonts/FontSize";

function CustomMenu(props: { baseUrl: any, spotName: any }) {
    const { baseUrl, spotName } = props;
    const navigation = useNavigation<NavigationProp<AppNavigationParams>>();

    return (
        <Menu style={{ borderRadius: 20 }}>
            <MenuTrigger style={styles.triggerWrapper}>
                <Icon name="more-vert" size={24} color={colors.gray} />
            </MenuTrigger>
            <MenuOptions customStyles={{ optionsWrapper: { padding: 5, rowGap: 10 } }}>
                {/* Menu option for Spot Details with icon */}
                <MenuOption
                    onSelect={() => navigation.navigate("SpotDetailsScreen", { baseUrls: baseUrl, spotName })}
                >
                    <View style={styles.menuOption}>
                        <Icon name="info" size={18} color={colors.blueDarkest} />
                        <Text style={styles.menuOptionText}>Spot Details</Text>
                    </View>
                </MenuOption>

                {/* Menu option for Event Logs with icon */}
                <MenuOption
                    onSelect={() => navigation.navigate("EventLogScreen", { baseUrls: baseUrl, spotName })}
                >
                    <View style={styles.menuOption}>
                        <Icon name="event-note" size={18} color={colors.blueDarkest} />
                        <Text style={styles.menuOptionText}>Event Logs</Text>
                    </View>
                </MenuOption>
            </MenuOptions>
        </Menu>
    );
}

export default CustomMenu;

const styles = StyleSheet.create({
    triggerWrapper: {
        position: 'absolute',
        paddingHorizontal: 5,
        right: 0,
        top: -5
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
});
