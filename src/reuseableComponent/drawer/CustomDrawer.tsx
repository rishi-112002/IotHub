/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/react-in-jsx-scope */
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../assets/color/colors';
import fontSizes from '../../assets/fonts/FontSize';
// import { RootDrawerTypes } from '../../navigation/DrawerNavigation';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducer/Store';
import React from 'react';

function CustomDrawerContent(props: { navigation: any }) {
    const { navigation } = props

    const [isSpotExpanded, setIsSpotExpanded] = useState(false);

    console.log("navigatioN props", navigation)
    const user = useSelector((state: RootState) => state.authentication.userName);

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView style={styles.container}>
                {/* Drawer Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>IoT Hub</Text>
                    <Text style={styles.headerSubtitle}>Welcome, {user}!</Text>
                </View>

                <View>
                    {/* Live Spot */}
                    <DrawerItem
                        label={() => (
                            <View style={styles.itemContainer}>
                                <MaterialIcons name="gps-fixed" size={20} color={colors.darkblack} />
                                <Text style={styles.itemText}>Live Spot</Text>
                            </View>
                        )}
                        onPress={() => navigation.navigate("LiveSpots")}
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
                                onPress={() => navigation.navigate('WeighBridgeNavigation')}
                                style={styles.subMenuItem}
                            >
                                <MaterialIcons name="scale" size={18} color={colors.gray} />
                                <Text style={styles.subMenuText}>Weighbridges</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('GenericSpot')}
                                style={styles.subMenuItem}
                            >
                                <MaterialIcons name="location-on" size={18} color={colors.gray} />
                                <Text style={styles.subMenuText}>GenericSpots</Text>
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
                        onPress={() => navigation.navigate('RfidScreenNavigation')}
                    />

                    {/* Settings */}
                    <DrawerItem
                        label={() => (
                            <View style={styles.itemContainer}>
                                <MaterialIcons name="settings" size={20} color={colors.darkblack} />
                                <Text style={styles.itemText}>Settings</Text>
                            </View>
                        )}
                        onPress={() => console.log('Settings')}
                    />

                    {/* About */}
                    <DrawerItem
                        label={() => (
                            <View style={styles.itemContainer}>
                                <MaterialIcons name="info" size={20} color={colors.darkblack} />
                                <Text style={styles.itemText}>About</Text>
                            </View>
                        )}
                        onPress={() => console.log('About')}
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
    header: {
        padding: 15,
        backgroundColor: colors.AppPrimaryColor,
    },
    headerTitle: {
        fontSize: fontSizes.subheading,
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