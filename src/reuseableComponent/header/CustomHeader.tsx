import { useCallback, useState } from 'react';
import {
  Alert,
  Animated,
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
import { IconName, Strings } from '../../assets/constants/Lable';
import { ComponentStyles } from '../../styles/ComponentStyles';
import { ContainerStyles } from '../../styles/ContainerStyles';
import { TextStyles } from '../../styles/TextStyles';

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
  const { styles } = ComponentStyles();
  const { textStyles } = TextStyles();
  const { containerStyles } = ContainerStyles();

  const handleLogout = async () => {
    Alert.alert(
      Strings.CONFIRM_LOGOUT, // Alert title
      Strings.SURE_TO_LOGOUT, // Alert message
      [
        {
          text: IconName.CANCLE, // Cancel button
          onPress: () => setModalVisible(false),
          style: 'cancel', // This makes the button appear more prominent
        },
        {
          text: Strings.OK,
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
        zIndex: 1,
        position: "absolute",
        left: 0,
        right: 0,
        height: 60
      }}>
      <View style={containerStyles.subHeaderContainer}>
        <View style={containerStyles.leftSectionContainer}>
          <TouchableOpacity onPress={openDrawer}>
            <MaterialIcons
              name={IconName.MENU}
              size={28}
              color={colors.darkblack}
              style={styles.burgerIcon}
            />
          </TouchableOpacity>
          <Text style={textStyles.screenName}>{title}</Text>
        </View>
        {searchIcon && filterIcon &&

          <View style={containerStyles.headerIconContainer}>
            <CustomIcon iconPath={searchIcon} onPress={onSearchPress} style={{ tintColor: colors.SecondaryTextColor }} />
            <View style={styles.iconWrapper}>
              {filterCount > 0 &&
                <View style={containerStyles.filterCountBadgeContainer}>
                  <Text style={textStyles.filterCountText}>{filterCount}</Text>
                </View>}
              <CustomIcon iconPath={filterIcon} onPress={onFilterPress} style={{ tintColor: colors.SecondaryTextColor }} />
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
export default CustomHeader;

