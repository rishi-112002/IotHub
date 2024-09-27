import React, { useEffect, useState } from "react";
import { View, Animated, ActivityIndicator } from "react-native"; // Use Animated for slide up effect
import { RootState, store } from "../reducer/Store";
import { GetSpotEventLogs } from "../reducer/eventLogs/EventLogsAction";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import CustomSubHeader from "../reuseableComponent/header/CustomSubHeader";
import EventLogsList from "../component/EventLogsListComponent";
import EventlogsModals from "../reuseableComponent/modal/EventLogsModal";

interface EventLogsScreenParams {
    baseUrls: string;
    spotName: string;
}

function EventLogsScreen() {
    const route = useRoute<RouteProp<{ params: EventLogsScreenParams }, 'params'>>();
    const { baseUrls, spotName } = route.params;
    const loader = useSelector((state: RootState) => state.eventLogs.loader);
    const eventLogs = useSelector((state: RootState) => state.eventLogs.eventLogs);
    const [modalVisible, setModalVisible] = useState(false);
    const [requestData, setRequestData] = useState({});
    const [slideAnim] = useState(new Animated.Value(0));
    useEffect(() => {
        if (modalVisible) {
            Animated.timing(slideAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [modalVisible]);

    useEffect(() => {
        store.dispatch(GetSpotEventLogs({ baseUrl: baseUrls, spotName: spotName }));
    }, []);

    const slideUpStyle = {
        transform: [
            {
                translateY: slideAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [500, 0],
                }),
            },
        ],
    };

    return (
        <View style={{ flex: 1 }}>
            <CustomSubHeader spotName={spotName} />

            <View style={{ flex: 1 }}>
                {loader ? (
                    <ActivityIndicator size={"large"}  style={{ flex: 1, justifyContent: "center" }}  />
                ) : (
                    <EventLogsList data={eventLogs} setModal={setModalVisible} setRequestData={setRequestData} />
                )}

                {modalVisible && (
                    <Animated.View style={[{ position: 'absolute', bottom: 0, width: '100%' }, slideUpStyle]}>
                        <EventlogsModals
                            modalVisible={modalVisible}
                            setModalVisible={setModalVisible}
                            request={requestData}
                        />
                    </Animated.View>
                )}
            </View>
        </View>
    );
}

export default EventLogsScreen;
