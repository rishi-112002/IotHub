import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

function DetailsTypeModal(props: {
  modalVisible: any;
  setModalVisible: any;
  baseUrls: any;
  spotName: any;
  modalPosition: any;
}) {
  const {modalVisible, setModalVisible, baseUrls, spotName, modalPosition} =
    props;
  // console.log("hello", modalPosition)
  // const navigation = useNavigation()
  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => console.log('hello')}>
              <Text style={styles.iconText}>Spot Details</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => console.log('hello')}>
              <Text style={styles.iconText}>Event Logs</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  modalContent: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 10,
    width: 200,
  },
  iconButton: {
    padding: 10,
  },
  iconText: {
    fontSize: 16,
  },
});

export default DetailsTypeModal;
