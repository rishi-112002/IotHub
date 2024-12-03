
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../assets/color/colors';
import CustomSearchBar from '../customSearchBar/CustomSearchBar';
import { Colors2 } from '../../assets/color/Colors2';
import fontSizes from '../../assets/fonts/FontSize';

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
  const [searchVisible, setSearchVisible] = useState(false);
  const handleSelectOption = (item: any) => {
    Keyboard.dismiss();
    handleCloseModal();
    onOptionSelected(item);
    setSearchVisible(false);
  };

  const filterOptions = (text: string) => {
    setFilteredOptions(
      options.filter((option: any) =>
        option[nameKey]?.toLowerCase().includes(text.toLowerCase()),
      ),
    );
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => handleSelectOption(item)}>
      <Text style={styles.itemText}>{item[nameKey]}</Text>
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
    <View style={styles.container}>
      <Modal transparent={true} animationType="slide" visible={isVisible}>
        <TouchableWithoutFeedback onPress={() => console.log('hello')}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalheading}>
                <Text style={styles.modalTitle}>Select Option</Text>
                <View style={styles.modalheadingicon}>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={handleSearchClick}>
                    <Icon name="search" size={24} color={Colors2.SecondaryTextColor} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => handleCloseModal()}>
                    <Icon name="cancel" size={24} color={Colors2.SecondaryTextColor} />
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
                style={styles.list}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  modalheading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.AppPrimaryColor
  },
  modalheadingicon: {
    flexDirection: 'row',
    columnGap: 30,
  },
  list: {
    maxHeight: 300,
    marginTop: 5,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: {
    fontSize: fontSizes.text,
    color: Colors2.PrimaryTextColor
  },
  closeButton: {
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  selectedUnitText: {
    marginTop: 20,
    fontSize: 16,
  },
});

export default GenericModal;
