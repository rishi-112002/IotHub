import { useState } from "react";
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { useSelector } from "react-redux";
import UserModal from "../modal/HeaderModalEditAndLogout";
import { RootState, store } from "../../reducer/Store";
import colors from "../../assets/color/colors";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { logoutUser } from "../../reducer/Login/LoginAction";

function CustomHeader(props: { buCode: any, userLogo: any, title: any }) {
    const userName = useSelector((State: RootState) => State.authentication.userName)
    const { buCode, userLogo, title } = props
    const [modalVisible, setModalVisible] = useState(false);
    console.log("bucode", buCode)
    const Navigations = useNavigation()
    const openDrawer = () => {
        Navigations.dispatch(DrawerActions.toggleDrawer());
    };
    const handleLogout = async () => {
        Alert.alert(
            "Confirm Logout",  // Alert title
            "Are you sure you want to log out?",  // Alert message
            [
                {
                    text: "Cancel", // Cancel button
                    onPress: () => setModalVisible(false),
                    style: "cancel",  // This makes the button appear more prominent
                },
                {
                    text: "OK",  // OK button
                    onPress: () => {
                        setModalVisible(false)
                        store.dispatch(logoutUser()); // Log out the user
                    },
                },
            ],
            { cancelable: false } // Prevents closing the alert by tapping outside of it
        );
    };

    return (
        <View style={styles.headerContainer}>
            <View style={styles.leftSection}>
                <TouchableOpacity onPress={openDrawer}>
                    <MaterialIcons name="menu" size={28} color={colors.darkblack} style={styles.burgerIcon} />
                </TouchableOpacity>
                <Image
                    source={require("../../assets/images/iotHubLogo.png")}
                    style={styles.logo}

                />
                <Text style={styles.appName}>{title}</Text>
            </View>
            <View style={styles.rightSection}>
                <Text style={styles.username}>{buCode}</Text>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <MaterialIcons name={userLogo} size={25} color={colors.darkblack} />
                </TouchableOpacity>
            </View>
            {
                modalVisible &&
                <UserModal modalVisible={modalVisible} setModalVisible={setModalVisible} username={userName} onLogout={handleLogout} />
            }
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: colors.white,
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    burgerIcon: {
        marginRight: 15,
    },
    logo: {
        width: 30,
        height: 30,
        marginRight: 10,
        tintColor: colors.darkblack,
    },
    appName: {
        fontSize: 18,
        color: colors.darkblack,
        fontWeight: 'bold',
    },
    rightSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    username: {
        color: colors.darkblack,
        marginRight: 10,
        fontSize: 16,
    },
});
export default CustomHeader;