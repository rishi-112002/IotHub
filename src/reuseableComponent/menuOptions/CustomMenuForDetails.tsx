import * as React from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { Button, Menu, Divider, PaperProvider } from 'react-native-paper';
import colors from '../../assets/color/colors';
import { useNavigation } from '@react-navigation/native'; // For navigation between screens

function CustomMenuForDetails(props: { visible: boolean; closeMenu: () => void; setVisible: (val: boolean) => void }) {
    const { visible, closeMenu, setVisible } = props;
    const navigation = useNavigation(); // To navigate between screens

    const openMenu = () => setVisible(true);

    // Navigate to SpotDetailsScreen or EventLogScreen
    const handleNavigation = (screen: string) => {
        closeMenu();
        // navigation.navigate(screen);
    };

    return (
        <PaperProvider>
            <Modal
                transparent={true}
                visible={visible}
                onRequestClose={closeMenu}
                animationType="fade"
            >
                <Pressable style={styles.modalOverlay} onPress={closeMenu}>
                    <View style={styles.menuContainer}>
                        <Menu
                            visible={visible}
                            onDismiss={closeMenu}
                            anchor={<Button onPress={openMenu}>Menu</Button>}
                        >
                            <Menu.Item 
                                onPress={() => handleNavigation('SpotDetailsScreen')} 
                                title="Spot Details"
                                style={{ backgroundColor: colors.AppPrimaryColor }}
                            />
                            <Menu.Item 
                                onPress={() => handleNavigation('EventLogScreen')} 
                                title="Event Log"
                            />
                            <Divider />
                            <Menu.Item 
                                onPress={closeMenu} 
                                title="Close Menu" 
                            />
                        </Menu>
                    </View>
                </Pressable>
            </Modal>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for modal
    },
    menuContainer: {
        backgroundColor: 'white',
        padding: 10,
        marginHorizontal: 20,
        borderRadius: 10,
    },
});

export default CustomMenuForDetails;
