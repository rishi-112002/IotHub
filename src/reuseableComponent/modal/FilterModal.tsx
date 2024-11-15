import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, FlatList, StyleSheet, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../assets/color/colors';
import fontSizes from '../../assets/fonts/FontSize';
import CustomIcon from '../customIcons/CustomIcon';
import CustomButton from '../customButton/CustomButton';

type FilterModalProps = {
    filters: any;
    isVisible: boolean;
    handleCloseModal: () => void;
    onOptionSelected: (option: { name: string; id: string }) => void;
    openCalendarModal: any;
    DateFromValue: any;
    ToDateValue: any;
    setCurrentFiled: any;
    setGenericmodalVisible: any;
    name: any;
    direction: any;
    spot: any;
    handleFilterClick: any;
    handleReset: any
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
    setGenericmodalVisible,
    handleReset,
    direction, name, spot, handleFilterClick
}) => {
    const [filteredOptions, setFilteredOptions] = useState(filters);
    useEffect(() => {
        if (isVisible) {
            setFilteredOptions(filters);
        }
    }, [isVisible, filters]);

    const handleSelectFilter = useCallback((option: { name: string; id: string, path: any }) => {
        Keyboard.dismiss();
        onOptionSelected(option);
        if (option.id === "FROM_DATE" || option.id === "TO_DATE") {
            openCalendarModal();
        } else {
            setGenericmodalVisible(true);
            setCurrentFiled(option.id);
        }
    }, [onOptionSelected, openCalendarModal, setGenericmodalVisible, setCurrentFiled]);
    console.log("date i get in filter modal ", DateFromValue, ToDateValue)

    const renderItem = useCallback(({ item }: { item: { name: string; id: string, path: any } }) => (
        <TouchableOpacity style={styles.item} onPress={() => handleSelectFilter(item)}>
            <Text style={styles.itemText}>
                {item.name}
                {item.id === 'FROM_DATE' && DateFromValue ? `: ${DateFromValue}` : ''}
                {item.id === 'TO_DATE' && ToDateValue ? `: ${ToDateValue}` : ''}
                {item.id === 'SPOT_NAME' && spot.name ? `: ${spot.name}` : ''}
                {item.id === 'NAME' && name.name ? `: ${name.name}` : ''}
                {item.id === 'DIRECTION' && direction.name ? `: ${direction.name}` : ''}
            </Text>
            <CustomIcon iconPath={item.path} onPress={undefined} />
        </TouchableOpacity>
    ), [handleSelectFilter, DateFromValue, ToDateValue, spot.name, name.name, direction.name]);
    return (
        <Modal transparent={true} animationType="slide" visible={isVisible} onRequestClose={handleCloseModal}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeading}>
                        <Text style={styles.modalTitle}>Select Filter</Text>
                        <View style={{ flexDirection: 'row', columnGap: 10, padding: 5 }}>

                            <TouchableOpacity style={{
                                backgroundColor: colors.white,
                                paddingHorizontal: 5
                            }} onPress={handleReset}>
                                <Text style={{ color: colors.blueDarkest, fontSize: fontSizes.text }}>
                                    reset
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
                                <Icon name="cancel" size={24} color={colors.blueDarkest} />
                            </TouchableOpacity>
                        </View>

                    </View>
                    <FlatList
                        data={filteredOptions}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        style={styles.list}
                    />
                    <CustomButton label={'filter'} onPress={handleFilterClick} />
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

    },
});

export default FilterModal;
