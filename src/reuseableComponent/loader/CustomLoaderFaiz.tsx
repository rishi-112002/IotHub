import React, { Component } from 'react';
import { Modal, ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import colors from '../../assets/color/colors';
import { ComponentStyles } from '../../styles/ComponentStyles';

const LoadingModal = ({ visible, message }: any) => {
  const { styles } = ComponentStyles()
  return (
    <Modal
      transparent={true}
      animationType="none"
      visible={visible}
      onRequestClose={() => { }}>
      <View style={styles.filterOverlay}>
        <ActivityIndicator size="large" color={colors.bluelight} />
        {message && <Text style={styles.message}>{message}</Text>}
      </View>
    </Modal>
  );
};
export default LoadingModal;
