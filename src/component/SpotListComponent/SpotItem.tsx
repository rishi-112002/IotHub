import React from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import fontSizes from '../../assets/fonts/FontSize';
import CustomMenu from '../../reuseableComponent/menuOptions/CustomMenu';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { AppNavigationParams } from '../../navigation/NavigationStackList';
import { Colors2 } from '../../assets/color/Colors2';
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
  return (
    <Animated.View style={styles.spotContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate('SpotDetailScreen', { data: item })}>
        <View>
          <View style={{ flexDirection: "row", justifyContent: 'space-between', flex: 1 }}>
            <View style={{ flex: 0.9 }}>
              <Text style={styles.spotTitle}>
                {item.name}
              </Text>
              <Text
                style={[
                  styles.statusText,
                  {
                    marginTop: 5,
                    color: item.active ? '#15803D' : '#B91C1C',
                    width: item.active ? "28%" : "35%",
                    backgroundColor: item.active ? '#DCFCE7' : '#FEF2F2',
                    paddingStart: 10, borderRadius: 20
                  },
                ]}>
                {item.active ? 'Connected' : 'Not-Connected'}
              </Text>
            </View>
            <View style={{ marginTop: 10 }}>
              <CustomMenu baseUrl={baseUrl} spotName={item.name} />
            </View>
          </View>
        </View>

        <View style={styles.rowContainer}>
          <View>
            <Text style={styles.label}>Expiry date:</Text>
            <Text style={styles.statusText}>
              {item.expiryDate ? item.expiryDate : "null"}
            </Text>
          </View>
          <View
            style={[
              styles.delayedContainer
            ]}>
            <Text style={styles.label}>Delay:</Text>
            <Text
              style={[
                styles.statusText
              ]}>
              {item.delayed ? 'Delayed' : 'On Time'}
            </Text>
          </View>
          <View
            style={[
              styles.statusContainer,
            ]}>
            <Text style={styles.label}>Current State:</Text>
            <Text
              style={[
                styles.statusText
              ]}>
              {item.currentState || 'No State Info'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  spotContainer: {
    flex: 1,
    paddingStart: 15,
  },
  rowContainer: {
    marginTop: 5,
    flexDirection: 'row',
    columnGap: 40,
  },
  spotTitle: {
    fontSize: fontSizes.title,
    color: Colors2.SecondaryTextColor,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  label: {
    fontSize: fontSizes.smallText,
    color: Colors2.HelperTextColor,
  },
  statusContainer: {
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 15,
  },
  statusText: {
    fontSize: fontSizes.smallText,
    color: Colors2.SecondaryTextColor,
  },
  delayedContainer: {

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
