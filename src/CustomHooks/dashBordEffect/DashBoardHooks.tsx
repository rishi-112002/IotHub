import { useSelector } from "react-redux";
import { RootState, store } from "../../reducer/Store";
import { Animated } from "react-native";
import { useEffect, useState } from "react";
import { GetSpotEventLogsForToday } from "../../reducer/eventLogs/EventLogsAction";
import { GetSpotData } from "../../reducer/spotData/spotDataAction";

function DashBoardHook() {

    const scrollY = new Animated.Value(0);
    const diffClamp = Animated.diffClamp(scrollY, 0, 60);
    const translateY = diffClamp.interpolate({
        inputRange: [0, 60],
        outputRange: [0, -60],
    });
    const buCode = useSelector((State: RootState) => State.authentication.buCode);
    const baseUrl = useSelector((State: RootState) => State.authentication.baseUrl);
    const spotListData = useSelector((state: RootState) => state.spotData.spotData);
    const eventLogsByTime = useSelector((state: RootState) => state.eventLogs.eventLogsByTime);
    const loading = useSelector((state: RootState) => state.eventLogs.loader);
    const connectedCount = spotListData.filter((spot: any) => spot.active === true).length;
    const disconnectedCount = spotListData.filter((spot: any) => spot.active === false).length;

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to start of the day (midnight)
    const formattedDate = today.toISOString();

    useEffect(() => {
        const interval = setInterval(() => {
            store.dispatch(GetSpotEventLogsForToday({ baseUrl: baseUrl, time: formattedDate }));
        }, 4000); // 5000 milliseconds = 5 seconds


        // Clear the interval when the component unmounts
        return () => clearInterval(interval);
    }, [baseUrl, formattedDate]);
    useEffect(() => {
        store.dispatch(GetSpotData({ baseUrl: baseUrl }));
    }, [baseUrl])

    const [modalVisible, setModalVisible] = useState(false);
    const [requestData, setRequestData] = useState({});

    return {
        translateY,
        setModalVisible,
        setRequestData,
        buCode,
        baseUrl, spotListData,
        eventLogsByTime,
        connectedCount,
        disconnectedCount,
        loading
    }
}
export default DashBoardHook;