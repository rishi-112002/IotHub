import React from 'react';
import Toast from 'react-native-toast-message';

function CustomToast (props :{ type: any, message: any }){
  const {message , type} = props;
  const showToast = () => {
    console.log('Toast Show')
    let toastConfig = {
      type: type,
      text1: type === 'success' ? 'Success' : type === 'fail' ? 'Error' : 'Warning',
      text2: message,
      position: 'top',
    };

    Toast.show(toastConfig);
  };

  return (
    <>
      {showToast()}
    </>
  );
};

export default CustomToast;
