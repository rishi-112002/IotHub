import React, { useEffect, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, FlatList, StyleSheet, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../assets/color/colors';
import fontSizes from '../../assets/fonts/FontSize';
import CustomIcon from '../customIcons/CustomIcon';

type FilterModalProps = {
    filters: any;
    isVisible: boolean;
    handleCloseModal: () => void;
    onOptionSelected: (option: { name: string; id: string }) => void;
    openCalendarModal: any;
    DateFromValue: any;
    ToDateValue: any;
    setCurrentFiled: any;
    setGenericmodalVisible: any
};

const FilterModal: React.FC<FilterModalProps> = ({
    filters,
    isVisible,
    handleCloseModal,
    onOptionSelected,
    openCalendarModal,
    DateFromValue,
    ToDateValue,
    setCurrentFiled,
    setGenericmodalVisible
}) => {
    const [filteredOptions, setFilteredOptions] = useState(filters);

    useEffect(() => {
        if (isVisible) {
            setFilteredOptions(filters);
        }
    }, [isVisible, filters]);

    const handleSelectFilter = (option: { name: string; id: string, path: any }) => {
        Keyboard.dismiss();
        onOptionSelected(option);
        if (option.id === "FROM_DATE" || option.id === "TO_DATE") {
            openCalendarModal()
        }
        else {
            console.log("selected option id", option.id)
            setGenericmodalVisible(true)
            setCurrentFiled(option.id)

        }
    };
    console.log("date i get in filter modal ", DateFromValue, ToDateValue)

    const renderItem = ({ item }: { item: { name: string; id: string, path: any } }) => (
        <TouchableOpacity style={styles.item} onPress={() => handleSelectFilter(item)}>
            <Text style={styles.itemText}>{item.name}
                {item.id === 'FROM_DATE' && DateFromValue ? `: ${DateFromValue}` : ''}
                {item.id === 'TO_DATE' && ToDateValue ? `: ${ToDateValue}` : ''}
            </Text>
            <CustomIcon iconPath={item.path} onPress={undefined} />
        </TouchableOpacity>
    );

    return (
        <Modal transparent={true} animationType="slide" visible={isVisible} onRequestClose={handleCloseModal}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeading}>
                        <Text style={styles.modalTitle}>Select Filter</Text>
                        <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
                            <Icon name="cancel" size={24} color={colors.blueDarkest} />
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={filteredOptions}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        style={styles.list}
                    />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: colors.white,
        padding: 20,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    modalHeading: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '500',
        color: colors.darkblack,
    },
    modalheading: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    list: {
        marginTop: 5,
    },
    item: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        flexDirection: "row",
        justifyContent: "space-between"
    },
    itemText: {
        fontSize: fontSizes.text,
        color: colors.darkblack,
        fontWeight: '400'
    },
    closeButton: {
        padding: 5,
    },
});

export default FilterModal;
