import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../assets/color/colors';

type FilterOption = 'connected' | 'not-connected' | 'all';

interface SearchAndFilterProps {
  currentFilter: FilterOption;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onFilterChange: (filter: FilterOption) => void;
  placeholder?: string;
}

const SearchAndFilterComponent: React.FC<SearchAndFilterProps> = ({
  currentFilter,
  searchQuery,
  onSearchChange,
  onFilterChange,
  placeholder = 'Search...',
}) => {
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);

  const toggleFilterModal = () => {
    setFilterModalVisible(prev => !prev);
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchWrapper}>
        <View style={styles.searchInput}>
          <MaterialIcons name="search" size={30} color="gray" />
          <TextInput
            style={styles.textInput}
            placeholder={placeholder}
            value={searchQuery}
            onChangeText={onSearchChange}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => onSearchChange('')}>
              <MaterialIcons name="clear" size={20} color="red" />
            </TouchableOpacity>
          )}
        </View>

        {/* Filter Button */}
        <TouchableOpacity
          style={styles.filterButton}
          onPress={toggleFilterModal}>
          <MaterialIcons name="filter-list-alt" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Filter Modal */}
      <Modal
        visible={isFilterModalVisible}
        transparent
        animationType="fade"
        onRequestClose={toggleFilterModal}>
        <TouchableWithoutFeedback onPress={toggleFilterModal}>
          <View style={styles.overlay}>
            <View style={styles.filterMenuContainer}>
              <TouchableOpacity
                style={[
                  styles.filterItem,
                  currentFilter === 'connected' && styles.selectedFilter,
                ]}
                onPress={() => {
                  onFilterChange('connected');
                  toggleFilterModal();
                }}>
                <MaterialIcons name="link" size={24} color="black" />
                <Text style={styles.filterText}>Connected</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.filterItem,
                  currentFilter === 'not-connected' && styles.selectedFilter,
                ]}
                onPress={() => {
                  onFilterChange('not-connected');
                  toggleFilterModal();
                }}>
                <MaterialIcons name="link-off" size={24} color="black" />
                <Text style={styles.filterText}>Not Connected</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.filterItem,
                  currentFilter === 'all' && styles.selectedFilter,
                ]}
                onPress={() => {
                  onFilterChange('all');
                  toggleFilterModal();
                }}>
                <MaterialIcons name="filter-list" size={24} color="black" />
                <Text style={styles.filterText}>All</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  searchInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dbd9da',
    borderRadius: 8,
    backgroundColor: colors.backgroundColor,
    paddingHorizontal: 10,
    height: 45,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
  },
  filterButton: {
    marginLeft: 10,
    backgroundColor: colors.blueBase,
    borderRadius: 8,
    padding: 10,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterMenuContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    elevation: 10,
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

export default SearchAndFilterComponent;
