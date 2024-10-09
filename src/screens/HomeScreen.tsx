import React, { useEffect } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState, store } from '../reducer/Store';
import SpotList from '../component/SpotListComponent';
import colors from '../assets/color/colors';
import { GetSpotData } from '../reducer/spotData/spotDataAction';
import CustomHeader from '../reuseableComponent/header/CustomHeader';
import BouncingLoader from '../reuseableComponent/loader/BallBouncingLoader';

function HomeScreen() {
    const baseUrls = useSelector((state: RootState) => state.authentication.baseUrl);
    const loader = useSelector((state: RootState) => state.spotData.loader)
    const spotData = useSelector((state: RootState) => state.spotData.spotData)
    const buCode = useSelector((State: RootState) => State.authentication.buCode)

    useEffect(() => {
        store.dispatch(GetSpotData({ baseUrl: baseUrls }))
    }, [])

    return (
        <View style={styles.container}>

            <CustomHeader buCode={buCode} userLogo={"account-circle"} title={"IotHub"} />
            {loader ? <BouncingLoader /> :
                <View style={{ marginBottom: 40 }}>
                    <SpotList data={spotData} />
                </View>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    textContainer: {
        paddingHorizontal: 20,
        paddingVertical: 5,
        flexDirection: "row",
        columnGap: 25
    },
    subHeading: {
        fontSize: 15,
        fontWeight: '700',
        color: colors.darkblack
    }

});

export default HomeScreen;