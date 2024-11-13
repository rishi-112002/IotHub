import { View } from 'react-native';
import EventLogsList from '../../component/EventLog/EventLogList';
import React, { useState } from 'react';
import AllEventLogHooks from '../../CustomHooks/EventLog/AllEventLogHook';
import SequentialBouncingLoader from '../../reuseableComponent/loader/BallBouncingLoader';
import colors from '../../assets/color/colors';
import { direction, EventNames, filters } from '../../assets/constants/Constant';
import FilterModal from '../../reuseableComponent/modal/FilterModal';
import CustomDateTimePicker from '../../reuseableComponent/modal/CalendarWithTime';
import GenericModal from '../../reuseableComponent/modal/GenralModal';

function AllEventLogsScreen() {

    const { eventLogsAll, setModalVisible, setRequestData, loader, isFocused, handleCloseModal, handleOpenModal, handleOptionSelected, selectedOption } = AllEventLogHooks();

    if (loader) {
        <SequentialBouncingLoader />
    }
    const [isCalendarVisible, setCalendarVisible] = useState(false);
    const [selectedToDate, setSelectedToDate] = useState('');
    const [ToDateValue, setToDateValue] = useState('');
    const [selectedFromDate, setSelectedFromDate] = useState('');
    const [DateFromValue, setDateFromValue] = useState('');

    const openCalendarModal = () => setCalendarVisible(true);
    const closeCalendarModal = () => setCalendarVisible(false);
    const [GenericmodalVisible, setGenericmodalVisible] = useState(false);
    const handleDateSelect = (
        date: React.SetStateAction<string>,
        dateValue: any,
    ) => {
        if (selectedOption.id === "FROM_DATE") {
            setDateFromValue(dateValue);
            setSelectedFromDate(date);
        }
        if (selectedOption.id === "TO_DATE") {
            setToDateValue(dateValue);
            setSelectedToDate(date);
        }

        closeCalendarModal(); // Close the modal after selecting the date
    };
    const [currentField, setCurrentField] = useState<string | null>(null);

    const handleOptionSelect = (selected: any) => {
        if (currentField === 'DIRECTION') {
            // Handle direction selection
            setRequestData((prevData) => ({ ...prevData, direction: selected }));
        } else if (currentField === 'SPOT_NAME') {
            // Handle spot selection
            setRequestData((prevData) => ({ ...prevData, spot: selected }));
        } else if (currentField === 'NAME') {
            // Handle name selection
            setRequestData((prevData) => ({ ...prevData, name: selected }));
        }

        // Reset modal visibility and field
        setGenericmodalVisible(false);
        setCurrentField(null);
    };
    const uniqueSpots = [...new Set(eventLogsAll.map((item:any) => item.spot))];

    // Get unique names
    const uniqueNames = [...new Set(eventLogsAll.map((item:any) => item.name))];

    const getOptions = () => {
        if (currentField === 'DIRECTION') {
            return direction;
        } else if (currentField === 'SPOT_NAME') {
            return uniqueSpots;
        } else if (currentField === 'NAME') {
            return EventNames;
        }
        return [];
    };
    return (
        <View style={{ flex: 1 }}>
            {loader ?
                <View style={{ flex: 1, backgroundColor: colors.white }}>
                    <SequentialBouncingLoader />
                </View>
                :
                <View style={{ flex: 1 }}>
                    <EventLogsList
                        data={eventLogsAll}
                        setModal={setModalVisible}
                        setRequestData={setRequestData}
                    />
                    {isFocused &&
                        <FilterModal
                            filters={filters}
                            isVisible={isFocused}
                            handleCloseModal={handleCloseModal}
                            onOptionSelected={handleOptionSelected}
                            openCalendarModal={openCalendarModal}
                            DateFromValue={selectedFromDate}
                            ToDateValue={selectedToDate}
                            setCurrentFiled={setCurrentField}
                            setGenericmodalVisible={setGenericmodalVisible} />
                    }
                    <CustomDateTimePicker
                        visible={isCalendarVisible}
                        onClose={closeCalendarModal}
                        onDateSelect={handleDateSelect}
                    />
                    {GenericmodalVisible && <GenericModal
                        options={getOptions()}
                        isVisible={GenericmodalVisible}
                        handleCloseModal={() => setGenericmodalVisible(false)}
                        onOptionSelected={handleOptionSelect}
                        nameKey="name"
                        valueKey="id"
                    />}
                </View>
            }

        </View>
    );
}

export default AllEventLogsScreen;
