import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import fontSizes from '../../assets/fonts/FontSize';
import colors from '../../assets/color/colors';
import { Strings } from '../../assets/constants/Lable';
import { ComponentStyles } from '../../styles/ComponentStyles';
import { ContainerStyles } from '../../styles/ContainerStyles';
import { TextStyles } from '../../styles/TextStyles';
import { ButtonStyles } from '../../styles/ButtonStyles';

interface CustomAlertProps {
  isVisible: boolean;
  onClose: () => void;
  onOkPress: () => void;
  title: string;
  message: string;
  showCancel?: boolean;
  type?: 'success' | 'error' | 'confirmation';
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  isVisible,
  onClose,
  onOkPress,
  title,
  message,
  showCancel = true,
}) => {
  const { textStyles } = TextStyles();
  const { containerStyles } = ContainerStyles();
  const { buttonStyles } = ButtonStyles()
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      backdropColor='black'
      backdropOpacity={0.3}
      animationIn="fadeIn"
      animationOut="fadeOut">
      <View style={containerStyles.alertContainer}>
        <Text style={textStyles.alertTitle}>{title}</Text>
        <Text style={textStyles.alertMessage}>{message}</Text>
        <View
          style={{ backgroundColor: colors.CloudyWhite, height: 1 }}
        />
        <View style={buttonStyles.buttonContainer}>
          {showCancel && (
            <TouchableOpacity style={buttonStyles.cancelButton} onPress={onClose}>
              <Text style={buttonStyles.cancelButtonText}>{Strings.CANCLE}</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={buttonStyles.okButton} onPress={onOkPress}>
            <Text style={buttonStyles.okButtonText}>{Strings.CONFIRM}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomAlert;
