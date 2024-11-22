import React from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
type type = "used" | "connectivity"
function FilterModal(props: {
  isVisible: boolean,
  toggleFilterMenu: any,
  spotTypeConnectivity: any,
  handleFilterPress: any,
  type: type
}) {
  const { handleFilterPress, isVisible, spotTypeConnectivity, toggleFilterMenu, type } = props
  const handleConnectedPress = () => {
    if (type === "connectivity") {
      handleFilterPress('connected')
    }
    else {
      handleFilterPress("used")
    }
  }

  const handleNotConnectedPress = () => {
    if (type === "connectivity") {
      handleFilterPress('not-connected')
    }
    else {
      handleFilterPress("un-used")
    }
  }
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => toggleFilterMenu()}>
      <TouchableWithoutFeedback onPress={() => toggleFilterMenu()}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.filterMenuContainer}>
              <TouchableOpacity
                style={[
                  styles.filterItem,
                  spotTypeConnectivity === 'connected' && styles.selectedFilter,
                ]}
                onPress={handleConnectedPress}>
                <MaterialIcons name="link" size={24} color="black" />
                <Text style={styles.filterText}> {type === "connectivity" ? "Connected" : "Used"}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.filterItem,
                  spotTypeConnectivity === 'not-connected' &&
                  styles.selectedFilter,
                ]}
                onPress={handleNotConnectedPress}>
                <MaterialIcons name="link-off" size={24} color="black" />
                <Text style={styles.filterText}>{type === "connectivity" ? "Not-Connected" : "Un-Used"}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.filterItem,
                  spotTypeConnectivity === 'all' && styles.selectedFilter,
                ]}
                onPress={() => handleFilterPress('all')}>
                <MaterialIcons name="filter-list" size={24} color="black" />
                <Text style={styles.filterText}>All</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  filterMenuContainer: {
    marginTop: 60,
    width: '50%',
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 10,
    alignSelf: 'flex-end',
    marginRight: 10,
    elevation: 5,
    // backgroundColor: 'red',
  },
  filterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
  },
  selectedFilter: {
    backgroundColor: '#e0e0e0',
  },
  filterText: {
    marginLeft: 8,
    fontSize: 16,
  },
});

export default FilterModal;
