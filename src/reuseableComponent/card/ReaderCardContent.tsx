/* eslint-disable react-native/no-inline-styles */
import { Text, View } from 'react-native';
import React from 'react';
import { Reader } from './DetailsCard';
import CustomIcon from '../customIcons/CustomIcon';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AppNavigationParams } from '../../navigation/NavigationStackList';
import { ImagePath, Strings } from '../../assets/constants/Lable';
import { ComponentStyles } from '../../styles/ComponentStyles';
import { ContainerStyles } from '../../styles/ContainerStyles';
import { TextStyles } from '../../styles/TextStyles';
import { CardStyles } from '../../styles/CardStyles';
import { SpotlistTextComponent } from '../textComponent/SpotListTextComponent';

export const ReaderCardContent = (
  reader: Reader,
  allowAction: boolean,
  handleDelete: (reader: any) => void,
) => {
  const navigation = useNavigation<NavigationProp<AppNavigationParams>>();
  const { styles } = ComponentStyles();
  const { cardStyles } = CardStyles();
  const { textStyles } = TextStyles();
  const { containerStyles } = ContainerStyles();
  return (
    <View style={[containerStyles.mainContainer, { marginStart: 10 }]}>
      {allowAction ? (
        <View style={styles.row}>
          <Text style={textStyles.spotTitle}>{reader.name || Strings.NA}</Text>
          <View style={containerStyles.spotIconContainer}>
            <CustomIcon
              iconPath={ImagePath.EDIT}
              onPress={() => {
                navigation.navigate('RfidEdit', { readers: reader });
              }}
            />
            <CustomIcon
              iconPath={ImagePath.DELETE}
              onPress={() => handleDelete(reader.id)}
            />
          </View>
        </View>
      ) : (
        <Text style={textStyles.spotTitle}>{reader.name || Strings.NA}</Text>
      )}
      <Text style={textStyles.statusText}>{reader.ip || Strings.NA}</Text>
      <View style={cardStyles.cardRowConatiner}>
        <SpotlistTextComponent name={Strings.MODEL} value={reader.model || Strings.NA} />
        <SpotlistTextComponent name={Strings.TYPE} value={reader.type || Strings.NA} />
        <SpotlistTextComponent name={Strings.PORT} value={reader.port || Strings.NA} />
      </View>
    </View>
  );
};
