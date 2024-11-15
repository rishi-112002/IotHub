import { Animated, View } from 'react-native';
import EventLogsList from '../../component/EventLog/EventLogList';
import React, { } from 'react';
import AllEventLogHooks from '../../CustomHooks/EventLog/AllEventLogHook';
import SequentialBouncingLoader from '../../reuseableComponent/loader/BallBouncingLoader';
import colors from '../../assets/color/colors';
import { filters } from '../../assets/constants/Constant';
import FilterModal from '../../reuseableComponent/modal/FilterModal';
import CustomDateTimePicker from '../../reuseableComponent/modal/CalendarWithTime';
import GenericModal from '../../reuseableComponent/modal/GenralModal';
import ScrollableBadges from '../../reuseableComponent/modal/ScrollableBadges';
import CustomSubHeader from '../../reuseableComponent/header/CustomSubHeader';

function AllEventLogsScreen() {
    const scrollY = new Animated.Value(0);
    const diffClamp = Animated.diffClamp(scrollY, 0, 60);
    const translateY = diffClamp.interpolate({
        inputRange: [0, 70],
        outputRange: [0, -70],
    });
    const paddingTopAnimated = scrollY.interpolate({
        inputRange: [0, 110],
        outputRange: [60, 0],
        extrapolate: 'clamp',
    });

    const { setSelectedSpot, handleReset, setModalVisible, setRequestData, loader, isFocused, handleCloseModal, handleOptionSelected, getOptions, handleDateSelect, handleOptionSelect, openCalendarModal, selectedDirection, selectedName, selectedSpot, isCalendarVisible, selectedFromDate, selectedToDate, setCurrentField, setGenericmodalVisible, closeCalendarModal, GenericmodalVisible, filteredLogs, handleFilterClick, setSelectedDirection, setSelectedFromDate, setSelectedName, setSelectedToDate, setToDateValue, setDateFromValue, filterBadgeVisible, navigation, setIsFocused } = AllEventLogHooks();
    if (loader) {
        <SequentialBouncingLoader />
    }
    return (
        <View style={{ flex: 1 }}>
            {loader ?
                <View style={{ flex: 1, backgroundColor: colors.white }}>
                    <SequentialBouncingLoader />
                </View>
                :
                <View style={{ flex: 1 }}>
                    <CustomSubHeader spotName={"EventLogs"}
                        onPress={() => setIsFocused(true)}
                        iconPath={require("../../assets/icons/filterSmall.png")}
                        onBackPress={() => navigation.goBack()}
                        translateY={translateY}
                    />
                   
                    <Animated.View style={{ paddingTop: paddingTopAnimated  , flex:1}}>

                    {
                        filterBadgeVisible &&
                        <View style={{ flex: 0.06 }}>
                            <ScrollableBadges badges={[
                                { key: 'Spot', value: selectedSpot.name },
                                { key: 'Direction', value: selectedDirection.name },
                                { key: 'Name', value: selectedName.name },
                                { key: 'From Date', value: selectedFromDate },
                                { key: 'To Date', value: selectedToDate }
                            ]}

                                setSelectedSpot={setSelectedSpot}
                                setSelectedDirection={setSelectedDirection}
                                setSelectedFromDate={setSelectedFromDate}
                                setSelectedName={setSelectedName}
                                setSelectedToDate={setSelectedToDate}
                                setToDateValue={setToDateValue}
                                setDateFromValue={setDateFromValue} />
                        </View>

                    }
                        <EventLogsList
                            data={filteredLogs}
                            setModal={setModalVisible}
                            setRequestData={setRequestData}
                            onScroll={(e: { nativeEvent: { contentOffset: { y: number } } }) => {
                                scrollY.setValue(e.nativeEvent.contentOffset.y);
                            }}
                        />
                    </Animated.View>
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
                            setGenericmodalVisible={setGenericmodalVisible}
                            name={selectedName}
                            spot={selectedSpot}
                            direction={selectedDirection}
                            handleFilterClick={handleFilterClick}
                            handleReset={handleReset} />


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
