import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import CustomMenu from '../../reuseableComponent/menuOptions/CustomMenu';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { AppNavigationParams } from '../../navigation/NavigationStackList';
import { Strings } from '../../assets/constants/Lable';
import colors from '../../assets/color/colors';
import { CardStyles } from '../../styles/CardStyles';
import { ContainerStyles } from '../../styles/ContainerStyles';
import { TextStyles } from '../../styles/TextStyles';
import { SpotlistTextComponent } from '../../reuseableComponent/textComponent/SpotListTextComponent';
type SpotItemProps = {
  item: {
    name: string;
    weight: number | null;
    weightStable?: boolean;
    weightError?: string;
    active: boolean;
    delayed: boolean;
    currentState: string | null;
    expiryDate: any
  };
  baseUrl: string | null;
};


const SpotItem = ({ item, baseUrl }: SpotItemProps) => {
  const navigation = useNavigation<NavigationProp<AppNavigationParams>>();
  const OnHandlePress = useCallback((item: any) => {
    navigation.navigate("SpotDetailScreen", { data: item });
  }, [navigation]);
  const { textStyles } = TextStyles();
  const { cardStyles } = CardStyles();
  const { containerStyles } = ContainerStyles()
  return (
    <Animated.View style={containerStyles.spotContainer}>
      <TouchableOpacity
        onPress={() => OnHandlePress(item)}>


        <View style={containerStyles.rowContainer}>
          <View style={containerStyles.rowSubContainer}>
            <Text style={textStyles.spotTitle}>
              {item.name}
            </Text>
            <View
              style={[item.active ? containerStyles.activeStatusContainer : containerStyles.inactiveStatusContainer, {
                width: item.active ? "23%" : "30%"
              }]}>
              <Text
                style={[
                  textStyles.statusText,
                  {
                    color: item.active ? colors.primaryGreen : colors.redBase,
                  },
                ]}>
                {item.active ? Strings.CONNECTED : Strings.NOT_CONNECTED}
              </Text>
            </View>
          </View>
          <View style={{ marginTop: 10 }}>
            <CustomMenu baseUrl={baseUrl} spotName={item.name} />
          </View>
        </View>
        <View style={cardStyles.cardRowConatiner}>

          <SpotlistTextComponent name={Strings.EXPIRY_DATE} value={item.expiryDate ? item.expiryDate : Strings.NA} />
          <SpotlistTextComponent name={Strings.DELAY} value={item.delayed ? Strings.DELAYED : Strings.ON_TIME} />
          <SpotlistTextComponent name={Strings.CURRENT_STATE} value={item.currentState || Strings.NO_STATE_INFO} />
        </View>

      </TouchableOpacity>
    </Animated.View>
  );
};
export default SpotItem;

