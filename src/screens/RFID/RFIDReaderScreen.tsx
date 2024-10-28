/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Animated} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import colors from '../../assets/color/colors';
import CustomHeader from '../../reuseableComponent/header/CustomHeader';
import FloatingActionCustomButton from '../../reuseableComponent/customButton/FloatingActionCustomButton';
import {RfidListHook} from '../../CustomHooks/RFIDHooks/RFIDListHook';
import RfidListComponent from '../../component/RFIDComponent/RfidListComponent';
import CustomAlert from '../../reuseableComponent/PopUp/CustomPopUp';
import {AppNavigationParams} from '../../navigation/NavigationStackList';
import CustomToast from '../../reuseableComponent/modal/CustomToast';

const RfidReader = () => {
  const navigation = useNavigation<NavigationProp<AppNavigationParams>>();
  const {
    ListData,
    Loader,
    loadRfidList, // Call this after delete to reload the list
    handleDelete,
    refreshing,
    buCode,
    alertVisible,
    setAlertVisible,
    confirmDelete,
    successAlertVisible,
    errorAlertVisible,
    errorMessage,
  } = RfidListHook();

  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 60);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 20],
    outputRange: [0, -20],
  });
  const paddingTopAnimated = scrollY.interpolate({
    inputRange: [0, 10],
    outputRange: [50, 0],
    extrapolate: 'clamp',
  });
  const translateButtonY = diffClamp.interpolate({
    inputRange: [0, 50],
    outputRange: [0, 100],
  });

  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      {/* Header */}
      <CustomHeader
        title="RFID Readers"
        buCode={buCode}
        userLogo={'account-circle'}
        translateY={translateY}
      />

      {/* List Content */}
      <Animated.View style={{flex: 1, paddingTop: paddingTopAnimated}}>
        <RfidListComponent
          ListData={ListData}
          Loader={Loader}
          scrollY={scrollY}
          handleDelete={handleDelete}
          loadRfidList={loadRfidList}
          refreshing={refreshing}
          handleScroll={(e: {nativeEvent: {contentOffset: {y: number}}}) => {
            scrollY.setValue(e.nativeEvent.contentOffset.y);
          }}
          buttonVisible={false}
        />

        {/* Confirmation Alert for Deletion */}
        {alertVisible && (
          <CustomAlert
            isVisible={alertVisible}
            onClose={() => setAlertVisible(false)}
            onOkPress={confirmDelete}
            title="Delete RFID"
            message="Are you sure you want to delete this RFID?"
            showCancel={true}
            // Show cancel button for confirmation alerts
          />
        )}

        {/* Success Alert */}
        {successAlertVisible &&
          CustomToast({type: 'success', message: 'RFID deleted successfully!'})}

        {/* Error Alert */}
        {errorAlertVisible &&
          CustomToast({type: 'Error', message: {errorMessage}})}

        <FloatingActionCustomButton
          onPress={() => navigation.navigate('RfidAdd')}
          translateButtonY={translateButtonY}
        />
      </Animated.View>
    </View>
  );
};

export default React.memo(RfidReader);
