import Toast from 'react-native-toast-message';

const showCustomToast = (type, message) => {
  Toast.show({
    type: type === 'success' ? 'success' : 'error',
    text1: type === 'success' ? 'Success' : 'Error',
    text2: message,
    position: 'top',
  });
};

export default showCustomToast;
