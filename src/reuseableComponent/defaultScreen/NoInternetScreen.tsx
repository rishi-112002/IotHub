import React from "react";
import { View, Text } from "react-native";
import { errorStrings } from "../../assets/constants/Lable";
import { ContainerStyles } from "../../styles/ContainerStyles";

export function NoInternetScreen() {

  const { containerStyles } = ContainerStyles();
  return (
    <View
      style={containerStyles.NoInteernetScreenContainer}>
      <Text>{errorStrings.NO_INTERNET_CONNECTION}</Text>
    </View>
  )
}