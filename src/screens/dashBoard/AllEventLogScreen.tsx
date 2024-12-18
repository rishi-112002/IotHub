/* eslint-disable react-native/no-inline-styles */
import { Animated, StyleSheet, View } from 'react-native';
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
import SearchBar from '../../reuseableComponent/Filter/SearchFilter';
import { ImagePath, Strings } from '../../assets/constants/Lable';

function AllEventLogsScreen() {


    const { setSelectedSpot, handleReset, setModalVisible, setRequestData, loader, isFocused, handleCloseModal, handleOptionSelected, getOptions, handleDateSelect, handleOptionSelect, openCalendarModal, selectedDirection, selectedName, selectedSpot, isCalendarVisible, selectedFromDate, selectedToDate, setCurrentField, setGenericmodalVisible, closeCalendarModal, GenericmodalVisible, filteredLogs, handleFilterClick, setSelectedDirection, setSelectedFromDate, setSelectedName, setSelectedToDate, setToDateValue, setDateFromValue, filterBadgeVisible, navigation, setIsFocused, translateY, paddingTopAnimated, scrollY, filterCount, setFilterCount, isSearchVisible, searchQuery, setSearchQuery, handleSearchPress }
        = AllEventLogHooks();

    if (loader) {
        <SequentialBouncingLoader />;
    }


    return (
        <View style={{ flex: 1 }}>
            {loader ?
                <View style={{ flex: 1, backgroundColor: colors.white }}>
                    <SequentialBouncingLoader />
                </View>
                :
                <View style={{ flex: 1 }}>
                    <CustomSubHeader
                        spotName={Strings.EVENT_LOGS}
                        onPress={() => setIsFocused(true)}
                        filterIconPath={ImagePath.FILTER_ICON}
                        searchIconPath={ImagePath.SEARCH_ICON}
                        onBackPress={() => navigation.goBack()}
                        translateY={translateY}
                        filterCount={filterCount}
                        onSearchPress={handleSearchPress} />
                    <Animated.View style={[styles.contentContainer, { paddingTop: paddingTopAnimated }]}>


                        {isSearchVisible && (
                            <Animated.View
                                style={[
                                    { transform: [{ translateY: translateY }] },
                                ]}>
                                <SearchBar
                                    searchQuery={searchQuery}
                                    setSearchQuery={setSearchQuery}
                                    clearSearch={() => setSearchQuery("")}
                                    placeholder={undefined} />
                            </Animated.View>
                        )}
                        {
                            filterBadgeVisible &&
                            <View style={{ flex: 0.05 }}>
                                <ScrollableBadges badges={[

                                    { key: Strings.SPOT, value: selectedSpot.name },
                                    { key: Strings.DIRECTION_S, value: selectedDirection.name },
                                    { key: Strings.NAME_s, value: selectedName.name },
                                    { key: Strings.FROM_DATE_s, value: selectedFromDate },
                                    { key: Strings.TO_DATE_s, value: selectedToDate },
                                ]}
                                    setFilterCount={setFilterCount}
                                    filterCount={filterCount}
                                    setSelectedSpot={setSelectedSpot}
                                    setSelectedDirection={setSelectedDirection}
                                    setSelectedFromDate={setSelectedFromDate}
                                    setSelectedName={setSelectedName}
                                    setSelectedToDate={setSelectedToDate}
                                    setToDateValue={setToDateValue}
                                    setDateFromValue={setDateFromValue}
                                    setConnectivity={undefined} />
                            </View>

                        }
                        <View style={{ flex: 1 }}>
                            <EventLogsList
                                data={filteredLogs}
                                setModal={setModalVisible}
                                setRequestData={setRequestData}
                                onScroll={(e: { nativeEvent: { contentOffset: { y: number; }; }; }) => {
                                    scrollY.setValue(e.nativeEvent.contentOffset.y);
                                }} scrollEnabled={true} />
                        </View>
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
                            handleReset={handleReset}
                            setFilterCount={setFilterCount}
                            setSelectedSpot={setSelectedSpot}
                            setSelectedDirection={setSelectedDirection}
                            setSelectedFromDate={setSelectedFromDate}
                            setSelectedName={setSelectedName}
                            setSelectedToDate={setSelectedToDate}
                            setToDateValue={setToDateValue}
                            setDateFromValue={setDateFromValue} />
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
                        nameKey={Strings.NAME_S}
                        valueKey={Strings.VALUE}
                    />}
                </View>
            }

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    loader: {
        flex: 1,
    },
    contentContainer: {
        position: 'relative',
        flex: 1,
        backgroundColor: colors.white,
    },
    modalContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default AllEventLogsScreen;
