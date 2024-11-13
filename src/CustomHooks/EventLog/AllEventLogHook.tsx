// src/hooks/useEventLogs.ts
import { useEffect, useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { GetAllSpotEventLogs } from '../../reducer/eventLogs/EventLogsAction';
import { RootState, store } from '../../reducer/Store';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import colors from '../../assets/color/colors';
import fontSizes from '../../assets/fonts/FontSize';
import { useNavigation } from '@react-navigation/native';
import CustomIcon from '../../reuseableComponent/customIcons/CustomIcon';

const AllEventLogHooks = () => {
    const navigation = useNavigation();
    const loader = useSelector((state: RootState) => state.eventLogs.allEventLogLoader);
    const baseUrl = useSelector((state: RootState) => state.authentication.baseUrl);
    const eventLogsAll = useSelector(
        (state: RootState) => state.eventLogs.eventLogsAll,
    );
    const [isFocused, setIsFocused] = useState(false);
    const [selectedOption, setSelectedOption] = useState<any>({
        name: '',
        code: '',
    });
    const handleCloseModal = () => {
        setIsFocused(false);
    };

    const handleOpenModal = () => {
        setIsFocused(true);
    };
    const handleOptionSelected = (option: any) => {
        setSelectedOption(option);
    };

    const [modalVisible, setModalVisible] = useState(false);
    const [requestData, setRequestData] = useState({});

    useEffect(() => {
        store.dispatch(GetAllSpotEventLogs({
            baseUrl,
        }));
    }, [baseUrl]);
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <Text style={{ color: colors.darkblack, fontSize: fontSizes.heading }}>
                    {"Event Logs"}
                </Text>
            ),
            headerRight: () => (
                <TouchableOpacity style={{ padding: 5, marginEnd: 20 }}>
                    <CustomIcon iconPath={require("../../assets/icons/filterSmall.png")} onPress={handleOpenModal} />
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    return { loader, eventLogsAll, setModalVisible, setRequestData, isFocused, handleCloseModal, handleOpenModal, handleOptionSelected, selectedOption };
};

export default AllEventLogHooks;
