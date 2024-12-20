import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, FlatList, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../assets/color/colors';
import CustomIcon from '../customIcons/CustomIcon';
import CustomButton from '../customButton/CustomButton';
import { IconName, Strings } from '../../assets/constants/Lable';
import { ComponentStyles } from '../../styles/ComponentStyles';
import { ButtonStyles } from '../../styles/ButtonStyles';
import { ContainerStyles } from '../../styles/ContainerStyles';
import { TextStyles } from '../../styles/TextStyles';


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

    const { containerStyles } = ContainerStyles();
    const { styles } = ComponentStyles();
    const { textStyles } = TextStyles();
    const { buttonStyles } = ButtonStyles();
    useEffect(() => {
        if (isVisible) {
            setFilteredOptions(filters);
        }
    }, [isVisible, filters]);

    const handleSelectFilter = useCallback((option: { name: string; id: string, path: any }) => {
        Keyboard.dismiss();
        onOptionSelected(option);
        if (option.id === Strings.FROM_DATE || option.id === Strings.TO_DATE) {
            openCalendarModal();
        } else {
            setGenericmodalVisible(true);
            setCurrentFiled(option.id);
        }
    }, [onOptionSelected, openCalendarModal, setGenericmodalVisible, setCurrentFiled]);
    const handleClearSelection = useCallback(
        (id: any) => {
            if (id === Strings.FROM_DATE) { setSelectedFromDate(null); setDateFromValue("") };
            if (id === Strings.TO_DATE) { setSelectedToDate(""); setToDateValue("") };
            if (id === Strings.SPOT_NAME) { setSelectedSpot("") };
            if (id === Strings.NAME) { setSelectedName("") };
            if (id === Strings.DIRECTION) { setSelectedDirection("") };
        }, []);



    const renderItem = useCallback(({ item }: { item: { name: string; id: string, path: any } }) => (
        <TouchableOpacity style={styles.item} onPress={() => handleSelectFilter(item)}>
            <View style={containerStyles.itemTextContainer}>
                <Text style={textStyles.generalItemText}>
                    {item.name}
                    {item.id === Strings.FROM_DATE && DateFromValue ? `: ${DateFromValue}` : ''}
                    {item.id === Strings.TO_DATE && ToDateValue ? `: ${ToDateValue}` : ''}
                    {item.id === Strings.SPOT_NAME && spot.name ? `: ${spot.name}` : ''}
                    {item.id === Strings.NAME && name.name ? `: ${name.name}` : ''}
                    {item.id === Strings.DIRECTION && direction.name ? `: ${direction.name}` : ''}
                </Text>
                {((item.id === Strings.FROM_DATE && DateFromValue) ||
                    (item.id === Strings.TO_DATE && ToDateValue) ||
                    (item.id === Strings.SPOT_NAME && spot.name) ||
                    (item.id === Strings.NAME && name.name) ||
                    (item.id === Strings.DIRECTION && direction.name)) && (
                        <TouchableOpacity
                            style={buttonStyles.filterClearButton}
                            onPress={() => handleClearSelection(item.id)}
                        >
                            <Icon name={IconName.CLOSE} size={15} color={colors.redDarkest} />
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
            <View style={containerStyles.modalContainer}>
                <View style={containerStyles.modalContent}>
                    <View style={textStyles.modalHeading}>
                        <Text style={textStyles.modalTitle}>{Strings.SELECT_FILTER}</Text>
                        <View style={{ flexDirection: 'row', columnGap: 10, padding: 5 }}>

                            <TouchableOpacity style={{
                                backgroundColor: colors.white,
                                paddingHorizontal: 5
                            }} onPress={handleReset}>
                                <Text style={textStyles.resetText}>
                                    {Strings.RESET}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleCloseModal}>
                                <Icon name={IconName.CANCLE} size={24} color={colors.SecondaryTextColor} />
                            </TouchableOpacity>
                        </View>

                    </View>
                    <FlatList
                        data={filteredOptions}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        style={styles.generalList}
                    />
                    <CustomButton label={Strings.FILTER} onPress={handleFilterClick} />
                </View>
            </View>
        </Modal>
    );
};
export default FilterModal;

