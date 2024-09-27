import React, { useEffect, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, FlatList, StyleSheet, Button, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../assets/color/colors';
import CustomSearchBar from '../customSearchBar/CustomSearchBar';

function BusinessUnitModal(props: { businessUnits: any, isVisible: any, handleOpenModal: any, handleCloseModal: any, onOptionSelected: any, selectedOption: any }) {
  const { businessUnits, isVisible, handleCloseModal, onOptionSelected } = props
  const [filteredOptions, setFilteredOptions] = useState(businessUnits);
  const [searchVisible, setSearchVisible] = useState(false)
  const handleSelectBusinessUnit = (unit: any) => {
    Keyboard.dismiss();
    handleCloseModal();
    onOptionSelected(unit)
    setSearchVisible(false)
  };
  console.log("filterOptions" , filteredOptions )
  const filterOptions = (text: string) => {
    setFilteredOptions(
      businessUnits.filter((option: any) =>
        option.name.toLowerCase().includes(text.toLowerCase())
      )
    );
 
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => handleSelectBusinessUnit(item)}
    >
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );
  const handleSearchClick = () => {
    setSearchVisible(true)
  }
  useEffect(() => {
    if (isVisible) {
      setFilteredOptions(businessUnits); 
    }
  }, [isVisible, businessUnits]);

  return (
    <View style={styles.container} onAccessibilityAction={handleCloseModal}>
      <Modal
        transparent={true}
        animationType="slide"
        visible={isVisible}
        onRequestClose={handleCloseModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalheading}>
              <Text style={styles.modalTitle}>Select Business Unit</Text>
              <View style={styles.modalheadingicon }>
                <TouchableOpacity style={styles.closeButton} onPress={handleSearchClick}>
                  <Icon name='search' size={24} color={colors.blueDarkest} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
                  <Icon name='cancel' size={24} color={colors.blueDarkest} />
                </TouchableOpacity>
              </View>

            </View>
            {searchVisible &&
              <CustomSearchBar
                onSearch={filterOptions}
                onCancel={() => setSearchVisible(false)}
                searchIcon={''} />
            }
            <FlatList
              data={filteredOptions}
              renderItem={renderItem}
              keyExtractor={(item) => item.code}
              style={styles.list}
            />
          </View>
        </View>

      </Modal>
    </View>
  );
};

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
    flexDirection: "row",
    justifyContent: "space-between"
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalheadingicon: {
    flexDirection: "row",
    columnGap: 30
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
    fontSize: 16,
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

export default BusinessUnitModal;
