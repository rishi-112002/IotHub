import React from 'react';
import {Modal, ActivityIndicator, View, Text, StyleSheet} from 'react-native';
import colors from '../../assets/color/colors';
// import {useSelector} from 'react-redux';
// import {RootState} from '../../reducer/Store';
// import {NavigationProp, useNavigation} from '@react-navigation/native';

const LoadingModal = ({visible, message}) => {
  // const error = useSelector((state: RootState) => state.rfidList.error);
  // console.log('Loader Modle error :- ', error);
  // const navigation = useNavigation<NavigationProp<any>>();

  // const handleNavigate = () => {
  //   if (error == null) {
  //     console.log('Loader Modle error :- ', error);
  //   }
  // };

  return (
    <Modal
      transparent={true}
      animationType="none"
      visible={visible}
      onRequestClose={() => {}}>
      <View style={styles.overlay}>
        <ActivityIndicator size="large" color={colors.bluelight} />
        {message && <Text style={styles.message}>{message}</Text>}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  message: {
    marginTop: 10,
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default LoadingModal;
