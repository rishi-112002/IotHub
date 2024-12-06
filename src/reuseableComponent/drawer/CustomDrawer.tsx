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

function CustomDrawerContent() {

    const [isSpotExpanded, setIsSpotExpanded] = useState(false);
    const navigation = useNavigation<NavigationProp<AppNavigationParams>>();
    const user = useSelector((state: RootState) => state.authentication.userName);
    const loading = useSelector((state: RootState) => state.authentication.loading);
    const buCode = useSelector((state: RootState) => state.authentication.buCode);
    const handleLogout = async () => {
        Alert.alert(
            'Confirm Logout', // Alert title
            'Are you sure you want to log out?', // Alert message
            [
                {
                    text: 'Cancel', // Cancel button
                    style: 'cancel', // This makes the button appear more prominent
                },
                {
                    text: 'OK', // OK button
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
                            source={require('../../assets/images/iotHubLogo.png')}
                            style={styles.logo}
                        />
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: "space-between",
                            alignItems: 'center'
                        }}>

                            <View>
                                <Text style={styles.headerTitle}>IoT Hub</Text>
                                <Text style={styles.headerSubtitle}>Welcome, {user}!</Text>
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
                                <MaterialIcons name="gps-fixed" size={20} color={colors.darkblack} />
                                <Text style={styles.itemText}>Dashboard</Text>
                            </View>
                        )}
                        onPress={() => navigation.navigate("Drawer", { screen: "bottomTabNavigation" })}
                    />
                    {/* Spot Dropdown */}
                    <TouchableOpacity
                        onPress={() => setIsSpotExpanded(!isSpotExpanded)}
                        style={styles.spotContainer}
                    >
                        <MaterialIcons name="place" size={20} color={colors.darkblack} />
                        <View style={styles.spotLabel}>
                            <Text style={styles.itemText}>Spot</Text>
                            <MaterialIcons
                                name={isSpotExpanded ? 'expand-less' : 'expand-more'}
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
                                <MaterialIcons name="scale" size={18} color={colors.gray} />
                                <Text style={styles.subMenuText}>Weighbridge</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("Drawer", { screen: 'GenericSpotNavigation' })}
                                style={styles.subMenuItem}
                            >
                                <MaterialIcons name="location-on" size={18} color={colors.gray} />
                                <Text style={styles.subMenuText}>Generic</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {/* RFID Reader's */}
                    <DrawerItem
                        label={() => (
                            <View style={styles.itemContainer}>
                                <MaterialIcons name="wifi-tethering" size={20} color={colors.darkblack} />
                                <Text style={styles.itemText}>RFID Reader's</Text>
                            </View>
                        )}
                        onPress={() => navigation.navigate("Drawer", { screen: 'RfidScreenNavigation' })}
                    />

                    <DrawerItem
                        label={() => (
                            <View style={styles.itemContainer}>
                                <MaterialIcons name="logout" size={20} color={colors.redBase} />
                                <Text style={[styles.itemText, { color: colors.redBase }]}>Log Out</Text>
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