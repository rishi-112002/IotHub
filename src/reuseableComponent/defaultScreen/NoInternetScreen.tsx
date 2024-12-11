import React from "react";
import { View, Text } from "react-native";
import { errorStrings } from "../../assets/constants/Lable";

export function NoInternetScreen() {
    return(
        <View
        style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
        <Text>{errorStrings.NO_INTERNET_CONNECTION}</Text>
      </View>
    )

}