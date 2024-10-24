/* eslint-disable react-native/no-inline-styles */
import React, { useMemo, useState } from 'react';
import { View, Animated } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import colors from '../../assets/color/colors';
import CustomHeader from '../../reuseableComponent/header/CustomHeader';
import FloatingActionCustomButton from '../../reuseableComponent/customButton/FloatingActionCustomButton';
import { RfidListHook } from '../../CustomHooks/RFIDHooks/RFIDListHook';
import RfidListComponent from '../../component/RFIDComponent/RfidListComponent';
import CustomAlert from '../../reuseableComponent/PopUp/CustomPopUp';

const RfidReader = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const {
    ListData,
    Loader,
    loadRfidList,
    handleDelete,
    refreshing,
    buCode,
    alertVisible,
    setAlertVisible,
    confirmDelete,
    successAlertVisible,
    setSuccessAlertVisible,
    errorAlertVisible,
    setErrorAlertVisible,
    errorMessage,
  } = RfidListHook();

  const [scrollY] = useState(new Animated.Value(0));
  const [buttonVisible, setButtonVisible] = useState(true);

  const headerTranslate = useMemo(
    () => scrollY.interpolate({
      inputRange: [0, 500],
      outputRange: [0, -500],
      extrapolate: 'clamp',
    }),
    [scrollY],
  );

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: true,
      listener: event => {
        const currentScrollY = event.nativeEvent.contentOffset.y;
        setButtonVisible(currentScrollY <= 50);
      },
    },
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      {/* Header */}
      <Animated.View
        style={{
          transform: [{ translateY: headerTranslate }],
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1,
        }}>
        <CustomHeader
          title="RFID Readers"
          buCode={buCode}
          userLogo={'account-circle'}
        />
      </Animated.View>

      {/* List Content */}
      <View style={{ flex: 1, paddingTop: buttonVisible ? 60 : 0 }}>
        <RfidListComponent
          ListData={ListData}
          Loader={Loader}
          scrollY={scrollY}
          handleDelete={handleDelete}
          loadRfidList={loadRfidList}
          refreshing={refreshing}
          buttonVisible={buttonVisible}
          handleScroll={handleScroll}
        />

        {/* Confirmation Alert for Deletion */}
        {alertVisible && (
          <CustomAlert
            isVisible={alertVisible}
            onClose={() => setAlertVisible(false)}
            onOkPress={confirmDelete}
            title="Delete RFID"
            message="Are you sure you want to delete this RFID?"
            showCancel={true} // Show cancel button for confirmation alerts
          />
        )}

        {/* Success Alert */}
        {successAlertVisible && (
          <CustomAlert
            isVisible={successAlertVisible}
            onClose={() => setSuccessAlertVisible(false)}
            onOkPress={() => setSuccessAlertVisible(false)} // Just dismiss
            title="Success"
            message="RFID deleted successfully!"
            showCancel={false} // No cancel button for success alerts
            type="success" // Set alert type to success
          />
        )}

        {/* Error Alert */}
        {errorAlertVisible && (
          <CustomAlert
            isVisible={errorAlertVisible}
            onClose={() => setErrorAlertVisible(false)}
            onOkPress={() => setErrorAlertVisible(false)} // Just dismiss
            title="Error"
            message={errorMessage}
            showCancel={false} // No cancel button for error alerts
            type="error" // Set alert type to error
          />
        )}

        {buttonVisible && (
          <Animated.View
            style={{
              position: 'absolute',
              bottom: 20,
              right: 20,
              opacity: buttonVisible ? 1 : 0,
            }}>
            <FloatingActionCustomButton
              onPress={() => navigation.navigate('RFID ADD')}
            />
          </Animated.View>
        )}
      </View>
    </View>
  );
};

export default React.memo(RfidReader);
