import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type SearchBarProps = {
  placeholder?: string;
  onSearch: (query: string) => void;
  onMicPress: () => void; // Replace cancel with mic press functionality
};

function CustomSearchBarWithMic({ placeholder = 'Search', onSearch, onMicPress }: SearchBarProps) {
  const [searchText, setSearchText] = useState<string>('');

  const handleSearch = (text: string) => {
    setSearchText(text);
    onSearch(text);
  };

  const handleMicPress = () => {
    onMicPress(); // Trigger the mic press function
  };

  return (
    <View style={styles.container}>
      {/* Search Icon */}
      <Icon name="search" size={24} color="#000" style={styles.icon} />

      {/* Search Input */}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={searchText}
        onChangeText={handleSearch}
        autoCorrect={false}
      />

      {/* Mic Icon */}
      <TouchableOpacity onPress={handleMicPress} style={styles.micButton}>
        <Icon name="mic" size={24} color="#007BFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontSize: 16,
  },
  micButton: {
    paddingHorizontal: 8,
  },
});

export default CustomSearchBarWithMic;
