import { useSelector } from 'react-redux';
import { RootState, store } from '../../reducer/Store';
import { Animated, Text, View } from 'react-native';
import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  GetAllSpotEventLogs,
  GetSpotEventLogsForToday,
} from '../../reducer/eventLogs/EventLogsAction';
import { GetSpotData } from '../../reducer/spotData/spotDataAction';
import { getRfidListAction } from '../../reducer/RFIDList/RFIDListAction';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { DataByConnectivityContext } from '../../contextApi/DataByConnectivity';
import { AppNavigationParams } from '../../navigation/NavigationStackList';

function DashBoardHook() {
  const [isLoading, setIsLoading] = useState(true);

  // Show loader for 3 seconds

  const scrollY = useRef(new Animated.Value(0)).current;
  const offSetAnimation = useRef(new Animated.Value(0)).current;

  const CONTAINERHEiGHT = 60;
  let _clampedScrollValue = 0;
  let _offsetValue = 0;
  let _scrollValue = 0;

  const clampedScroll = Animated.diffClamp(
    Animated.add(
      scrollY.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolateLeft: "clamp",
      }),
      offSetAnimation,
    ),
    0,
    CONTAINERHEiGHT
  )
  let scrollEndTimer: any = null;
  const onMomnetumScrollBegin = () => {
    clearTimeout(scrollEndTimer)

  }
  const onMomnetumScrollEnd = () => {
    const toValue = _scrollValue > CONTAINERHEiGHT && _clampedScrollValue > CONTAINERHEiGHT / 2 ?
      _offsetValue + CONTAINERHEiGHT : _offsetValue - CONTAINERHEiGHT;
    Animated.timing(offSetAnimation, {
      toValue, duration: 500, useNativeDriver: true
    }).start();
  }
  const onScrollEndDrag = () => {
    scrollEndTimer = setTimeout(onMomnetumScrollEnd, 250)
  }
  useEffect(() => {
    scrollY.addListener(({ value }) => {
      const diff = value - _scrollValue;
      _scrollValue = value;
      _clampedScrollValue = Math.min(
        Math.max(_clampedScrollValue * diff, 0),
        CONTAINERHEiGHT,
      )
    });
    offSetAnimation.addListener(({ value }) => {
      _offsetValue = value
    })
  }, [])
  const headerTranslate = clampedScroll.interpolate({
    inputRange: [0, CONTAINERHEiGHT],
    outputRange: [0, -CONTAINERHEiGHT],
    extrapolate: "clamp"
  })


  const rfidList = useSelector(
    (state: RootState) => state.rfidList.RfidListData,
  );
  const rfidCount = useSelector(
    (state: RootState) => state.rfidList.RfidListData.length,
  );
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false } // or true if you don't need manual interpolation
  );
  const navigation = useNavigation<NavigationProp<AppNavigationParams>>();
  const buCode = useSelector((State: RootState) => State.authentication.buCode);
  const baseUrl = useSelector(
    (State: RootState) => State.authentication.baseUrl,
  );
  const spotListData = useSelector(
    (state: RootState) => state.spotData.spotData,
  );
  const eventLogsByTime = useSelector(
    (state: RootState) => state.eventLogs.eventLogsByTime,
  );
  const eventLogsAll = useSelector(
    (state: RootState) => state.eventLogs.eventLogsAll,
  );
  const loading = useSelector((state: RootState) => state.eventLogs.loader);
  const connectedCount = spotListData.filter(
    (spot: any) => spot.active === true,
  ).length;
  const disconnectedCount = spotListData.filter(
    (spot: any) => spot.active === false,
  ).length;
  const WeighBridgeDisConnected = spotListData.filter(
    (spot: any) => spot.active === false && spot.type !== 'GENERIC_SPOT',
  ).length;
  const WeighBridgeConnected = spotListData.filter(
    (spot: any) => spot.active === true && spot.type !== 'GENERIC_SPOT',
  ).length;

  const genericDisConnected = spotListData.filter(
    (spot: any) => spot.active === false && spot.type === 'GENERIC_SPOT',
  ).length;
  const genericConnected = spotListData.filter(
    (spot: any) => spot.active === true && spot.type === 'GENERIC_SPOT',
  ).length;
  const rfidUnUsedCount = rfidList.filter(
    (item: any) => item.type === null && item.direction === null,
  ).length;
  const rfidUsedCount = rfidList.filter(
    (item: any) => item.type !== null && item.direction !== null,
  ).length;
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to start of the day (midnight)
  const formattedDate = today.toISOString();
  const [topRecentLogs, setTopRecentLogs] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      store.dispatch(
        GetSpotEventLogsForToday({ baseUrl: baseUrl, time: formattedDate }),
      );
    }, 4000); // 5000 milliseconds = 5 seconds

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [baseUrl, formattedDate]);

  useEffect(() => {
    store.dispatch(GetSpotData({ baseUrl: baseUrl }));
    store.dispatch(GetAllSpotEventLogs({ baseUrl: baseUrl }));
    store.dispatch(getRfidListAction({ baseUrl }));
  }, [baseUrl]);

  useEffect(() => {
    if (eventLogsByTime) {

      const sortedLogs = [...eventLogsByTime].sort(
        (a: any, b: any) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );

      // Get the top N most recent logs, e.g., top 10
      const topRecentLogs1: any = sortedLogs.slice(0, 10);
      setTopRecentLogs(topRecentLogs1);
    }
    else {
      setTopRecentLogs([])
    }


  }, [eventLogsByTime]);

  const [modalVisible, setModalVisible] = useState(false);
  const [requestData, setRequestData] = useState({});
  const {
    setSpotTypeConnectivity,
    setWeighBridgeTypeConnectivity,
    setGenericTypeConnectivity,
    setRfidType,
  } = useContext(DataByConnectivityContext);
  const handleAllClick = () => {
    setSpotTypeConnectivity('all');
    navigation.navigate('LiveSpots');
  };

  const handleConnectedClick = () => {
    setSpotTypeConnectivity('connected');
    navigation.navigate('LiveSpots');
  };
  const handleNotConnectedClick = () => {
    setSpotTypeConnectivity('not-connected');
    navigation.navigate('LiveSpots');
  };

  const handleGenericConnectedClick = () => {
    setGenericTypeConnectivity('connected');
    navigation.navigate('Drawer', { screen: 'GenericSpotNavigation' });
  };
  const handleGenericNotConnectedClick = () => {
    setGenericTypeConnectivity('not-connected');
    navigation.navigate('Drawer', { screen: 'GenericSpotNavigation' });
  };
  const handleWeighBridgeConnectedClick = () => {
    setWeighBridgeTypeConnectivity('connected');
    navigation.navigate('Drawer', { screen: 'WeighBridgeNavigation' });
  };
  const handleWeighBridgeNotConnectedClick = () => {
    setWeighBridgeTypeConnectivity('not-connected');
    navigation.navigate('Drawer', { screen: 'WeighBridgeNavigation' });
  };

  const handleRfidUsedClick = () => {
    setRfidType('used');
    navigation.navigate('RfidScreenNavigation');
  };
  const handleRfidUnUsedClick = () => {
    setRfidType('un-used');
    navigation.navigate('RfidScreenNavigation');
  };
  const handleRfidAllClick = () => {
    setRfidType('all');
    navigation.navigate('RfidScreenNavigation');
  };
  useEffect(() => {
    console.log('Dashboard');
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return {
    isLoading,
    headerTranslate,
    buCode,
    baseUrl,
    spotListData,
    eventLogsByTime,
    connectedCount,
    disconnectedCount,
    loading,
    eventLogsAll,
    WeighBridgeDisConnected,
    WeighBridgeConnected,
    genericDisConnected,
    genericConnected,
    rfidCount,
    rfidList,
    handleScroll,
    rfidUnUsedCount,
    rfidUsedCount,
    navigation,
    topRecentLogs,
    setModalVisible,
    setRequestData,
    handleRfidUsedClick,
    handleAllClick,
    handleConnectedClick,
    handleGenericConnectedClick,
    handleGenericNotConnectedClick,
    handleNotConnectedClick,
    handleRfidAllClick,
    handleRfidUnUsedClick,
    handleWeighBridgeConnectedClick,
    handleWeighBridgeNotConnectedClick,
    onMomnetumScrollBegin,
    onMomnetumScrollEnd,
    onScrollEndDrag
  };
}
export default DashBoardHook;
