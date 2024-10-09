import React, { useRef } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Card from '../reuseableComponent/card/CustomCard';
import fontSizes from '../assets/fonts/FontSize';
import { Swipeable } from 'react-native-gesture-handler';
import colors from '../assets/color/colors';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootState, store } from '../reducer/Store';
import { DeleteSpot } from '../reducer/deleteSpot/DeleteSpotAction';
import { useSelector } from 'react-redux';
import { SpotsDataByType } from '../reducer/SpotsDataByType/SpotsDataByTypeAction';
import { AppNavigationParams } from '../navigation/NavigationStackList';

function SpotsDataByTypeComponent(props: { data: any, onPress: any, type: string }) {

    const url = useSelector((state: RootState) => state.authentication.baseUrl);
    const buCode = useSelector((state: RootState) => state.authentication.buCode);
    const token = useSelector((state: RootState) => state.authentication.token);
    const navigation = useNavigation<NavigationProp<AppNavigationParams>>();

    const { data, onPress, type } = props;

    // Create a ref for each swipeable item
    const swipeableRef = useRef<any>(null);

    const renderRightActions = (id: string) => {
        return (
            <View style={styles.deleteContainer}>
                <MaterialIcons
                    name="delete"
                    size={30}
                    color={colors.redDarkest}
                    onPress={() => handleDelete(id)}
                    style={styles.deleteIcon}
                />
            </View>
        );
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
                        if (swipeableRef.current) {
                            swipeableRef.current.close(); // Close the swipe when cancel is clicked
                        }
                    },
                },
                {
                    text: 'OK',
                    onPress: () => {
                        // Dispatch the delete action and wait for it to resolve
                        store.dispatch(DeleteSpot({ baseUrl: url, id: id, bucode: buCode, token: token }))
                            .then((response) => {
                                console.log("response", response)
                                // After successful deletion, refetch the spot data
                                store.dispatch(SpotsDataByType({ baseUrl: url, spotType: type, token: token, buCode: buCode }));

                            })
                            .catch((error) => {
                                // Handle any error from the delete operation
                                Alert.alert("Error", "Failed to delete the spot. Please try again.");
                            });
                    },
                },
            ],
            { cancelable: false }
        );
    };

    const renderSpot = ({ item }: any) => {
        return (
            <Swipeable
                ref={swipeableRef} // Assign the ref to the Swipeable component
                renderRightActions={() => renderRightActions(item.id)} // Assume each item has a unique id
            >
                <View style={{ flex: 1 }}>
                    <Card>
                        <TouchableOpacity onPress={() => navigation.navigate("SpotDetailScreen", { data: item, onPress: onPress })}>
                            <View style={styles.row}>
                                <Text style={styles.spotTitle}>{item.name}</Text>
                                <MaterialIcons
                                    name="circle"
                                    size={14}
                                    color={item.active ? 'green' : 'red'}
                                    style={styles.statusIcon}
                                />
                            </View>
                            <Text style={styles.infoText}>ValidId: {item.validDiDirA}</Text>
                            <Text style={styles.infoText}>Event: {item.events}</Text>
                        </TouchableOpacity>
                    </Card>
                </View>
            </Swipeable>
        );
    };

    return (
        <View style={{ marginBottom: "0%" }}>
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
    deleteContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 70, // Adjust based on your design
        height: '100%',
    },
    deleteIcon: {
        padding: 10,
        tintColor: colors.redDarkest
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
