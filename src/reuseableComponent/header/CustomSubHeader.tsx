import React from "react";
import { Animated, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import fontSizes from "../../assets/fonts/FontSize";
import colors from "../../assets/color/colors";
import CustomIcon from "../customIcons/CustomIcon";

function CustomSubHeader(props: { spotName: string, translateY: any, onPress: any, iconPath: any, onBackPress: any }) {
  const { spotName, onPress, iconPath, onBackPress, translateY } = props;
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
              name="arrow-back"
              size={24}
              color={colors.darkblack}
              style={styles.backIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.rightSection}>
          <Text style={styles.spotName}>{spotName}</Text>
          <TouchableOpacity style={{ padding: 5 }}>
            <CustomIcon iconPath={iconPath} onPress={onPress} />
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
      height:60,
      left: 0,
      right: 0,
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
    justifyContent: 'space-between'
  },
  spotName: {
    color: colors.darkblack,
    fontSize: fontSizes.heading,
  },
});

export default CustomSubHeader;
