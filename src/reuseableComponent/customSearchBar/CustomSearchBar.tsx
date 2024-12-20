import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { IconName, Lable, Strings } from '../../assets/constants/Lable';
import colors from '../../assets/color/colors';
type SearchBarProps = {
    placeholder?: string;
    onSearch: (query: string) => void;
    onCancel: () => void;
    searchIcon: string;
};

function CustomSearchBar({ placeholder = IconName.SEARCH, onSearch, onCancel, searchIcon }: SearchBarProps) {
    const [searchText, setSearchText] = useState<string>('');

    const handleSearch = (text: string) => {
        setSearchText(text);
        onSearch(text);
    };

    const handleCancel = () => {
        setSearchText('');
        onCancel();
    };

    return (
        <View style={styles.container}>
            <Icon name={searchIcon} size={20} color={colors.darkblack} />
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                value={searchText}
                onChangeText={handleSearch}
                autoCorrect={false}
            />
            {searchText.length > 0 && (
                <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
                    <Text style={styles.cancelText}>{Strings.CANCLE}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.SoftGray,
        padding: 8,
        borderRadius: 8,
        marginHorizontal: 16,
        marginTop: 10,
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    input: {
        flex: 1,
        paddingVertical: 4,
        paddingHorizontal: 8,
        fontSize: 16,
    },
    cancelButton: {
        paddingHorizontal: 8,
    },
    cancelText: {
        color: colors.AppPrimaryColor,
        fontSize: 16,
    },
});

export default CustomSearchBar;
