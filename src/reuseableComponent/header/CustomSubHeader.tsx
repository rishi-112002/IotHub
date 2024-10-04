import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import fontSizes from "../../assets/fonts/FontSize";
import colors from "../../assets/color/colors";

function CustomSubHeader(props: { spotName: string, onPress: any }) {
  const { spotName, onPress } = props;

  // Define navigation based on the 'type' prop


  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftSection}>
        <TouchableOpacity onPress={onPress}>
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.white,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    marginRight: 15,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spotName: {
    color: colors.darkblack,
    fontSize: fontSizes.heading,
  },
});

export default CustomSubHeader;
