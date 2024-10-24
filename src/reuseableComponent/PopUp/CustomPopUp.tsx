import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

interface CustomAlertProps {
  isVisible: boolean;
  onClose: () => void;
  onOkPress: () => void; // Pass the onOkPress function from the parent component
  title: string;
  message: string;
  showCancel?: boolean; // New prop to show or hide the cancel button
  type?: 'success' | 'error' | 'confirmation'; // New prop to define alert type
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  isVisible,
  onClose,
  onOkPress,
  title,
  message,
  showCancel = true,
  type = 'confirmation', // Default to confirmation alert type
}) => {
  const getAlertStyle = () => {
    switch (type) {
      case 'success':
        return styles.successContainer;
      case 'error':
        return styles.errorContainer;
      default:
        return styles.confirmationContainer;
    }
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={[styles.alertContainer, getAlertStyle()]}>
        <Text style={styles.alertTitle}>{title}</Text>
        <Text style={styles.alertMessage}>{message}</Text>
        <View style={styles.buttonContainer}>
          {/* Conditionally render Cancel Button */}
          {showCancel && (
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          )}

          {/* OK Button */}
          <TouchableOpacity style={styles.okButton} onPress={onOkPress}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomAlert;

// Styles using StyleSheet
const styles = StyleSheet.create({
  alertContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  alertMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    backgroundColor: '#ff6b6b',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  okButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // Additional styles for different alert types
  successContainer: {
    borderColor: '#4CAF50',
    borderWidth: 2,
  },
  errorContainer: {
    borderColor: '#ff6b6b',
    borderWidth: 2,
  },
  confirmationContainer: {
    borderColor: '#2196F3',
    borderWidth: 2,
  },
});
