/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState, store} from '../../reducer/Store';
import {useEffect, useLayoutEffect} from 'react';
import {GetSpotDetails} from '../../reducer/spotDetails/spotDetailsAction';
import {ActivityIndicator, Text, View} from 'react-native';
import {AppNavigationParams} from '../../navigation/NavigationStackList';
import React from 'react';
import SpotDetailsComponent from '../../component/listComp/SpotDetailsComponent';
import {Strings} from '../../assets/constants/Lable';
import {STYLES} from '../../styles/ScreensStyles';
interface SpotDetailsScreenParams {
  baseUrls: string;
  spotName: string;
}
function SpotListScreen() {
  const route =
    useRoute<RouteProp<{params: SpotDetailsScreenParams}, 'params'>>();
  const {baseUrls, spotName} = route.params;
  const loader = useSelector((state: RootState) => state.spotDetails.loader);
  const spotDetails = useSelector(
    (state: RootState) => state.spotDetails.spotDetails,
  );
  const navigation = useNavigation<NavigationProp<AppNavigationParams>>();
  // console.log('spotDetails :- ', spotDetails);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View>
          <Text style={STYLES.SpotList_headerTitle}>
            {spotName || Strings.SPOT_DETAILS}{' '}
          </Text>
        </View>
      ),
    });
  }, [navigation, spotName]);
  useEffect(() => {
    store.dispatch(GetSpotDetails({baseUrl: baseUrls, spotName: spotName}));
  }, [baseUrls, spotName]);
  return (
    <View style={STYLES.FLEX_1}>
      <View style={STYLES.FLEX_1}>
        {loader ? (
          <ActivityIndicator size={'large'} />
        ) : (
          <SpotDetailsComponent spotData={spotDetails} />
        )}
      </View>
    </View>
  );
}
export default SpotListScreen;
