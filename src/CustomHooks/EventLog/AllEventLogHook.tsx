// src/hooks/useEventLogs.ts
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { GetAllSpotEventLogs } from '../../reducer/eventLogs/EventLogsAction';
import { RootState, store } from '../../reducer/Store';
import React from 'react';
import { Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GetSpotName } from '../../reducer/spotData/spotDataAction';
import { direction, EventNames } from '../../assets/constants/Constant';

const AllEventLogHooks = () => {
  const navigation = useNavigation();
  const [filterCount, setFilterCount] = useState(0);
  const loader = useSelector(
    (state: RootState) => state.eventLogs.allEventLogLoader,
  );
  const baseUrl = useSelector(
    (state: RootState) => state.authentication.baseUrl,
  );
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
  const [selectedName, setSelectedName] = useState<any>({ name: '', id: '' });
  const openCalendarModal = () => setCalendarVisible(true);
  const closeCalendarModal = () => setCalendarVisible(false);
  const [GenericmodalVisible, setGenericmodalVisible] = useState(false);
  const handleCloseModal = () => {
    setIsFocused(false);
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [filterBadgeVisible, setFilterBadgeVisible] = useState(false);

  const [requestData, setRequestData] = useState({});
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const handleSearchPress = () => {
    setIsSearchVisible(!isSearchVisible); // Toggle search bar visibility
  };
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleOpenModal = () => {
    setIsFocused(true);
  };
  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 100);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 70],
    outputRange: [0, -70],
  });
  const paddingTopAnimated = scrollY.interpolate({
    inputRange: [0, 110],
    outputRange: [70, 0],
    extrapolate: 'clamp',
  });
  const handleOptionSelected = (option: any) => {
    setSelectedOption(option);
  };
  useEffect(() => {
    store.dispatch(
      GetAllSpotEventLogs({
        baseUrl,
      }),
    );
    store.dispatch(GetSpotName({ baseUrl: baseUrl }));
  }, [baseUrl]);

  useEffect(() => {

    setFilteredLogs(eventLogsAll);
  }, [eventLogsAll]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [currentField, setCurrentField] = useState<string | null>(null);

  const handleFilterClick = useMemo(() => {
    console.log("hello from filter click ")
    return () => {
      const fromDate = DateFromValue ? new Date(DateFromValue) : null;
      const toDate = ToDateValue ? new Date(ToDateValue) : null;

      const filteredData = eventLogsAll.filter((log: any) => {
        const logDate = new Date(log.createdAt);
        const matchesSpot = selectedSpot?.name
          ? log.spot === selectedSpot.name
          : true;
        const matchesName = selectedName?.id
          ? log.name === selectedName.id
          : true;
        const matchesDirection = selectedDirection?.name
          ? log.direction === selectedDirection.name
          : true;
        const matchesFromDate = fromDate ? logDate >= fromDate : true;
        const matchesToDate = toDate ? logDate <= toDate : true;

        return (
          matchesSpot &&
          matchesName &&
          matchesDirection &&
          matchesFromDate &&
          matchesToDate
        );
      });
      console.log("filteredData ", filteredData)
      setFilteredLogs(filteredData);
      setIsFocused(false);
      SetIsFilterWork(true);
    };
  }, [
    eventLogsAll,
    selectedSpot,
    selectedName,
    selectedDirection,
    DateFromValue,
    ToDateValue,
  ]);

  const handleFilter = useMemo(() => {
    return () => {
      const filteredData = eventLogsAll.filter((log: any) => {
        const matchesSearch = searchQuery
          ? Object.values(log).some((value) =>
            String(value).toLowerCase().includes(searchQuery.toLowerCase())
          )
          : true;
        return (
          matchesSearch
        );
      });

      setFilteredLogs(filteredData);
    };
  }, [
    eventLogsAll,
    selectedSpot,
    selectedName,
    selectedDirection,
    DateFromValue,
    ToDateValue,
    searchQuery
  ]);

  useEffect(() => {

    handleFilter();

  }, [handleFilter, isFilterWork, searchQuery, setSearchQuery]);

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
  }, [
    selectedSpot,
    selectedName,
    selectedDirection,
    DateFromValue,
    ToDateValue,
  ]);

  const handleReset = () => {
    setSelectedDirection('');
    setSelectedName('');
    setSelectedFromDate('');
    setDateFromValue('');
    setSelectedToDate('');
    setToDateValue('');
    setSelectedSpot('');
    setFilteredLogs(eventLogsAll);
    setIsFocused(false);
    setFilterCount(0);
  };

  const handleDateSelect = (
    date: React.SetStateAction<string>,
    dateValue: any,
  ) => {
    if (selectedOption.id === 'FROM_DATE') {
      setDateFromValue(dateValue);
      setSelectedFromDate(date);
    }
    if (selectedOption.id === 'TO_DATE') {
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

  return {
    scrollY,
    translateY,
    paddingTopAnimated,
    setIsFocused,
    navigation,
    filterBadgeVisible,
    loader,
    setToDateValue,
    setDateFromValue,
    handleReset,
    handleFilterClick,
    filteredLogs,
    isCalendarVisible,
    selectedFromDate,
    selectedToDate,
    setCurrentField,
    setGenericmodalVisible,
    closeCalendarModal,
    GenericmodalVisible,
    eventLogsAll,
    spotName,
    setModalVisible,
    setRequestData,
    isFocused,
    handleCloseModal,
    handleOpenModal,
    handleOptionSelected,
    selectedOption,
    handleOptionSelect,
    getOptions,
    handleDateSelect,
    openCalendarModal,
    selectedName,
    selectedDirection,
    selectedSpot,
    setSelectedDirection,
    setSelectedFromDate,
    setSelectedName,
    setSelectedToDate,
    setSelectedSpot,
    setFilterCount,
    filterCount,
    setIsSearchVisible,
    isSearchVisible,
    setSearchQuery,
    searchQuery,
    handleSearchPress
  };
};

export default AllEventLogHooks;
