import DateTimePicker from 'react-native-ui-datepicker';
import React from 'react';
import { Modal, View } from 'react-native';
import { ContainerStyles } from '../../styles/ContainerStyles';
import colors from '../../assets/color/colors';

export default function CustomDateTimePicker(props: { visible: any, onClose: any, onDateSelect: any }) {
    const { visible, onClose, onDateSelect } = props;

    // Function to format the date to '21 Oct 2024'
    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: "numeric"
        });
    };
    const { containerStyles } = ContainerStyles();
    return (
        <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
            <View style={containerStyles.calendarModalContainer}>
                <View style={containerStyles.CalendarContainer}>
                    <DateTimePicker
                        calendarTextStyle={{ color: colors.PrimaryTextColor }}
                        headerTextStyle={{ color: colors.PrimaryTextColor }}
                        todayTextStyle={{ color: colors.AppPrimaryColor }}
                        weekDaysTextStyle={{ color: colors.PrimaryTextColor }}
                        mode="single"
                        initialView="day"
                        timePicker={true}
                        onChange={(params: any) => {
                            if (params?.date) {
                                const selectedDate = new Date(params.date); // Convert the string to a Date object
                                const formattedDate = formatDate(selectedDate);
                                onDateSelect(formattedDate, params.date);  // Return formatted date
                            }
                        }}
                    />
                </View>
            </View>
        </Modal>
    );
}

