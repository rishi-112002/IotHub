import React from 'react';
import Toast from 'react-native-toast-message';

interface CustomToastProps {
  type: 'success' | 'error' | 'info' | 'fail';
  message: any;
}

function CustomToast({ type, message }: CustomToastProps) {
  const showToast = () => {
    console.log('Toast Show');
    let toastConfig = {
      type: type === 'fail' ? 'error' : type,  // Map 'fail' to 'error' if needed
      text1: type === 'success' ? 'Success' : type === 'fail' ? 'Error' : 'Warning',
      text2: message,
      position: 'top' as 'top',  // Ensure 'position' matches the ToastPosition type
    };

    Toast.show(toastConfig);
  };

  return <>{showToast()}</>;
}

export default CustomToast;
