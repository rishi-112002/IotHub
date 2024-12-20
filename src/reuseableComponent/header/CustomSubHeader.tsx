import React from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../assets/color/colors';
import CustomIcon from '../customIcons/CustomIcon';
import { IconName } from '../../assets/constants/Lable';
import { ComponentStyles } from '../../styles/ComponentStyles';
import { ContainerStyles } from '../../styles/ContainerStyles';
import { TextStyles } from '../../styles/TextStyles';


function CustomSubHeader(props: { searchIconPath: any, onSearchPress: any, spotName: string, translateY: any, onPress: any, filterIconPath: any, onBackPress: any, filterCount: number }) {
  const { searchIconPath, onSearchPress, spotName, onPress, filterIconPath: iconPath, onBackPress, translateY, filterCount } = props;
  const { styles } = ComponentStyles();
  const { textStyles } = TextStyles();
  const { containerStyles } = ContainerStyles();
  return (
    <Animated.View
      style={{
        transform: [{ translateY: translateY }],
        elevation: 5,
        zIndex: 100000,
      }}>
      <View style={containerStyles.subHeaderContainer}>
        <View style={styles.searchWrapper}>

          <TouchableOpacity onPress={onBackPress}>
            <MaterialIcons
              name={IconName.ARROW_BACK}
              size={24}
              color={colors.darkblack}
              style={styles.backIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={containerStyles.subHeaderRightSection}>
          <Text style={styles.sectionTitle}>{spotName}</Text>
          <TouchableOpacity style={{ padding: 5 }} onPress={onPress}>
            <View style={[styles.searchWrapper, {
              flex: 1, columnGap: 15,
            }]}>
              <CustomIcon iconPath={searchIconPath} onPress={onSearchPress} />
              <View style={styles.iconWrapper}>
                {filterCount > 0 &&
                  <View style={containerStyles.filterCountBadgeContainer}>
                    <Text style={textStyles.filterCountText}>{filterCount}</Text>
                  </View>}

                <CustomIcon iconPath={iconPath} onPress={onPress} />
              </View>
            </View>
          </TouchableOpacity>
        </View>

      </View>
    </Animated.View>
  );
}
export default CustomSubHeader;
