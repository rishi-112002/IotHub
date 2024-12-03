
import GenericAddForm from '../../component/genericComp/GenericAddForm';
import React from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Text, View } from 'react-native';
import colors from '../../assets/color/colors';
interface genericAdd {
  id: any;
}
function GenericAddScreen() {

  const route = useRoute<RouteProp<{ params: genericAdd }, 'params'>>();
  const id = route.params?.id || '';
  return (
    <View style={{ flex: 1  , backgroundColor:colors.white}}>
      <GenericAddForm id={id} />
    </View>
  );
}
export default GenericAddScreen;
