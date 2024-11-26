import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, FlatList, StyleSheet, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../assets/color/colors';
import fontSizes from '../../assets/fonts/FontSize';
import CustomIcon from '../customIcons/CustomIcon';
import CustomButton from '../customButton/CustomButton';
import { Colors2 } from '../../assets/color/Colors2';

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
    handleReset: any;
    setFilterCount: any;
    setSelectedSpot: any;
    setSelectedDirection: any;
    setSelectedFromDate: any;
    setSelectedName: any;
    setSelectedToDate: any;
    setToDateValue: any;
    setDateFromValue: any;
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
    direction, name, spot, handleFilterClick,
    setFilterCount,
    setDateFromValue, setSelectedDirection, setSelectedFromDate, setSelectedName, setSelectedSpot, setSelectedToDate, setToDateValue

}) => {
    const [filteredOptions, setFilteredOptions] = useState(filters);
    let count = 0;



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
    const handleClearSelection = useCallback(
        (id: any) => {
            if (id === 'FROM_DATE') { setSelectedFromDate(null); setDateFromValue("") };
            if (id === 'TO_DATE') { setSelectedToDate(""); setToDateValue("") };
            if (id === 'SPOT_NAME') { setSelectedSpot("") };
            if (id === 'NAME') { setSelectedName("") };
            if (id === 'DIRECTION') { setSelectedDirection("") };
        }, []);

    // console.log("date i get in filter modal ", DateFromValue, ToDateValue)

    const renderItem = useCallback(({ item }: { item: { name: string; id: string, path: any } }) => (
        <TouchableOpacity style={styles.item} onPress={() => handleSelectFilter(item)}>
            <View style={styles.itemTextContainer}>
                <Text style={styles.itemText}>
                    {item.name}
                    {item.id === 'FROM_DATE' && DateFromValue ? `: ${DateFromValue}` : ''}
                    {item.id === 'TO_DATE' && ToDateValue ? `: ${ToDateValue}` : ''}
                    {item.id === 'SPOT_NAME' && spot.name ? `: ${spot.name}` : ''}
                    {item.id === 'NAME' && name.name ? `: ${name.name}` : ''}
                    {item.id === 'DIRECTION' && direction.name ? `: ${direction.name}` : ''}
                </Text>
                {((item.id === 'FROM_DATE' && DateFromValue) ||
                    (item.id === 'TO_DATE' && ToDateValue) ||
                    (item.id === 'SPOT_NAME' && spot.name) ||
                    (item.id === 'NAME' && name.name) ||
                    (item.id === 'DIRECTION' && direction.name)) && (
                        <TouchableOpacity
                            style={styles.clearButton}
                            onPress={() => handleClearSelection(item.id)}
                        >
                            <Icon name="close" size={15} color={colors.redDarkest} />
                        </TouchableOpacity>
                    )}
            </View>

            <CustomIcon iconPath={item.path} onPress={() => handleSelectFilter(item)} />
        </TouchableOpacity>
    ), [handleSelectFilter, DateFromValue, ToDateValue, spot.name, name.name, direction.name]);
    const calculateFilterCount = useCallback(() => {

        if (DateFromValue) count++;
        if (ToDateValue) {
            count = count + 1
        };
        if (spot.name) count++;
        if (name.name) count++;
        if (direction.name) count++;

        setFilterCount(count);
    }, [DateFromValue, ToDateValue, spot.name, name.name, direction.name]);

    useEffect(() => {
        calculateFilterCount();
    }, [DateFromValue, ToDateValue, spot.name, name.name, direction.name]);

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

    closeButton: {

    },
    itemTextContainer: {
        flexDirection: 'row',
        alignItems: 'center', // Align text and button in the same row
        justifyContent: 'space-between', // Space out the text and the close button
    },
    clearButton: {
        marginLeft: 10, // Add spacing between the text and the close button
        backgroundColor: Colors2.DividerColor, // Optional: Add a background color for the button
        borderRadius: 15, // Optional: Make it circular
        padding: 2, // Add padding for better touch experience
    },
    itemText: {
        fontSize: fontSizes.text,
        color: colors.darkblack,
        fontWeight: '400',
        flexShrink: 1, // Ensure the text doesn't overflow
    },
});

export default FilterModal;
