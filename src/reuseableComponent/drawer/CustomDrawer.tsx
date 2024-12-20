import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useState } from 'react';
import { TouchableOpacity, View, Text, Image, Alert } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../assets/color/colors';
import React from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AppNavigationParams } from '../../navigation/NavigationStackList';
import { useSelector } from 'react-redux';
import { RootState, store } from '../../reducer/Store';
import { logoutUser } from '../../reducer/Login/LoginAction';
import SequentialBouncingLoader from '../loader/BallBouncingLoader';
import { IconName, ImagePath, Strings } from '../../assets/constants/Lable';
import { ComponentStyles } from '../../styles/ComponentStyles';
import { ContainerStyles } from '../../styles/ContainerStyles';
import { TextStyles } from '../../styles/TextStyles';

function CustomDrawerContent() {

    const [isSpotExpanded, setIsSpotExpanded] = useState(false);
    const { styles } = ComponentStyles();
    const { textStyles } = TextStyles();
    const { containerStyles } = ContainerStyles();
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
            <DrawerContentScrollView style={containerStyles.mainContainer}>
                {/* Drawer Header */}
                <View style={styles.drawerHeader}>
                    <View style={containerStyles.drawerItemContainer}>
                        <Image
                            source={ImagePath.APP_ICON}
                            style={styles.drawerLogo}
                        />
                        <View style={[containerStyles.drawerItemContainer, {
                            flex: 1,
                            justifyContent: "space-between",
                        }]}>

                            <View>
                                <Text style={textStyles.drawerHeaderTitle}>{Strings.IOT_HUB}</Text>
                                <Text style={textStyles.drawerSubtitle}>{Strings.WELCOME} {user}!</Text>
                            </View>
                            <View style={containerStyles.drawerBuTextContainer}>
                                <Text style={textStyles.drawerBuCodeText}>{buCode}</Text>
                            </View>
                        </View>

                    </View>
                </View>

                <View>
                    {/* Live Spot */}
                    <DrawerItem
                        label={() => (
                            <View style={containerStyles.drawerItemContainer}>
                                <MaterialIcons name=
                                    {IconName.GAP_FIXED} size={20} color={colors.darkblack} />
                                <Text style={textStyles.drawerItemText}>{Strings.DASHBOARD}</Text>
                            </View>
                        )}
                        onPress={() => navigation.navigate("Drawer", { screen: "bottomTabNavigation" })}
                    />
                    {/* Spot Dropdown */}
                    <TouchableOpacity
                        onPress={() => setIsSpotExpanded(!isSpotExpanded)}
                        style={containerStyles.drawerSpotContainer}
                    >
                        <MaterialIcons name={IconName.PLACE} size={20} color={colors.darkblack} />
                        <View style={styles.drawerSpotLabel}>
                            <Text style={textStyles.drawerItemText}>{Strings.SPOTS}</Text>
                            <MaterialIcons
                                name={isSpotExpanded ? IconName.EXPAND_LESS : IconName.EXPAND_MORE}
                                size={20}
                                color={colors.darkblack}
                            />
                        </View>
                    </TouchableOpacity>

                    {isSpotExpanded && (
                        <View style={styles.drawerSubMenu}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("Drawer", { screen: 'WeighBridgeNavigation' })}
                                style={styles.drawerSubMenuItem}
                            >
                                <MaterialIcons name={IconName.SCALE} size={18} color={colors.gray} />
                                <Text style={textStyles.drawerSubMenuText}>{Strings.WEIGHBRIDGE}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("Drawer", { screen: 'GenericSpotNavigation' })}
                                style={styles.drawerSubMenuItem}
                            >
                                <MaterialIcons name={IconName.LOCATION_ON} size={18} color={colors.gray} />
                                <Text style={textStyles.drawerSubMenuText}>{Strings.GENERIC}</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {/* RFID Reader's */}
                    <DrawerItem
                        label={() => (
                            <View style={containerStyles.drawerItemContainer}>
                                <MaterialIcons name={IconName.WIFI_THETHERING} size={20} color={colors.darkblack} />
                                <Text style={textStyles.drawerItemText}>{Strings.RFID_READERS}</Text>
                            </View>
                        )}
                        onPress={() => navigation.navigate("Drawer", { screen: 'RfidScreenNavigation' })}
                    />

                    <DrawerItem
                        label={() => (
                            <View style={containerStyles.drawerItemContainer}>
                                <MaterialIcons name={IconName.LOGOUT} size={20} color={colors.redBase} />
                                <Text style={[textStyles.drawerItemText, { color: colors.redBase }]}>{Strings.LOGOUT}</Text>
                            </View>
                        )}
                        onPress={handleLogout}
                    />
                </View>
            </DrawerContentScrollView>
        </View>
    );
}


export default CustomDrawerContent;