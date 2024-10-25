import React from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import fontSizes from '../assets/fonts/FontSize';
import colors from '../assets/color/colors';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootState, store } from '../reducer/Store';
import { useSelector } from 'react-redux';
import { AppNavigationParams } from '../navigation/NavigationStackList';
import { DeleteGenericSpot, GenericSpotsData } from '../reducer/genericSpot/uploadGenericDataAction';
import { DeleteWeighBridgeSpot, WeighBridgeSpotData } from '../reducer/weighBridge/WeighBridgeAction';
import CustomSnackBar from '../reuseableComponent/modal/CustomSnackBar';
import CustomIcon from '../reuseableComponent/customIcons/CustomIcon';
import CustomToast from '../reuseableComponent/modal/CustomToast';
import Toast from 'react-native-toast-message';

function SpotsDataByTypeComponent(props: { data: any, type: string, handleScroll: any }) {

    const url = useSelector((state: RootState) => state.authentication.baseUrl);
    const buCode = useSelector((state: RootState) => state.authentication.buCode);
    const token = useSelector((state: RootState) => state.authentication.token);
    const navigation = useNavigation<NavigationProp<AppNavigationParams>>();

    const { data, type, handleScroll } = props;


    const showToast = () => {
        Toast.show({
            type: 'success',
            text1: 'Edit Clicked!',
            text2: 'You clicked the edit button 👋',
            position: 'top',
            autoHide: true, 
        });
    };

    const handleDelete = (id: string) => {
        Alert.alert(
            'Delete Spot',
            'Are you sure you want to delete this spot?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                    onPress: () => {
                        console.log("abort")
                    },
                },
                {
                    text: 'OK',
                    onPress: () => {
                        if (type === "GENERIC_SPOT") {
                            store.dispatch(DeleteGenericSpot({ baseUrl: url, id: id, bucode: buCode, token: token }))
                                .then(() => {
                                    store.dispatch(GenericSpotsData({ baseUrl: url, spotType: 'GENERIC_SPOT', token: token, buCode: buCode }));
                                    <CustomToast type="success" message="deleted Successfull" />
                                })
                                .catch(() => {
                                    CustomSnackBar({ backGroundColor: colors.redDarkest, text: "success", textColor: colors.white })
                                    Alert.alert("Error", "Failed to delete the spot. Please try again.");
                                });
                        }
                        else {
                            store.dispatch(DeleteWeighBridgeSpot({ baseUrl: url, id: id, bucode: buCode, token: token }))
                                .then(() => {
                                    store.dispatch(WeighBridgeSpotData({ baseUrl: url, spotType: 'BIDIRECTIONAL_SPOT', token: token, buCode: buCode }));
                                    <CustomToast type="success" message="deleted Successfull" />
                                })
                                .catch(() => {
                                    CustomSnackBar({ backGroundColor: colors.redDarkest, text: "success", textColor: colors.white })
                                    Alert.alert("Error", "Failed to delete the spot. Please try again.");
                                });

                        }

                    },
                },
            ],
            { cancelable: false }
        );
    };

    const renderSpot = ({ item }: any) => {
        return (
            <View>
                <View style={styles.spotContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate("SpotDetailScreen", { data: item })}>
                        <View style={styles.row}>
                            <Text style={styles.spotTitle}>{item.name}</Text>

                            <View style={{ flexDirection: 'row', columnGap: 10 }}>
                                <View style={{ backgroundColor: item.active ? '#DCFCE7' : "#FEF2F2", paddingVertical: 3, paddingHorizontal: 5, borderRadius: 15 }}>
                                    <Text style={{ color: item.active ? "#15803D" : "#B91C1C", fontSize: fontSizes.vSmallText }}>
                                        {item.active ? 'Active' : 'In-active'}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row', columnGap: 10 }}>
                                    <CustomIcon iconPath={require("../assets/icons/deleteIcon.png")} onPress={() => handleDelete(item.id)} />
                                    <CustomIcon iconPath={require(("../assets/icons/Edit--Streamline-Tabler.png"))} onPress={showToast} />
                                </View>

                            </View>

                        </View>
                        <Text style={styles.infoText}>ValidId: {item.validDiDirA}</Text>
                        <Text style={styles.infoText}>Event: {item.events}</Text>
                    </TouchableOpacity>

                </View>
                <View style={{ flex: 1, backgroundColor: colors.redBase }}>
                    <CustomToast type="success" message="deleted Successfull" />
                </View>

                <View style={styles.divider} />
            </View>
        );
    };
    
    return (
        <View style={{ marginBottom: "0%" }}>
            <FlatList
                data={data}
                keyExtractor={(_item, index) => index.toString()}
                renderItem={renderSpot}
                contentContainerStyle={{ padding: 10 }}
                onScroll={handleScroll}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    deleteContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 70, // Adjust based on your design
        height: '100%',
    },
    spotContainer: {
        paddingHorizontal: 20,
        flex: 1
    },
    statusBadge: {
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 12,
        fontSize: fontSizes.subheading,
        color: '#fff',
        fontWeight: 'bold',
    },
    deleteIcon: {
        padding: 10,
        tintColor: colors.redDarkest
    },
    divider: {
        height: 1,
        marginVertical: 15,
        backgroundColor: '#d4d4d4', // Light gray divider
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    spotTitle: {
        fontSize: fontSizes.heading,
        fontWeight: 'bold',
        color: '#333',
    },
    statusIcon: {
        marginLeft: 10,
    },
    infoText: {
        fontSize: fontSizes.subheading,
        color: '#666',
        marginBottom: 5,
    },
});

export default SpotsDataByTypeComponent;
