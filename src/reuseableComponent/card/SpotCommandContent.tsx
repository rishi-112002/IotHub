import { Text, View } from 'react-native';
import React from 'react';
import { SpotCommand } from './DetailsCard';
import colors from '../../assets/color/colors';
import { Strings } from '../../assets/constants/Lable';
import { ComponentStyles } from '../../styles/ComponentStyles';
import { TextStyles } from '../../styles/TextStyles';
import { ContainerStyles } from '../../styles/ContainerStyles';
export const SpotCommandCardContent = (command: SpotCommand) => {

  const { styles } = ComponentStyles();
  const { textStyles } = TextStyles();
  const { containerStyles } = ContainerStyles()
  return (
    <View style={containerStyles.infoContainer}>
      <View style={styles.row}>
        <Text style={textStyles.nameText}>{command.name}</Text>
        <View
          style={[
            containerStyles.statusContainer,
            {
              backgroundColor: command.autoCommandEnabled
                ? colors.greenSoftneer
                : colors.redSoftner,
            },
          ]}>
          <Text
            style={[
              textStyles.statusText,
              { color: command.autoCommandEnabled ? colors.greenBase : colors.redBase },
            ]}>
            {command.autoCommandEnabled ? Strings.ACTIVE : Strings.DEACTIVE}
          </Text>
        </View>
      </View>
      <Text style={textStyles.ipText}>{command.commandDirA}</Text>
    </View>
  );
};
