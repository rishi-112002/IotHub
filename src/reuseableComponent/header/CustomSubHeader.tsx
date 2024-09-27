import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { RootStackParamList } from "../../navigation/AppNavigation";
import fontSizes from "../../assets/fonts/FontSize";
import colors from "../../assets/color/colors";

function CustomSubHeader(props: { spotName: any }) {
  const { spotName } = props;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftSection}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="white" style={styles.backIcon} />
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
    backgroundColor: colors.AppPrimaryColor,
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
    color: 'white',
    fontSize: fontSizes.heading,
  },
});

export default CustomSubHeader;
