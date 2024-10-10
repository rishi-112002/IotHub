import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../assets/color/colors';
import fontSizes from '../assets/fonts/FontSize';
import Card from '../reuseableComponent/card/CustomCard';

type EventLogProps = {
    item: any; // Prop type for each event log item
};

function EventLogsList(props: { data: any; setModal: any; setRequestData: any }) {
    const { data, setModal, setRequestData } = props; // Destructure props passed to the component

    // Function to handle info icon click - opens a modal and passes the selected request details
    const onInfoClick = (request: any) => {
        setModal(true); // Open the modal
        setRequestData(request); // Set request data to be used within the modal
    };

    // Function to render each event log item in the list
    const renderEventLog = ({ item }: EventLogProps) => {
        return (
            <Card> {/* Custom card to wrap event log details */}
                <View>
                    <View style={styles.spotInfo}>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={styles.spotTitle}>
                                {item.name.length > 25 ? `${item.name.substring(0, 25)}..` : item.name} {/* Shorten name if longer than 25 characters */}
                            </Text>
                            <View style={styles.detailsContainer}>
                                <Text style={styles.detailText}>Details:</Text>
                                <TouchableOpacity style={styles.detailIcon} onPress={() => onInfoClick(item.details)}> {/* Info icon click event */}
                                    <MaterialIcons name="info-outline" size={24} color={colors.blueDarkest} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Text style={styles.typeText}>Type: {item.type}</Text> {/* Display event log type */}
                        <Text style={styles.createdAt}>
                            Created At: {new Date(item.createdAt).toLocaleDateString()} {/* Format and display creation date */}
                        </Text>
                        <View style={styles.messageIdContainer}>
                            <Text style={styles.messageText}>Message ID: </Text>
                            <Text style={styles.messageId}>{item.id}</Text> {/* Display message ID */}
                        </View>
                    </View>
                </View>
            </Card>
        );
    };

    return (
        <View style={styles.listContainer}>
            {data && data.length > 0 ? ( // Check if data is available and render event logs
                <FlatList
                    data={data} // Data for event logs
                    keyExtractor={(_item, index) => index.toString()} // Key extractor for list items
                    renderItem={renderEventLog} // Function to render each event log
                    contentContainerStyle={styles.flatListContent} // Style for list content
                />
            ) : ( // If no data, show empty state
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No Event Logs</Text> {/* Empty state text */}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
        padding: 10,
        backgroundColor: colors.backgroundColor, // Background color for the container
    },
    flatListContent: {
        paddingBottom: 10, // Padding at the bottom of the list
    },
    spotInfo: {
        flexDirection: 'column', // Column layout for event log info
    },
    spotTitle: {
        fontSize: fontSizes.subheading, // Font size for event log title
        color: colors.darkblack,
        fontWeight: 'bold',
        marginBottom: 5,
        textTransform: 'capitalize',
    },
    typeText: {
        fontSize: fontSizes.text, // Font size for type text
        color: colors.blueDarkest,
        marginBottom: 5,
        fontStyle: 'italic',
    },
    createdAt: {
        fontSize: fontSizes.text,
        color: "gray", // Gray color for creation date
        marginBottom: 10,
    },
    detailsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: "auto", // Align details section to the right
    },
    detailText: {
        marginLeft: "auto",
        fontSize: fontSizes.text,
        color: colors.darkblack,
        fontWeight: '600',
    },
    detailIcon: {
        marginLeft: 5, // Margin for icon
    },
    messageIdContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    messageText: {
        fontSize: fontSizes.text, // Font size for message label
        color: colors.darkblack,
        fontWeight: '600',
    },
    messageId: {
        fontSize: fontSizes.text,
        color: colors.blueDarkest, // Color for message ID
        fontWeight: '600',
        marginLeft: 5,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center', // Center the empty state container
    },
    emptyText: {
        fontSize: fontSizes.subheading, // Font size for empty state text
        color: 'gray',
    },
});

export default EventLogsList;
