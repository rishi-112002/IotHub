import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../assets/color/colors';
import fontSizes from '../assets/fonts/FontSize';
import Card from '../reuseableComponent/card/CustomCard';

type EventLogProps = {
    item: any;
};

function EventLogsList(props: { data: any; setModal: any; setRequestData: any }) {
    const { data, setModal, setRequestData } = props;

    const onInfoClick = (request: any) => {
        setModal(true);
        setRequestData(request);
    };

    const renderEventLog = ({ item }: EventLogProps) => {
        return (
            <Card>
                <View>
                    <View style={styles.spotInfo}>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={styles.spotTitle}>
                                {item.name.length > 25 ? `${item.name.substring(0, 25)}..` : item.name}
                            </Text>
                            <View style={styles.detailsContainer}>
                                <Text style={styles.detailText}>Details:</Text>
                                <TouchableOpacity style={styles.detailIcon} onPress={() => onInfoClick(item.details)}>
                                    <MaterialIcons name="info-outline" size={24} color={colors.blueDarkest} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Text style={styles.typeText}>Type: {item.type}</Text>
                        <Text style={styles.createdAt}>
                            Created At: {new Date(item.createdAt).toLocaleDateString()}
                        </Text>
                        <View style={styles.messageIdContainer}>
                            <Text style={styles.messageText}>Message ID: </Text>
                            <Text style={styles.messageId}>{item.id}</Text>
                        </View>
                    </View>
                </View>
            </Card>
        );
    };

    return (
        <View style={styles.listContainer}>
            {data && data.length > 0 ? (
                <FlatList
                    data={data}
                    keyExtractor={(_item, index) => index.toString()}
                    renderItem={renderEventLog}
                    contentContainerStyle={styles.flatListContent}
                />
            ) : (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No Event Logs</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
        padding: 10,
        backgroundColor: colors.backgroundColor,
    },
    flatListContent: {
        paddingBottom: 10,
    },

    spotInfo: {
        flexDirection: 'column',
    },
    spotTitle: {
        fontSize: fontSizes.subheading,
        color: colors.darkblack,
        fontWeight: 'bold',
        marginBottom: 5,
        textTransform: 'capitalize',
    },
    typeText: {
        fontSize: fontSizes.text,
        color: colors.blueDarkest,
        marginBottom: 5,
        fontStyle: 'italic',
    },
    createdAt: {
        fontSize: fontSizes.text,
        color: "gray",
        marginBottom: 10,
    },
    detailsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: "auto",
    },
    detailText: {
        marginLeft: "auto",
        fontSize: fontSizes.text,
        color: colors.darkblack,
        fontWeight: '600',
    },
    detailIcon: {
        marginLeft: 5,
    },
    messageIdContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    messageText: {
        fontSize: fontSizes.text,
        color: colors.darkblack,
        fontWeight: '600',
    },
    messageId: {
        fontSize: fontSizes.text,
        color: colors.blueDarkest,
        fontWeight: '600',
        marginLeft: 5,
    },
  
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: fontSizes.subheading,
        color: 'gray',
    },
});

export default EventLogsList;
