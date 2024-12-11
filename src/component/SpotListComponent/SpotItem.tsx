import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import fontSizes from '../../assets/fonts/FontSize';
import CustomMenu from '../../reuseableComponent/menuOptions/CustomMenu';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { AppNavigationParams } from '../../navigation/NavigationStackList';
import { Strings } from '../../assets/constants/Lable';
import colors from '../../assets/color/colors';
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
  return (
    <Animated.View style={styles.spotContainer}>
      <TouchableOpacity
        onPress={()=>OnHandlePress(item)}>

        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
            <View style={{ flex: 1, gap: 5 }}>
              <Text style={styles.spotTitle}>
                {item.name}
              </Text>
              <View style={{
                backgroundColor: item.active ? colors.MintGreen : colors.BlushPink,
                borderRadius: 20,
                width: item.active ? "24%" : "31%",
                paddingStart: 5

              }}>
                <Text
                  style={[
                    styles.statusText,
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
        </View>

        <View style={styles.rowContainer}>
          <View>
            <Text style={styles.label}>{Strings.EXPIRY_DATE}:</Text>
            <Text style={styles.statusText}>
              {item.expiryDate ? item.expiryDate : Strings.NA}
            </Text>
          </View>
          <View
            style={[
              styles.delayedContainer,
            ]}>
            <Text style={styles.label}>{Strings.DELAY}:</Text>
            <Text
              style={[
                styles.statusText,
              ]}>
              {item.delayed ? Strings.DELAYED : Strings.ON_TIME}
            </Text>
          </View>
          <View
            style={[
              styles.statusContainer,
            ]}>
            <Text style={styles.label}>{Strings.CURRENT_STATE}:</Text>
            <Text
              style={[
                styles.statusText,
              ]}>
              {item.currentState ||Strings.NO_STATE_INFO}
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
    color: colors.SecondaryTextColor,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  label: {
    fontSize: fontSizes.smallText,
    color: colors.HelperTextColor,
  },
  statusContainer: {
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 15,
  },
  statusText: {
    fontSize: fontSizes.smallText,
    color: colors.SecondaryTextColor,
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

