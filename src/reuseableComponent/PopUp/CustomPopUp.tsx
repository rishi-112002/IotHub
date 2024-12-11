import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import fontSizes from '../../assets/fonts/FontSize';
import colors from '../../assets/color/colors';
import { Strings } from '../../assets/constants/Lable';

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
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      backdropColor="transparent"
      backdropOpacity={0}
      animationIn="fadeIn"
      animationOut="fadeOut">
      <View style={styles.alertContainer}>
        <Text style={styles.alertTitle}>{title}</Text>
        <Text style={styles.alertMessage}>{message}</Text>
        <View
          style={{ backgroundColor: colors.CloudyWhite, height: 1 }}
        />
        <View style={styles.buttonContainer}>
          {showCancel && (
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>{Strings.CANCLE}</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.okButton} onPress={onOkPress}>
            <Text style={styles.okButtonText}>{Strings.CONFIRM}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomAlert;

const styles = StyleSheet.create({
  alertContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.CloudyWhite,
    elevation: 10,
    shadowColor: colors.darkblack,
    shadowOffset: { width: 10, height: 40 },
    shadowOpacity: 9,
    shadowRadius: 80,
  },
  alertTitle: {
    fontSize: fontSizes.subheader,
    fontWeight: 'bold',
    paddingVertical: 20,
    paddingHorizontal: 25,
    color: colors.inkDarkest,
    backgroundColor: colors.CloudyWhite,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  alertMessage: {
    fontSize: fontSizes.heading,
    paddingVertical: 20,
    paddingHorizontal: 25,
    textAlign: 'left',
  },
  buttonContainer: {
    padding:15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    width: '70%',
  },
  cancelButton: {
    borderColor: colors.lightGray,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    flex: 1,
  },
  okButton: {
    backgroundColor: colors.AppPrimaryColor,
    padding: 10,
    borderRadius: 10,
    flex: 1,
  },
  okButtonText: {
    color: colors.white,
    fontSize: fontSizes.title,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cancelButtonText: {
    color: colors.darkblack,
    fontSize: fontSizes.title,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
