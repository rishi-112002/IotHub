import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Image, Alert } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../assets/color/colors';
import fontSizes from '../../assets/fonts/FontSize';
import React from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AppNavigationParams } from '../../navigation/NavigationStackList';
import { useSelector } from 'react-redux';
import { RootState, store } from '../../reducer/Store';
import { logoutUser } from '../../reducer/Login/LoginAction';
import SequentialBouncingLoader from '../loader/BallBouncingLoader';
import { IconName, ImagePath, Strings } from '../../assets/constants/Lable';

function CustomDrawerContent() {

    const [isSpotExpanded, setIsSpotExpanded] = useState(false);
    const navigation = useNavigation<NavigationProp<AppNavigationParams>>();
    const user = useSelector((state: RootState) => state.authentication.userName);
    const loading = useSelector((state: RootState) => state.authentication.loading);
    const buCode = useSelector((state: RootState) => state.authentication.buCode);
    const handleLogout = async () => {
        Alert.alert(
            Strings.CONFIRM_LOGOUT, // Alert title
            Strings.SURE_TO_LOGOUT,
            [
                {
                    text: IconName.CANCLE, // Cancel button
                    style: 'cancel', // This makes the button appear more prominent
                },
                {
                    text: Strings.OK, // OK button
                    onPress: () => {
                        store.dispatch(logoutUser());
                        navigation.navigate("LoginScreen")
                    },
                },
            ],
            { cancelable: false }, // Prevents closing the alert by tapping outside of it
        );
    };

    if (loading) {
        <View style={{ flex: 1 }}>
            <SequentialBouncingLoader />
        </View>
    }

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView style={styles.container}>
                {/* Drawer Header */}
                <View style={styles.header}>
                    <View style={{ flexDirection: "row" }}>
                        <Image
                            source={ImagePath.APP_ICON}
                            style={styles.logo}
                        />
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: "space-between",
                            alignItems: 'center'
                        }}>

                            <View>
                                <Text style={styles.headerTitle}>{Strings.IOT_HUB}</Text>
                                <Text style={styles.headerSubtitle}>{Strings.WELCOME} {user}!</Text>
                            </View>
                            <View style={{ borderRadius: 20, borderWidth: 1, borderColor: colors.white, padding: 5 }}>

                                <Text style={{ textAlign: 'center', color: colors.white, fontSize: fontSizes.vSmallText }}>{buCode}</Text>
                            </View>
                        </View>

                    </View>
                </View>

                <View>
                    {/* Live Spot */}
                    <DrawerItem
                        label={() => (
                            <View style={styles.itemContainer}>
                                <MaterialIcons name=
                                    {IconName.GAP_FIXED} size={20} color={colors.darkblack} />
                                <Text style={styles.itemText}>{Strings.DASHBOARD}</Text>
                            </View>
                        )}
                        onPress={() => navigation.navigate("Drawer", { screen: "bottomTabNavigation" })}
                    />
                    {/* Spot Dropdown */}
                    <TouchableOpacity
                        onPress={() => setIsSpotExpanded(!isSpotExpanded)}
                        style={styles.spotContainer}
                    >
                        <MaterialIcons name={IconName.PLACE} size={20} color={colors.darkblack} />
                        <View style={styles.spotLabel}>
                            <Text style={styles.itemText}>{Strings.SPOTS}</Text>
                            <MaterialIcons
                                name={isSpotExpanded ? IconName.EXPAND_LESS : IconName.EXPAND_MORE}
                                size={20}
                                color={colors.darkblack}
                            />
                        </View>
                    </TouchableOpacity>

                    {isSpotExpanded && (
                        <View style={styles.subMenu}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("Drawer", { screen: 'WeighBridgeNavigation' })}
                                style={styles.subMenuItem}
                            >
                                <MaterialIcons name={IconName.SCALE} size={18} color={colors.gray} />
                                <Text style={styles.subMenuText}>{Strings.WEIGHBRIDGE}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("Drawer", { screen: 'GenericSpotNavigation' })}
                                style={styles.subMenuItem}
                            >
                                <MaterialIcons name={IconName.LOCATION_ON} size={18} color={colors.gray} />
                                <Text style={styles.subMenuText}>{Strings.GENERIC}</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {/* RFID Reader's */}
                    <DrawerItem
                        label={() => (
                            <View style={styles.itemContainer}>
                                <MaterialIcons name={IconName.WIFI_THETHERING} size={20} color={colors.darkblack} />
                                <Text style={styles.itemText}>{Strings.RFID_READERS}</Text>
                            </View>
                        )}
                        onPress={() => navigation.navigate("Drawer", { screen: 'RfidScreenNavigation' })}
                    />

                    <DrawerItem
                        label={() => (
                            <View style={styles.itemContainer}>
                                <MaterialIcons name={IconName.LOGOUT} size={20} color={colors.redBase} />
                                <Text style={[styles.itemText, { color: colors.redBase }]}>{Strings.LOGOUT}</Text>
                            </View>
                        )}
                        onPress={handleLogout}
                    />
                </View>
            </DrawerContentScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    logo: {
        marginTop: 3,
        width: 22,
        height: 22,
        marginRight: 10,
        tintColor: colors.white,
    },
    header: {
        flex: 1,
        marginVertical: -15,
        marginHorizontal: -15,
        padding: 20,
        backgroundColor: colors.AppPrimaryColor,
        marginBottom: 5
    },
    headerTitle: {
        fontSize: fontSizes.subheader,
        fontWeight: 'bold',
        color: colors.white,
    },
    headerSubtitle: {
        fontSize: fontSizes.smallText,
        color: colors.white,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center', // Align items in the center vertically
        paddingVertical: 0, // Reduce vertical padding
        paddingHorizontal: 0, // Optional: Adjust horizontal padding if needed
    },
    itemText: {
        marginLeft: 10,
        fontSize: fontSizes.text,
        color: colors.darkblack,
    },
    spotContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10, // Adjust spacing between the dropdown and other items
        paddingHorizontal: 18,
    },
    spotLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-between',
        marginLeft: 10, // Spacing between icon and text
    },
    subMenu: {
        paddingLeft: 40, // Indent sub-items
        paddingVertical: 5, // Reduce space between submenu items
    },
    subMenuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5, // Reduce vertical padding
    },
    subMenuText: {
        marginLeft: 10,
        fontSize: fontSizes.smallText,
        color: colors.gray,
    },
});

export default CustomDrawerContent;