import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { IconName, Strings } from '../../assets/constants/Lable';
import colors from '../../assets/color/colors';
import { ButtonStyles } from '../../styles/ButtonStyles';
import { ContainerStyles } from '../../styles/ContainerStyles';
import { TextStyles } from '../../styles/TextStyles';
import { InputStyles } from '../../styles/InputStyles';
type SearchBarProps = {
    placeholder?: string;
    onSearch: (query: string) => void;
    onCancel: () => void;
    searchIcon: string;
};

function CustomSearchBar({ placeholder = IconName.SEARCH, onSearch, onCancel, searchIcon }: SearchBarProps) {
    const [searchText, setSearchText] = useState<string>('');
    const { buttonStyles } = ButtonStyles();
    const { textStyles } = TextStyles();
    const { inputStyles } = InputStyles();
    const { containerStyles } = ContainerStyles();
    const handleSearch = (text: string) => {
        setSearchText(text);
        onSearch(text);
    };

    const handleCancel = () => {
        setSearchText('');
        onCancel();
    };

    return (
        <View style={containerStyles.searchContainer}>
            <Icon name={searchIcon} size={20} color={colors.darkblack} />
            <TextInput
                style={inputStyles.searchInput}
                placeholder={placeholder}
                value={searchText}
                onChangeText={handleSearch}
                autoCorrect={false}
            />
            {searchText.length > 0 && (
                <TouchableOpacity onPress={handleCancel} style={buttonStyles.searchCancelButton}>
                    <Text style={textStyles.searchCancelText}>{Strings.CANCLE}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};


export default CustomSearchBar;
