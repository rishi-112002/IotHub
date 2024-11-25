/* eslint-disable react-native/no-inline-styles */
import { useCallback, useState } from 'react';
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
import CustomIcon from '../customIcons/CustomIcon';
import fontSizes from '../../assets/fonts/FontSize';
import { Colors2 } from '../../assets/color/Colors2';

function CustomHeader(props: {
  buCode: any;
  userLogo: any;
  title: any;
  translateY: any;
  onSearchPress: any;
  onFilterPress: any;
  searchIcon: any;
  filterIcon: any;
  filterCount: any
}) {
  const userName = useSelector((state: RootState) => state.authentication.userName, shallowEqual);
  const { filterCount, searchIcon, filterIcon, onFilterPress, onSearchPress, title, translateY } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const Navigations = useNavigation();
  const openDrawer = useCallback(() => {
    Navigations.dispatch(DrawerActions.toggleDrawer());
  }, [Navigations]);

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
          <Text style={styles.appName}>{title}</Text>
        </View>
        {searchIcon && filterIcon &&

          <View style={styles.rightSection}>
            <CustomIcon iconPath={searchIcon} onPress={onSearchPress} style={{tintColor:Colors2.SecondaryTextColor}} />
            <View style={styles.iconWrapper}>
              {filterCount > 0 &&
                <View style={styles.filterCountBadge}>
                  <Text style={styles.filterCountText}>{filterCount}</Text>
                </View>}
              <CustomIcon iconPath={filterIcon} onPress={onFilterPress} style={{tintColor:Colors2.SecondaryTextColor}}/>
            </View>
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
  iconWrapper: {
    position: 'relative',
  },
  filterCountBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: colors.redDarkest,
    borderRadius: 10,
    height: 15,
    width: 15,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  filterCountText: {
    color: colors.white,
    fontSize: fontSizes.vSmallText,
    fontWeight: 'bold',
  },
  appName: {
    fontSize: 18,
    color: colors.darkblack,
    fontWeight: 'bold',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 15,
  },
  username: {
    color: colors.darkblack,
    marginRight: 10,
    fontSize: 16,
  },
});
export default CustomHeader;
