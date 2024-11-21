import React from 'react';
import WeighBridgeAddForm from '../../component/weighBridgeComp/WeighBridgeAddForm';
import { RouteProp, useRoute } from '@react-navigation/native';
interface WeighbridgesAddScreenParams {
    id: any;
}
function WeighbridgesAddScreen() {
    const route = useRoute<RouteProp<{ params: WeighbridgesAddScreenParams }, 'params'>>();
    const id = route.params?.id || '';
    return (
        <WeighBridgeAddForm id={id} />
    );
}
export default WeighbridgesAddScreen;

