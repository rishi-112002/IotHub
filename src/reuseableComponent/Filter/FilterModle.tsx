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
import { IconName, Strings } from '../../assets/constants/Lable';
import colors from '../../assets/color/colors';
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
    if (type === Strings.CONNECTIVITY_S) {
      handleFilterPress(Strings.CONNECTED_S)
    }
    else {
      handleFilterPress(Strings.USED_s)
    }
  }

  const handleNotConnectedPress = () => {
    if (type === Strings.CONNECTIVITY_S) {
      handleFilterPress(Strings.NOT_CONNECTED_s)
    }
    else {
      handleFilterPress(Strings.UN_USED_s)
    }
  }
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => toggleFilterMenu()}>
      <TouchableWithoutFeedback onPress={toggleFilterMenu}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.filterMenuContainer}>
              <TouchableOpacity
                style={[
                  styles.filterItem,
                  spotTypeConnectivity === Strings.CONNECTED_S && styles.selectedFilter,
                ]}
                onPress={handleConnectedPress}>
                <MaterialIcons name={IconName.LINK} size={24} color={colors.darkblack} />
                <Text style={styles.filterText}> {type === Strings.CONNECTIVITY_S ? Strings.CONNECTED : Strings.USED}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.filterItem,
                  spotTypeConnectivity === Strings.NOT_CONNECTED_s &&
                  styles.selectedFilter,
                ]}
                onPress={handleNotConnectedPress}>
                <MaterialIcons name={IconName.LINK_OFF} size={24} color={colors.darkblack} />
                <Text style={styles.filterText}>{type === Strings.CONNECTIVITY_S ? Strings.NOT_CONNECTED : Strings.UN_USED_s}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.filterItem,
                  spotTypeConnectivity === Strings.ALL && styles.selectedFilter,
                ]}
                onPress={() => handleFilterPress(Strings.ALL)}>
                <MaterialIcons name={IconName.FILTER_LIST} size={24} color={colors.darkblack} />
                <Text style={styles.filterText}>{Strings.ALL}</Text>
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
