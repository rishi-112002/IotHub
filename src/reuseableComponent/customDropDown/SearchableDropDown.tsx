import React, { useEffect, useState } from "react";
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    FlatList,
    StyleSheet,
    Keyboard,
    ActivityIndicator,
} from "react-native";
import { useSelector } from "react-redux";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RootState } from "../../../reducer/Store";


function SearchableDropDown(props: { options: any, onOptionSelected: any, selectedOption: any }) {
    const { options, onOptionSelected, selectedOption } = props
    const [searchText, setSearchText] = useState(selectedOption);
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [isFocused, setIsFocused] = useState(false);
    const filterOptions = (text: string) => {
        setSearchText(text);
        setFilteredOptions(
            options.filter((option: any) =>
                option.name.toLowerCase().includes(text.toLowerCase())
            )
        );
    };
    const { loader } = useSelector((State: RootState) => State.buinessUnits)

    const onOptionPress = (option: any) => {
        Keyboard.dismiss();
        setSearchText(option.name);
        setFilteredOptions(options);
        setIsFocused(false);
        onOptionSelected(option);
        // console.log("selected one code", option.code)
    };
  
    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    value={searchText}
                    onChangeText={filterOptions}
                    placeholder="Select Business unit"
                    style={styles.input}
                    onFocus={() => setIsFocused(true)}
                />
              
                <Icon name="mic" size={24} color="#007BFF" style={styles.icon} />
            </View>


            {loader ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text style={styles.loadingText}>Loading...</Text>
                </View>
            ) : (

                isFocused && (
                    <FlatList
                        data={filteredOptions}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => onOptionPress(item)} style={styles.listItem}>
                                <Text style={styles.itemText}>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.code}
                        style={styles.list}
                    />
                )
            )}

        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    input: {
        flex: 1,
        color: "black",
        fontSize: 15,
        paddingVertical: 10,
    },
    icon: {
        paddingLeft: 10,
    },
    list: {
        backgroundColor: "#f9f9f9",
        maxHeight: 200,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 5,
    },
    listItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        backgroundColor: '#fff',
    },
    itemText: {
        fontSize: 16,
        color: "#333",
    },
    loaderContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: "#333",
    },
});


export default SearchableDropDown;
