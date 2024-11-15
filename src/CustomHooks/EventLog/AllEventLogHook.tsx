// src/hooks/useEventLogs.ts
import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { GetAllSpotEventLogs } from '../../reducer/eventLogs/EventLogsAction';
import { RootState, store } from '../../reducer/Store';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import colors from '../../assets/color/colors';
import fontSizes from '../../assets/fonts/FontSize';
import { useNavigation } from '@react-navigation/native';
import CustomIcon from '../../reuseableComponent/customIcons/CustomIcon';
import { GetSpotName } from '../../reducer/spotData/spotDataAction';
import { direction, EventNames } from '../../assets/constants/Constant';

const AllEventLogHooks = () => {
    const navigation = useNavigation();
    const loader = useSelector((state: RootState) => state.eventLogs.allEventLogLoader);
    const baseUrl = useSelector((state: RootState) => state.authentication.baseUrl);
    const spotName = useSelector((state: RootState) => state.spotData.spotName);
    const eventLogsAll = useSelector(
        (state: RootState) => state.eventLogs.eventLogsAll,
    );
    const [isFocused, setIsFocused] = useState(false);
    const [selectedOption, setSelectedOption] = useState<any>({
        name: '',
        code: '',
    });
    const [selectedSpot, setSelectedSpot] = useState<any>({
        name: '',
        id: '',
    });
    const [selectedDirection, setSelectedDirection] = useState<any>({
        name: '',
        id: '',
    });
    const [isCalendarVisible, setCalendarVisible] = useState(false);
    const [isFilterWork, SetIsFilterWork] = useState(false);
    const [selectedToDate, setSelectedToDate] = useState('');
    const [ToDateValue, setToDateValue] = useState('');
    const [selectedFromDate, setSelectedFromDate] = useState('');
    const [DateFromValue, setDateFromValue] = useState('');
    const [selectedName, setSelectedName] = useState<any>(
        { name: '', id: '' },
    );
    const openCalendarModal = () => setCalendarVisible(true);
    const closeCalendarModal = () => setCalendarVisible(false);
    const [GenericmodalVisible, setGenericmodalVisible] = useState(false);
    const handleCloseModal = () => {
        setIsFocused(false);
    };


    const [modalVisible, setModalVisible] = useState(false);
    const [filterBadgeVisible, setFilterBadgeVisible] = useState(false);

    const [requestData, setRequestData] = useState({});

    const handleOpenModal = () => {
        setIsFocused(true);
    };
    const handleOptionSelected = (option: any) => {
        setSelectedOption(option);
    };
    useEffect(() => {
        console.log("useEffect first")
        store.dispatch(GetAllSpotEventLogs({
            baseUrl,
        }));
        store.dispatch(GetSpotName({ baseUrl: baseUrl }))
    }, [baseUrl]);

    useEffect(() => {
        console.log("useEffect secound")

        setFilteredLogs(eventLogsAll);
    }, [eventLogsAll])
    const [filteredLogs, setFilteredLogs] = useState([]);
    const [currentField, setCurrentField] = useState<string | null>(null);
    // useLayoutEffect(() => {
    //     console.log("third")

    //     navigation.setOptions({
    //         headerTitle: () => (
    //             <Text style={{ color: colors.darkblack, fontSize: fontSizes.heading }}>
    //                 {"Event Logs"}
    //             </Text>
    //         ),
    //         headerRight: () => (
    //             <TouchableOpacity style={{ padding: 5, marginEnd: 20 }}>
    //                 <CustomIcon iconPath={require("../../assets/icons/filterSmall.png")} onPress={() => setIsFocused(true)} />
    //             </TouchableOpacity>
    //         ),
    //     });
    // }, [navigation]);

    const handleFilterClick = useMemo(() => {
        return () => {
            const fromDate = DateFromValue ? new Date(DateFromValue) : null;
            const toDate = ToDateValue ? new Date(ToDateValue) : null;

            const filteredData = eventLogsAll.filter((log: any) => {
                const logDate = new Date(log.createdAt);
                const matchesSpot = selectedSpot?.name ? log.spot === selectedSpot.name : true;
                const matchesName = selectedName?.id ? log.name === selectedName.id : true;
                const matchesDirection = selectedDirection?.name ? log.direction === selectedDirection.name : true;
                const matchesFromDate = fromDate ? logDate >= fromDate : true;
                const matchesToDate = toDate ? logDate <= toDate : true;

                return matchesSpot && matchesName && matchesDirection && matchesFromDate && matchesToDate;
            });

            setFilteredLogs(filteredData);
            setIsFocused(false);
            SetIsFilterWork(true)
        };
    }, [eventLogsAll, selectedSpot, selectedName, selectedDirection, DateFromValue, ToDateValue]);

    const handleFilter = useMemo(() => {
        return () => {
            const fromDate = DateFromValue ? new Date(DateFromValue) : null;
            const toDate = ToDateValue ? new Date(ToDateValue) : null;

            const filteredData = eventLogsAll.filter((log: any) => {
                const logDate = new Date(log.createdAt);
                const matchesSpot = selectedSpot?.name ? log.spot === selectedSpot.name : true;
                const matchesName = selectedName?.id ? log.name === selectedName.id : true;
                const matchesDirection = selectedDirection?.name ? log.direction === selectedDirection.name : true;
                const matchesFromDate = fromDate ? logDate >= fromDate : true;
                const matchesToDate = toDate ? logDate <= toDate : true;

                return matchesSpot && matchesName && matchesDirection && matchesFromDate && matchesToDate;
            });

            setFilteredLogs(filteredData);

        };
    }, [eventLogsAll, selectedSpot, selectedName, selectedDirection, DateFromValue, ToDateValue]);

    useEffect(() => {
        if (isFilterWork) {
            handleFilter()
        }
    }, [handleFilter])

    useEffect(() => {
        if (
            selectedSpot.name || 
            selectedName.name || 
            selectedDirection.name || 
            DateFromValue || 
            ToDateValue
        ) {
            setFilterBadgeVisible(true);
        } else {
            setFilterBadgeVisible(false);
        }
    }, [selectedSpot, selectedName, selectedDirection, DateFromValue, ToDateValue]);
    

    const handleReset = () => {
        setSelectedDirection("")
        setSelectedName("")
        setSelectedFromDate("")
        setDateFromValue("")
        setSelectedToDate("")
        setToDateValue("")
        setSelectedSpot("")
        setFilteredLogs(eventLogsAll)
        setIsFocused(false)
    }


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

    const handleOptionSelect = (selected: any) => {
        if (currentField === 'DIRECTION') {
            // Handle direction selection
            setSelectedDirection(selected);
        } else if (currentField === 'SPOT_NAME') {
            // Handle spot selection
            setSelectedSpot(selected);
        } else if (currentField === 'NAME') {
            // Handle name selection
            setSelectedName(selected);
        }

        // Reset modal visibility and field
        setGenericmodalVisible(false);
        setCurrentField(null);
    };
    // Get unique names

    const getOptions = () => {
        if (currentField === 'DIRECTION') {
            return direction;
        } else if (currentField === 'SPOT_NAME') {
            return spotName;
        } else if (currentField === 'NAME') {
            return EventNames;
        }
        return [];
    };

    return { setIsFocused,navigation,filterBadgeVisible, loader, setToDateValue, setDateFromValue, handleReset, handleFilterClick, filteredLogs, isCalendarVisible, selectedFromDate, selectedToDate, setCurrentField, setGenericmodalVisible, closeCalendarModal, GenericmodalVisible, eventLogsAll, spotName, setModalVisible, setRequestData, isFocused, handleCloseModal, handleOpenModal, handleOptionSelected, selectedOption, handleOptionSelect, getOptions, handleDateSelect, openCalendarModal, selectedName, selectedDirection, selectedSpot, setSelectedDirection, setSelectedFromDate, setSelectedName, setSelectedToDate, setSelectedSpot };
};

export default AllEventLogHooks;
