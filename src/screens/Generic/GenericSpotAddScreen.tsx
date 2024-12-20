
import GenericAddForm from '../../component/genericComp/GenericAddForm';
import React from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { View } from 'react-native';
import { STYLES } from '../ScreensStyles';
interface genericAdd {
  id: any;
}
function GenericAddScreen() {

  const route = useRoute<RouteProp<{ params: genericAdd }>>();
  const id = route.params?.id || '';
  return (
    <View style={STYLES.Sequential_LOADER_BACKGROUND}>
      <GenericAddForm id={id} />
    </View>
  );
}
export default GenericAddScreen;
