import React from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Card from '../reuseableComponent/card/CustomCard';
import fontSizes from '../assets/fonts/FontSize';
import { Swipeable } from 'react-native-gesture-handler';
import colors from '../assets/color/colors';

function SpotsDataByTypeComponent(props: { data: any }) {
    const { data } = props;
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
                },
                {
                    text: 'OK',
                    onPress: () => {
                        console.log("hello form delete") // Call the delete function passed from the parent
                    },
                },
            ],
            { cancelable: false }
        );
    };

    const renderSpot = ({ item }: any) => {
        return (
            <Swipeable
                renderRightActions={() => renderRightActions(item.id)} // Assume each item has a unique id
            >
                <View style={{ flex: 1 }}>
                    <Card>
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
