import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import RNPickerSelect from 'react-native-picker-select';
import fontSizes from '../../assets/fonts/FontSize';

const months = [
    { label: 'January', value: 1 },
    { label: 'February', value: 2 },
    { label: 'March', value: 3 },
    { label: 'April', value: 4 },
    { label: 'May', value: 5 },
    { label: 'June', value: 6 },
    { label: 'July', value: 7 },
    { label: 'August', value: 8 },
    { label: 'September', value: 9 },
    { label: 'October', value: 10 },
    { label: 'November', value: 11 },
    { label: 'December', value: 12 },
];

const years = Array.from({ length: 100 }, (_, i) => ({
    label: `${2024 - i}`,
    value: 2024 - i,
}));

function CustomCalendarModal(props: { visible: any, onClose: any, onDateSelect: any }) {
    const { visible, onClose, onDateSelect } = props;
    const [selectedDate, setSelectedDate] = useState('');
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    const handleDayPress = (day: { dateString: React.SetStateAction<string> }) => {
        setSelectedDate(day.dateString);
        onDateSelect(day.dateString);
    };

    const handleMonthChange = (month: React.SetStateAction<number>) => {
        setCurrentMonth(month);
    };

    const handleYearChange = (year: React.SetStateAction<number>) => {
        setCurrentYear(year);
    };

    return (
        <View>

            {visible && <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Select a Date</Text>

                        {/* Month and Year Pickers */}
                        <View style={styles.pickerContainer}>
                            <RNPickerSelect
                                onValueChange={(value: any) => handleMonthChange(value)}
                                items={months}
                                value={currentMonth}
                                style={pickerSelectStyles}
                                placeholder={{}}
                            />
                            <RNPickerSelect
                                onValueChange={(value: any) => handleYearChange(value)}
                                items={years}
                                value={currentYear}
                                style={pickerSelectStyles}
                                placeholder={{}}
                            />
                        </View>

                        {/* Calendar */}
                        <Calendar
                            style={styles.calendar}
                            current={`${currentYear}-${currentMonth < 10 ? `0${currentMonth}` : currentMonth}-01`} // Updating the calendar view when month/year changes
                            onDayPress={handleDayPress}
                            markedDates={{
                                [selectedDate]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' },
                            }}
                            theme={{
                                selectedDayBackgroundColor: '#4285F4',
                                selectedDayTextColor: '#ffffff',
                                todayTextColor: '#34A853',
                                arrowColor: '#4285F4',
                                textDayFontSize: 16,
                                textMonthFontSize: 18,
                                textDayHeaderFontSize: 16,
                                textSectionTitleColor: '#333333',
                                textMonthFontWeight: 'bold',
                            }}
                            hideArrows={true}  // Hide arrows since we are using pickers
                        />

                        {/* Close Button */}
                        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>}
        </View>

    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',  // Darker transparent background
    },
    modalContent: {
        width: 360,
        backgroundColor: '#f9f9f9',
        borderRadius: 15,
        padding: 25,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    pickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    calendar: {
        width: '100%',
        borderRadius: 10,
        overflow: 'hidden',
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: '#4285F4',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

const pickerSelectStyles = {

    inputAndroid: {
        fontSize: fontSizes.subheading,
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 5,
        color: '#333',
        marginBottom: 10,
        width: 120,
        backgroundColor: '#f0f0f0',
    },
};

export default CustomCalendarModal;
