
import GenericAddForm from './GenericAddForm';
import React from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
interface genericAdd {
  id: any;
}
function GenericAddScreen() {

  const route = useRoute<RouteProp<{ params: genericAdd }, 'params'>>();
  const id = route.params?.id || '';
  return (
    <GenericAddForm id={id} />
  );
}
export default GenericAddScreen;
