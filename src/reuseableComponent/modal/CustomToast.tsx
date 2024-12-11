import Toast from 'react-native-toast-message';
const showCustomToast = (type: any, message: any) => {
  // setTimeout(() => {
    Toast.show({
      type: type === 'success' ? 'success' : 'error',
      text1: type === 'success' ? 'Success' : 'Error',
      text2: message,
      position: 'top',
    });
  // }, 200);
};
export default showCustomToast;
