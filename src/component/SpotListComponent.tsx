import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../assets/color/colors';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigation';
import { RootState } from '../reducer/Store';
import { useSelector } from 'react-redux';
import fontSizes from '../assets/fonts/FontSize';

type init = {
  item: any,
}

function SpotList(props: { data: any }) {
  const { data } = props;
  const baseUrls = useSelector((state: RootState) => state.authentication.baseUrl);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const fadeAnim = new Animated.Value(0);

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const renderSpot = ({ item }: init) => {
    let weightDisplay;
    if (item.weight !== null) {
      weightDisplay = (
        <Text style={{ color: item.weightStable ? 'green' : 'red', fontSize: fontSizes.text, fontWeight: 'bold' }}>
          {item.weight}
        </Text>
      );
    } else if (item.weightError) {
      weightDisplay = (
        <Text style={{ color: 'red', fontSize: fontSizes.text }}>
          {item.weightError}
        </Text>
      );
    } else {
      weightDisplay = <Text style={{ fontSize: fontSizes.text, color: "gray" }}>No Weight Info</Text>;
    }

    fadeIn();

    return (
      <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
        <View style={styles.spotContainer}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.spotTitle}>
                {item.name.length > 14 ? `${item.name.substring(0, 14)}...` : item.name}
              </Text>
              <View style={{ flexDirection: "row", marginBottom: 5 }}>
                <Text style={styles.label}>Connectivity: </Text>
                <MaterialIcons
                  name={item.active === true ? 'cancel' : 'pause-circle'}
                  size={20}
                  color={item.active === true ? colors.redDarkest : colors.greenDarkest}
                />
              </View>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
              <TouchableOpacity
                style={styles.iconButton}
                activeOpacity={0.7}
                onPress={() => navigation.navigate("SpotDetailsScreen", { baseUrls: baseUrls, spotName: item.name })}>
                <Image source={require("../assets/images/spotDetailsLogoBar.png")}
                  style={styles.iconImage} />
                <Text style={styles.iconText}>Spot Details</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.iconButton}
                activeOpacity={0.7}
                onPress={() => navigation.navigate("EventLogScreen", { baseUrls: baseUrls, spotName: item.name })}>
                <Image source={require("../assets/images/eventlogsLogo.png")}
                  style={styles.iconImage} />
                <Text style={styles.iconText}>Event Logs</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Weight: </Text>
            {weightDisplay}
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Time Status: </Text>
            <Text style={[styles.details, { color: item.delayed ? colors.redDarkest : colors.greenDarkest }]}>
              {item.delayed ? 'Delayed' : 'On Time'}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Current State: </Text>
            <Text style={styles.details}>{item.currentState || 'No State Info'}</Text>
          </View>
        </View>
      </Animated.View >
    );
  };

  return (
    <View style={{ paddingBottom: 20 }}>
      <FlatList
        data={data}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={renderSpot}
        contentContainerStyle={{ padding: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: colors.white,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
    borderLeftWidth: 5,
    borderLeftColor: colors.AppPrimaryColor,
  },
  spotContainer: {
    flexDirection: "column",
  },
  spotTitle: {
    fontSize: fontSizes.heading,
    color: colors.darkblack,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  label: {
    fontSize: fontSizes.text,
    color: "gray",
    fontWeight: '600',
  },
  details: {
    fontSize: fontSizes.smallText,
    color: colors.blueDarkest,
    fontWeight: '600',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  iconButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconImage: {
    width: 26,
    height: 26,
    tintColor: colors.white,
    backgroundColor: colors.iconColorDark,
    borderRadius: 5,
    marginBottom: 5,
  },
  iconText: {
    fontSize: fontSizes.smallText,
    fontWeight: "700",
    color: colors.darkblack,
  }
});

export default SpotList;
