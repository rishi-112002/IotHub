/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import fontSizes from '../../assets/fonts/FontSize';
import colors from '../../assets/color/colors';
import CustomIcon from '../customIcons/CustomIcon';
import { IconName } from '../../assets/constants/Lable';


function CustomSubHeader(props: { searchIconPath: any, onSearchPress: any, spotName: string, translateY: any, onPress: any, filterIconPath: any, onBackPress: any, filterCount: number }) {
  const { searchIconPath, onSearchPress, spotName, onPress, filterIconPath: iconPath, onBackPress, translateY, filterCount } = props;

  return (
    <Animated.View
      style={{
        transform: [{ translateY: translateY }],
        elevation: 5,
        zIndex: 100000,
      }}>
      <View style={styles.headerContainer}>
        <View style={styles.leftSection}>

          <TouchableOpacity onPress={onBackPress}>
            <MaterialIcons
              name={IconName.ARROW_BACK}
              size={24}
              color={colors.darkblack}
              style={styles.backIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.rightSection}>
          <Text style={styles.spotName}>{spotName}</Text>
          <TouchableOpacity style={{ padding: 5 }} onPress={onPress}>
            <View style={{
              flex: 1, flexDirection: 'row', justifyContent: 'center',
              alignItems: 'center', columnGap: 15,
            }}>
              <CustomIcon iconPath={searchIconPath} onPress={onSearchPress}  style={{tintColor:colors.SecondaryTextColor}}/>
              <View style={styles.iconWrapper}>
                {filterCount > 0 &&
                  <View style={styles.filterCountBadge}>
                    <Text style={styles.filterCountText}>{filterCount}</Text>
                  </View>}

                <CustomIcon iconPath={iconPath} onPress={onPress} style={{tintColor:colors.SecondaryTextColor}}/>
              </View>
            </View>
          </TouchableOpacity>
        </View>

      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    position: 'absolute',
    top: 0,
    height: 60,
    left: 0,
    right: 0,
  },
  iconWrapper: {
    position: 'relative',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    marginRight: 15,
  },
  rightSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  spotName: {
    color: colors.darkblack,
    fontSize: fontSizes.heading,
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
});

export default CustomSubHeader;
