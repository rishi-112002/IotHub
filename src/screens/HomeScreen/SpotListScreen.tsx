/* eslint-disable react-native/no-inline-styles */
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState, store } from '../../reducer/Store';
import { useEffect, useLayoutEffect } from 'react';
import { GetSpotDetails } from '../../reducer/spotDetails/spotDetailsAction';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import colors from '../../assets/color/colors';
import fontSizes from '../../assets/fonts/FontSize';
import { AppNavigationParams } from '../../navigation/NavigationStackList';
import React from 'react';
import SpotDetailsComponent from '../../component/listComp/SpotDetailsComponent';
import { Strings } from '../../assets/constants/Lable';
interface SpotDetailsScreenParams {
  baseUrls: string;
  spotName: string;
}
function SpotListScreen() {
  const route =
    useRoute<RouteProp<{ params: SpotDetailsScreenParams }, 'params'>>();
  const { baseUrls, spotName } = route.params;
  const loader = useSelector((state: RootState) => state.spotDetails.loader);
  const spotDetails = useSelector(
    (state: RootState) => state.spotDetails.spotDetails,
  );
  const navigation = useNavigation<NavigationProp<AppNavigationParams>>();

  useLayoutEffect(() => {
    navigation.setOptions({

      headerTitle: () => (
        <View>
          <Text style={styles.headerTitle}>{spotName || Strings.SPOT_DETAILS} </Text>
        </View>
      ),
    });
  }, [navigation, spotName]);
  useEffect(() => {
    store.dispatch(GetSpotDetails({ baseUrl: baseUrls, spotName: spotName }));
  }, [baseUrls, spotName]);
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {loader ? (
          <ActivityIndicator size={'large'} />
        ) : (
          <SpotDetailsComponent spotData={spotDetails} />
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  headerTitle: {
    color: colors.darkblack,
    fontSize: fontSizes.heading,
  },
});
export default SpotListScreen;
