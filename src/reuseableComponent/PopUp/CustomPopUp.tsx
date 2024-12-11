import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import fontSizes from '../../assets/fonts/FontSize';
import colors from '../../assets/color/colors';

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
      backdropColor='black'
      backdropOpacity={0.3}
      animationIn="fadeIn"
      animationOut="fadeOut">
      <View style={styles.alertContainer}>
        <Text style={styles.alertTitle}>{title}</Text>
        <Text style={styles.alertMessage}>{message}</Text>
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{backgroundColor: '#edebeb', height: 1}}
        />
        <View style={styles.buttonContainer}>
          {showCancel && (
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.okButton} onPress={onOkPress}>
            <Text style={styles.okButtonText}>Confirm</Text>
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
    borderRadius:20,
    borderWidth:1,
    borderColor:'#edebeb',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 10, height: 40},
    shadowOpacity: 9,
    shadowRadius: 80,
  },
  alertTitle: {
    fontSize: fontSizes.subheader,
    fontWeight: 'bold',
    paddingVertical: 20,
    paddingHorizontal: 25,
    color: colors.inkDarkest,
    backgroundColor: '#edebeb',
    borderTopRightRadius: 20,
    borderBottomRightRadius:20,
  },
  alertMessage: {
    fontSize: fontSizes.heading,
    paddingVertical: 20,
    paddingHorizontal: 25,
    textAlign: 'left',
  },
  buttonContainer: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    width: '70%',
  },
  cancelButton: {
    borderColor: '#D3D3D3',
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
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cancelButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
