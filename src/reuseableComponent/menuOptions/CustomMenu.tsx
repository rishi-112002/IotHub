import { StyleSheet } from "react-native";
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

function CustomMenu(props: { baseUrl: any, spotName: any }) {
    const { baseUrl, spotName } = props
    const navigation = useNavigation<NavigationProp<AppNavigationParams>>();


    return (

        <Menu>
            <MenuTrigger style={styles.triggerWrapper}>
                <Icon name="more-vert" size={24} color={colors.gray} />
            </MenuTrigger>
            <MenuOptions customStyles={{ optionsWrapper: { padding: 5, rowGap: 10 } }}>
                <MenuOption onSelect={() => navigation.navigate("SpotDetailsScreen", { baseUrls: baseUrl, spotName: spotName })} text="Spot Details" />
                <MenuOption onSelect={() => navigation.navigate("EventLogScreen", { baseUrls: baseUrl, spotName: spotName })} text="Event logs" />
            </MenuOptions>
        </Menu>

    );
};

export default CustomMenu;

const styles = StyleSheet.create({
    triggerWrapper: {
        position: 'absolute',
        paddingHorizontal: 5,
        right: 0,
        top:-5
    },
})