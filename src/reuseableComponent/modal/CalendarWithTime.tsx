import DateTimePicker from 'react-native-ui-datepicker';
import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';

export default function CustomDateTimePicker(props: { visible: any, onClose: any, onDateSelect: any }) {
    const { visible, onClose, onDateSelect } = props;

    // Function to format the date to '21 Oct 2024'
    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
            <View style={styles.modalContainer}>
                <View style={styles.container}>
                    <DateTimePicker
                        mode="single"
                        initialView="day"
                        onChange={(params: any) => {
                            if (params?.date) {
                                const selectedDate = new Date(params.date); // Convert the string to a Date object
                                const formattedDate = formatDate(selectedDate);
                                onDateSelect(formattedDate ,params.date );  // Return formatted date
                            }
                        }}
                    />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#F5FCFF',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "gray",
    },
    modalContainer: {
        flex: 1,
        padding: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',  // Darker transparent background
    },
});
