import { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { shallowEqual, useSelector } from 'react-redux';
import UserModal from '../modal/HeaderModalEditAndLogout';
import { RootState, store } from '../../reducer/Store';
import colors from '../../assets/color/colors';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { logoutUser } from '../../reducer/Login/LoginAction';
import React from 'react';
import { handleLogOut } from '../../reducer/Login/LoginReducer';
import CustomIcon from '../customIcons/CustomIcon';

function CustomHeader(props: {
  buCode: any;
  userLogo: any;
  title: any;
  translateY: any;
  onSearchPress: any;
  onFilterPress: any;
  searchIcon: any;
  filterIcon: any
}) {
  const userName = useSelector((state: RootState) => state.authentication.userName, shallowEqual);
  const { searchIcon, filterIcon, onFilterPress, onSearchPress, title, translateY } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const Navigations = useNavigation();
  const openDrawer = useCallback(() => {
    console.log("darwer Appears")
    Navigations.dispatch(DrawerActions.toggleDrawer());
  }, [Navigations]);
  useEffect(() => {
    console.log("hello from drawer")
  }, [Navigations])
  const handleLogout = async () => {
    Alert.alert(
      'Confirm Logout', // Alert title
      'Are you sure you want to log out?', // Alert message
      [
        {
          text: 'Cancel', // Cancel button
          onPress: () => setModalVisible(false),
          style: 'cancel', // This makes the button appear more prominent
        },
        {
          text: 'OK', // OK button
          onPress: () => {
            setModalVisible(false);
            store.dispatch(logoutUser()); // Log out the user
            store.dispatch(handleLogOut());
          },
        },
      ],
      { cancelable: false }, // Prevents closing the alert by tapping outside of it
    );
  };

  return (
    <Animated.View
      style={{
        transform: [{ translateY: translateY }],
        elevation: 5,
        zIndex: 100000,
      }}>
      <View style={styles.headerContainer}>
        <View style={styles.leftSection}>
          <TouchableOpacity onPress={openDrawer}>
            <MaterialIcons
              name="menu"
              size={28}
              color={colors.darkblack}
              style={styles.burgerIcon}
            />
          </TouchableOpacity>
          {/* <Image
            source={require('../../assets/images/iotHubLogo.png')}
            style={styles.logo}
          /> */}
          <Text style={styles.appName}>{title}</Text>
        </View>
        {searchIcon && filterIcon &&

          <View style={styles.rightSection}>
            <CustomIcon iconPath={searchIcon} onPress={onSearchPress} />
            <CustomIcon iconPath={filterIcon} onPress={onFilterPress} />
          </View>
        }
        {modalVisible && (
          <UserModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            username={userName}
            onLogout={handleLogout}
          />
        )}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.white,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    position: 'absolute',
    top: 0,

    left: 0,
    right: 0,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  burgerIcon: {
    marginRight: 15,
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 10,
    tintColor: colors.darkblack,
  },
  appName: {
    fontSize: 18,
    color: colors.darkblack,
    fontWeight: 'bold',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 15
  },
  username: {
    color: colors.darkblack,
    marginRight: 10,
    fontSize: 16,
  },
});
export default CustomHeader;
