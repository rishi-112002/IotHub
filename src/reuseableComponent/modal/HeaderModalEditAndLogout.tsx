import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


function UserModal(props: { modalVisible: any, setModalVisible: any, username: any, onLogout: any }) {
    const { modalVisible, setModalVisible, username, onLogout} = props
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(false);
            }}
        >

            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalItem}>
                            <MaterialIcons name="person" size={24} color="black" />
                            <Text style={styles.modalText}>{username}</Text>
                        </View>
                        <TouchableOpacity style={styles.modalItem} onPress={onLogout}>
                            <MaterialIcons name="logout" size={24} color="black" />
                            <Text style={styles.modalText}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        padding: 10,
        alignItems: 'flex-end',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: '40%',
    },
    modalItem: {
        flexDirection: 'row',
        marginVertical: 10,
     marginHorizontal:15
    },
    modalText: {
        marginLeft:"auto",
        fontSize: 18,
    },
    closeButton: {
        marginTop: 20,
    },
    closeText: {
        color: 'blue',
        fontSize: 16,
    },
});

export default UserModal;
