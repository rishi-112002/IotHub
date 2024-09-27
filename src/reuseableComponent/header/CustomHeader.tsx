import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { useSelector } from "react-redux";
import UserModal from "../modal/HeaderModalEditAndLogout";
import { RootState } from "../../reducer/Store";
import colors from "../../assets/color/colors";
import { DrawerActions, useNavigation } from "@react-navigation/native";

function CustomHeader(props: { handleLogout: any, buCode: any,  navigation: any }) {
    const userName = useSelector((State: RootState) => State.authentication.userName)
    const { handleLogout, buCode, } = props
    const [modalVisible, setModalVisible] = useState(false);
    console.log("bucode", buCode)
    const Navigations = useNavigation()
    const openDrawer = () => {
        Navigations.dispatch(DrawerActions.toggleDrawer());
    };
    return (
        <View style={styles.headerContainer}>
            <View style={styles.leftSection}>
                <TouchableOpacity onPress={openDrawer}>
                    <MaterialIcons name="menu" size={28} color="white" style={styles.burgerIcon} />
                </TouchableOpacity>
                <Image
                    source={require("../../assets/images/iotHubLogo.png")}
                    style={styles.logo}
                />
                <Text style={styles.appName}>Goodstrack</Text>
            </View>
            <View style={styles.rightSection}>
                <Text style={styles.username}>{buCode}</Text>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <MaterialIcons name="account-circle" size={25} color="white" />
                </TouchableOpacity>
            </View>
            {
                modalVisible &&
                <UserModal modalVisible={modalVisible} setModalVisible={setModalVisible} username={userName} onLogout={handleLogout}/>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: colors.AppPrimaryColor,
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
    },
    appName: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
    rightSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    username: {
        color: 'white',
        marginRight: 10,
        fontSize: 16,
    },
});
export default CustomHeader;