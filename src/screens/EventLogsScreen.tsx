import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, Animated, Text, StyleSheet } from "react-native"; // Use Animated for slide up effect
import { RootState, store } from "../reducer/Store";
import { GetSpotEventLogs } from "../reducer/eventLogs/EventLogsAction";
import { NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import EventLogsList from "../component/EventLogsListComponent";
import EventlogsModals from "../reuseableComponent/modal/EventLogsModal";
import SequentialBouncingLoader from "../reuseableComponent/loader/BallBouncingLoader";
import colors from "../assets/color/colors";
import fontSizes from "../assets/fonts/FontSize";
import { AppNavigationParams } from "../navigation/NavigationStackList";

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
    const navigation = useNavigation<NavigationProp<AppNavigationParams>>();
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

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <View>
                    <Text style={styles.headerTitle}>{spotName}</Text>
                </View>
            ),
        });
    }, [navigation]);

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
            <View style={{ flex: 1 }}>
                {loader ? (
                    <SequentialBouncingLoader />
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
const styles = StyleSheet.create({
    headerTitle: {
        color: colors.darkblack,
        fontSize: fontSizes.heading,
    },
})

export default EventLogsScreen;
