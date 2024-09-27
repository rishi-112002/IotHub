import React, { useEffect } from 'react';
import {
    StyleSheet,
    Alert,
    ActivityIndicator,
    View
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState, store } from '../reducer/Store';
import { logoutUser } from '../reducer/Login/LoginAction';
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/AppNavigation";
import SpotList from '../component/SpotListComponent';
import colors from '../assets/color/colors';
import { GetSpotData } from '../reducer/spotData/spotDataAction';
import CustomHeader from '../reuseableComponent/header/CustomHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';

function HomeScreen() {
    const baseUrls = useSelector((state: RootState) => state.authentication.baseUrl);
    const loader = useSelector((state: RootState) => state.spotData.loader)
    const spotData = useSelector((state: RootState) => state.spotData.spotData)
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const buCode = useSelector((State: RootState) => State.authentication.buCode)
    const handleLogout = async () => {
        store.dispatch(logoutUser())
        Alert.alert("Logged Out", "You have successfully logged out.");

    };
    useEffect(() => {
        store.dispatch(GetSpotData({ baseUrl: baseUrls }))
    }, [])
    return (
        <View style={styles.container}>
            <CustomHeader handleLogout={handleLogout} buCode={buCode}navigation={navigation}/>
            {loader ? <ActivityIndicator size={30} style={{ flex: 1, justifyContent: "center" }} /> :
                <View style={{ marginBottom: 40 }}>
                    <SpotList data={spotData} />
                </View>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
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