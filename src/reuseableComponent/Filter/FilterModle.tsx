import React from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { IconName, Strings } from '../../assets/constants/Lable';
import colors from '../../assets/color/colors';
import { ComponentStyles } from '../../styles/ComponentStyles';
import { ContainerStyles } from '../../styles/ContainerStyles';
import { TextStyles } from '../../styles/TextStyles';
type type = "used" | "connectivity"
function FilterModal(props: {
  isVisible: boolean,
  toggleFilterMenu: any,
  spotTypeConnectivity: any,
  handleFilterPress: any,
  type: type
}) {
  const { handleFilterPress, isVisible, spotTypeConnectivity, toggleFilterMenu, type } = props
  const { styles } = ComponentStyles();
  const { textStyles } = TextStyles();
  const { containerStyles } = ContainerStyles();
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
        <View style={styles.filterOverlay}>
          <TouchableWithoutFeedback>
            <View style={containerStyles.filterMenuContainer}>
              <TouchableOpacity
                style={[
                  styles.filterItem,
                  spotTypeConnectivity === Strings.CONNECTED_S && styles.selectedFilter,
                ]}
                onPress={handleConnectedPress}>
                <MaterialIcons name={IconName.LINK} size={24} color={colors.darkblack} />
                <Text style={textStyles.filterText}> {type === Strings.CONNECTIVITY_S ? Strings.CONNECTED : Strings.USED}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.filterItem,
                  spotTypeConnectivity === Strings.NOT_CONNECTED_s &&
                  styles.selectedFilter,
                ]}
                onPress={handleNotConnectedPress}>
                <MaterialIcons name={IconName.LINK_OFF} size={24} color={colors.darkblack} />
                <Text style={textStyles.filterText}>{type === Strings.CONNECTIVITY_S ? Strings.NOT_CONNECTED : Strings.UN_USED_s}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.filterItem,
                  spotTypeConnectivity === Strings.ALL && styles.selectedFilter,
                ]}
                onPress={() => handleFilterPress(Strings.ALL)}>
                <MaterialIcons name={IconName.FILTER_LIST} size={24} color={colors.darkblack} />
                <Text style={textStyles.filterText}>{Strings.ALL}</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
export default FilterModal;
