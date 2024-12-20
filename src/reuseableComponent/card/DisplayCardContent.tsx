import { Text, View } from 'react-native';
import React from 'react';
import { Display } from './DetailsCard';
import { Strings } from '../../assets/constants/Lable';
import { ContainerStyles } from '../../styles/ContainerStyles';
import { TextStyles } from '../../styles/TextStyles';

export const DisplayCardContent = (display: Display) => {
  const { containerStyles } = ContainerStyles()
  const { textStyles } = TextStyles()
  return (
    <View style={containerStyles.infoContainer}>
      <Text style={textStyles.nameText}>{display.name || Strings.NA}</Text>
      <Text style={textStyles.ipText}>{display.ip || Strings.NA}</Text>
      <View style={containerStyles.detailsContainer}>
        <View style={containerStyles.detailColumn}>
          <Text style={textStyles.label}>{Strings.VERSION}:</Text>
          <Text style={textStyles.detailText}>
            {display.version || Strings.NA}
          </Text>
        </View>
        <View style={containerStyles.detailColumn}>
          <Text style={textStyles.label}>{Strings.TYPE}:</Text>
          <Text style={textStyles.detailText}>
            {display.type || Strings.NA}
          </Text>
        </View>
      </View>
    </View>
  );
};
