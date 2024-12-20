import React from 'react';
import { TextInput, View, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../assets/color/colors'; // Ensure this is properly imported
import fontSizes from '../../assets/fonts/FontSize'; // Ensure this is properly imported
import { IconName } from '../../assets/constants/Lable';

function SearchBar(props: {
  searchQuery: any,
  setSearchQuery: any,
  clearSearch: any,
  placeholder: any,
}) {
  const { clearSearch, placeholder = `${IconName.SEARCH}...`, searchQuery, setSearchQuery } = props


  return (
    <View style={styles.searchWrapper}>
      <View style={styles.searchInput}>
        <MaterialIcons name={IconName.SEARCH} size={25} color={colors.SecondaryTextColor} />
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
            <MaterialIcons name={IconName.CLEAR} size={20} color={colors.redBase} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '95%',
    height: 45,
    borderWidth: 1,
    borderColor: colors.SoftGray,
    borderRadius: 30,
    fontSize: fontSizes.text,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: colors.backgroundColor,
  },
  textInput: {
    width: '83%',
    fontSize: fontSizes.text,
  },
  clearButton: {
    borderRadius: 30,
    padding: 1,
  },
});

export default SearchBar;
