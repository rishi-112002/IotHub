import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../assets/color/colors';
import CustomSearchBar from '../customSearchBar/CustomSearchBar';
import { IconName, Strings } from '../../assets/constants/Lable';
import { ComponentStyles } from '../../styles/ComponentStyles';
import { TextStyles } from '../../styles/TextStyles';
import { ButtonStyles } from '../../styles/ButtonStyles';
import { ContainerStyles } from '../../styles/ContainerStyles';

function GenericModal(props: {
  options: any[];
  nameKey: string;
  valueKey: any;
  isVisible: boolean;
  handleCloseModal: () => void;
  onOptionSelected: (selected: any) => void;
}) {
  const {
    options,
    nameKey,
    valueKey,
    isVisible,
    handleCloseModal,
    onOptionSelected,
  } = props;
  const [filteredOptions, setFilteredOptions] = useState(options);
  console.log("option", options)
  const [searchVisible, setSearchVisible] = useState(false);
  const handleSelectOption = (item: any) => {
    Keyboard.dismiss();
    handleCloseModal();
    onOptionSelected(item);
    setSearchVisible(false);
  };

  const { containerStyles } = ContainerStyles();
  const { styles } = ComponentStyles();
  const { textStyles } = TextStyles();
  const { buttonStyles } = ButtonStyles();

  const filterOptions = (text: string) => {
    setFilteredOptions(
      options.filter((option: any) =>
        option[nameKey]?.toLowerCase().includes(text.toLowerCase()),
      ),
    );
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={containerStyles.genralItem}
      onPress={() => handleSelectOption(item)}>
      <Text style={textStyles.generalItemText}>{item[nameKey]}</Text>
    </TouchableOpacity>
  );

  const handleSearchClick = () => {
    setSearchVisible(true);
  };
  useEffect(() => {
    if (isVisible) {
      setFilteredOptions(options);
    }
  }, [isVisible, options]);

  return (
    <View style={containerStyles.NoInteernetScreenContainer}>
      <Modal transparent={true} animationType="slide" visible={isVisible}>
        <TouchableWithoutFeedback onPress={() => handleCloseModal()}>
          <View style={containerStyles.modalContainer}>
            <View style={containerStyles.modalContent}>
              <View style={textStyles.generalModalHeading}>
                <Text style={textStyles.modalTitle}>{Strings.SELECT_OPTION}</Text>
                <View style={styles.modalheadingicon}>
                  <TouchableOpacity
                    style={buttonStyles.generalCloseButton}
                    onPress={handleSearchClick}>
                    <Icon name={IconName.SEARCH} size={24} color={colors.SecondaryTextColor} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={buttonStyles.generalCloseButton}
                    onPress={() => handleCloseModal()}>
                    <Icon name={IconName.CANCLE} size={24} color={colors.SecondaryTextColor} />
                  </TouchableOpacity>
                </View>
              </View>
              {searchVisible && (
                <CustomSearchBar
                  onSearch={filterOptions}
                  onCancel={() => setSearchVisible(false)}
                  searchIcon={''}
                />
              )}
              <FlatList
                data={filteredOptions}
                renderItem={renderItem}
                keyExtractor={item => item[valueKey]}
                style={styles.generalList}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  )
}

export default GenericModal;

