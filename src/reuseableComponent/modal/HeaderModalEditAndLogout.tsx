import React from 'react';
import { View, Text, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { IconName } from '../../assets/constants/Lable';
import colors from '../../assets/color/colors';
import { ContainerStyles } from '../../styles/ContainerStyles';
import { TextStyles } from '../../styles/TextStyles';


function UserModal(props: { modalVisible: any, setModalVisible: any, username: any, onLogout: any }) {
    const { modalVisible, setModalVisible, username, onLogout } = props

    const { containerStyles } = ContainerStyles();
    const { textStyles } = TextStyles();
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
                <View style={containerStyles.userModalContainer}>
                    <View style={containerStyles.userModalContent}>
                        <View style={containerStyles.userModalItem}>
                            <MaterialIcons name={IconName.PERSON} size={24} color={colors.darkblack} />
                            <Text style={textStyles.userModalText}>{username}</Text>
                        </View>
                        <TouchableOpacity style={containerStyles.userModalItem} onPress={onLogout}>
                            <MaterialIcons name={IconName.LOGOUT} size={24} color={colors.darkblack} />
                            <Text style={textStyles.userModalText}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};


export default UserModal;
