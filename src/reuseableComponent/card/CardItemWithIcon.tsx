
import React, { memo } from 'react';
import { View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../assets/color/colors';
import { ComponentStyles } from '../../styles/ComponentStyles';
import { ContainerStyles } from '../../styles/ContainerStyles';

interface CardItemWithIconProps {
  view: React.ReactNode;
  iconName: string;
}
const CardItemWith_Icon: React.FC<CardItemWithIconProps> = ({ iconName, view }) => {
  const { styles } = ComponentStyles();
  const { containerStyles } = ContainerStyles();
  return (

    <View style={styles.tabItem}>
      <View style={styles.row}>
        <View style={containerStyles.cardIconContainer}>
          <MaterialIcons name={iconName} size={20} color={colors.IconColor} />
        </View>
        {view}
      </View>
    </View>
  );
};

export default memo(CardItemWith_Icon);

