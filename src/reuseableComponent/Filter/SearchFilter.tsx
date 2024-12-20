import React from 'react';
import { TextInput, View, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../assets/color/colors'; // Ensure this is properly imported
import fontSizes from '../../assets/fonts/FontSize'; // Ensure this is properly imported
import { IconName } from '../../assets/constants/Lable';
import { ComponentStyles } from '../../styles/ComponentStyles';
import { ButtonStyles } from '../../styles/ButtonStyles';
import { CardStyles } from '../../styles/CardStyles';
import { ContainerStyles } from '../../styles/ContainerStyles';
import { InputStyles } from '../../styles/InputStyles';
import { TextStyles } from '../../styles/TextStyles';

function SearchBar(props: {
  searchQuery: any,
  setSearchQuery: any,
  clearSearch: any,
  placeholder: any,
}) {
  const { clearSearch, placeholder = `${IconName.SEARCH}...`, searchQuery, setSearchQuery } = props
  const { styles } = ComponentStyles();
  const { buttonStyles } = ButtonStyles();
  const { inputStyles } = InputStyles();
  return (
    <View style={styles.searchWrapper}>
      <View style={inputStyles.searchFilterInput}>
        <MaterialIcons name={IconName.SEARCH} size={25} color={colors.SecondaryTextColor} />
        <TextInput
          style={inputStyles.searchTextInput}
          placeholder={placeholder}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={clearSearch} style={buttonStyles.clearButton}>
            <MaterialIcons name={IconName.CLEAR} size={20} color={colors.redBase} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

export default SearchBar;
