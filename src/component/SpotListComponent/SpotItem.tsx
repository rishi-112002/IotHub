/* eslint-disable react-native/no-inline-styles */
// src/components/SpotItem.tsx
import React from 'react';
import {View, Text, TouchableOpacity, Animated, StyleSheet} from 'react-native';
import fontSizes from '../../assets/fonts/FontSize';
import colors from '../../assets/color/colors';
import CustomMenu from '../../reuseableComponent/menuOptions/CustomMenu';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {AppNavigationParams} from '../../navigation/NavigationStackList';
// import useFadeAnimation from '../../reuseableComponent/shimmer/FadeInAnimation';

type SpotItemProps = {
  item: {
    name: string;
    weight: number | null;
    weightStable?: boolean;
    weightError?: string;
    active: boolean;
    delayed: boolean;
    currentState: string | null;
  };
  baseUrl: string | null;
};

const SpotItem = ({item, baseUrl}: SpotItemProps) => {
  const navigation = useNavigation<NavigationProp<AppNavigationParams>>();
  //   const fadeAnim = useFadeAnimation();

  const getWeightDisplay = () => {
    if (item.weight !== null) {
      return (
        <Text
          style={[
            styles.weightText,
            {color: item.weightStable ? 'green' : 'red'},
          ]}>
          {item.weight}
        </Text>
      );
    }
    if (item.weightError) {
      return <Text style={styles.errorText}>{item.weightError}</Text>;
    }
    return <Text style={styles.noInfoText}>No Weight Info</Text>;
  };

  return (
    <Animated.View style={styles.spotContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate('SpotDetailScreen', {data: item})}>
        <View style={styles.contentContainer}>
          <Text style={styles.spotTitle}>
            {item.name.length > 14
              ? `${item.name.substring(0, 14)}...`
              : item.name}
          </Text>
          <View style={styles.rowContainer}>
            <View
              style={[
                styles.statusContainer,
                {backgroundColor: item.active ? '#DCFCE7' : '#FEF2F2'},
              ]}>
              <Text
                style={[
                  styles.statusText,
                  {color: item.active ? '#15803D' : '#B91C1C'},
                ]}>
                {item.active ? 'Connected' : 'Not-Connected'}
              </Text>
            </View>
            <CustomMenu baseUrl={baseUrl} spotName={item.name} />
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Weight:</Text>
          {getWeightDisplay()}
        </View>
        <View style={styles.rowContainer}>
          <View
            style={[
              styles.delayedContainer,
              {borderColor: item.delayed ? '#FEF2F2' : '#DCFCE7'},
            ]}>
            <Text
              style={[
                styles.delayedText,
                {color: item.delayed ? '#B91C1C' : '#15803D'},
              ]}>
              {item.delayed ? 'Delayed' : 'On Time'}
            </Text>
          </View>
          <View
            style={[
              styles.statusContainer,
              {borderColor: item.currentState ? '#DCFCE7' : '#FEF2F2'},
            ]}>
            <Text
              style={[
                styles.statusText,
                {color: item.currentState ? '#15803D' : '#B91C1C'},
              ]}>
              {item.currentState || 'No State Info'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.divider} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  spotContainer: {
    paddingHorizontal: 20,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    columnGap: 40,
  },
  spotTitle: {
    fontSize: fontSizes.heading,
    color: colors.darkblack,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  label: {
    fontSize: fontSizes.text,
    color: 'gray',
    fontWeight: '600',
  },
  statusContainer: {
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 15,
  },
  statusText: {
    fontSize: 12,
  },
  delayedContainer: {
    borderWidth: 2,
    paddingHorizontal: 3,
    paddingVertical: 3,
    borderRadius: 15,
  },
  delayedText: {
    fontSize: 12,
    fontWeight: '600',
  },
  weightText: {
    fontSize: fontSizes.text,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: fontSizes.text,
  },
  noInfoText: {
    fontSize: fontSizes.text,
    color: 'gray',
  },
  divider: {
    height: 1,
    marginVertical: 15,
    backgroundColor: '#d4d4d4',
  },
});

export default SpotItem;
