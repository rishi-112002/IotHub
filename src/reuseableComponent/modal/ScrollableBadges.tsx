import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import colors from '../../assets/color/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { IconName, Strings } from '../../assets/constants/Lable';
import { ComponentStyles } from '../../styles/ComponentStyles';
import { ContainerStyles } from '../../styles/ContainerStyles';
import { TextStyles } from '../../styles/TextStyles';

function ScrollableBadges(props: {
  filterCount: any;
  setFilterCount: any;
  badges: any;
  setSelectedSpot: any;
  setSelectedDirection: any;
  setSelectedFromDate: any;
  setSelectedName: any;
  setSelectedToDate: any;
  setToDateValue: any;
  setDateFromValue: any;
  setConnectivity: any;
}) {
  const {
    setConnectivity,
    filterCount,
    setFilterCount,
    badges,
    setSelectedDirection,
    setDateFromValue,
    setSelectedFromDate,
    setSelectedName,
    setSelectedSpot,
    setSelectedToDate,
    setToDateValue,
  } = props;
  // Filter out entries where the value is empty or null
  const [badgeList, setBadgeList] = useState(
    badges.filter((badge: any) => badge.value),
  );
  const { containerStyles } = ContainerStyles();
  const { styles } = ComponentStyles();
  const { textStyles } = TextStyles();
  useEffect(() => {
    // Filter out entries where the value is empty or null and update the badgeList
    setBadgeList(badges.filter((badge: { value: any }) => badge.value));
  }, [badges]);

  const removeBadge = (key: any) => {
    setBadgeList(badgeList.filter((badge: any) => badge.key !== key));

    let count = filterCount;

    if (key === Strings.SPOT) {
      count = count - 1;
      setFilterCount(count);
      setSelectedSpot('');
    } else if (key === Strings.CONNECTIVITY) {
      count = count - 1;
      setConnectivity(Strings.ALL);
      setFilterCount(count);
    } else if (key === Strings.DIRECTION_S) {
      count = count - 1;
      setFilterCount(count);
      setSelectedDirection('');
    } else if (key === Strings.NAME_S) {
      count = count - 1;
      setFilterCount(count);
      setSelectedName('');
    } else if (key === Strings.FROM_DATE_s) {
      count = count - 1;
      setFilterCount(count);
      setSelectedFromDate('');
      setDateFromValue('');
    } else if (key === Strings.TO_DATE_s) {
      count = count - 1;
      setFilterCount(count);
      setSelectedToDate('');
      setToDateValue('');
    }
  };

  return (
    <ScrollView
      horizontal
      style={containerStyles.badgeScrollContainer}
      showsHorizontalScrollIndicator={false}>
      {badgeList.map((badge: any, index: any) => (
        <View key={index} style={containerStyles.badgeContainer}>
          <Text style={textStyles.badgeText}>
            {badge.key === Strings.CONNECTIVITY ? ' ' : `${badge.key};`} {badge.value}
          </Text>
          <TouchableOpacity onPress={() => removeBadge(badge.key)}>
            <Icon name={IconName.CANCLE} size={15} color={colors.blueBase} />
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

export default ScrollableBadges;
