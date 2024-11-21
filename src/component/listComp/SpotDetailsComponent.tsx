import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../assets/color/colors';
import fontSizes from '../../assets/fonts/FontSize';

// This component takes 'spotData' as a prop and renders various details about a spot.
const SpotDetailsComponent = (props: { spotData: any }) => {
    const { spotData } = props;
    const {
        connectivity,
        weight,
        weightStable,
        weightError,
        di,
        currentState,
        delayed,
        weighmentProcess,
        readers,
    } = spotData; // Destructure data properties from spotData object

    return (
        // Wrapping the entire component inside ScrollView to handle long content with vertical scrolling
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContainer}>
            <View style={{ padding: 20 }}>
                
                {/* Connectivity Section */}
                <View style={styles.section}>
                    <View style={styles.row}>
                        <Text style={styles.sectionTitle}>Connectivity:</Text>
                        {/* If connectivity is available, display it; otherwise, show 'N/A' */}
                        <Text style={styles.sectionText}>{connectivity || 'N/A'}</Text>
                    </View>
                </View>

                {/* Weight Section */}
                <View style={styles.section}>
                    <View style={styles.row}>
                        <Text style={styles.sectionTitle}>Weight:</Text>
                        {/* Display weight if available, otherwise 'N/A' */}
                        <Text style={styles.sectionText}>{weight !== null ? weight : 'N/A'}</Text>
                    </View>
                </View>

                {/* Weight Stability Section */}
                <View style={styles.section}>
                    <View style={styles.row}>
                        <Text style={styles.sectionTitle}>Weight Stable:</Text>
                        {/* Conditionally render the weight stability status */}
                        <Text style={styles.statusText}>{weightStable ? 'Stable' : 'Not Stable'}</Text>
                        {/* If there's a weight error, display it */}
                        {weightError && (
                            <Text style={styles.errorText}>{`Error: ${weightError}`}</Text>
                        )}
                    </View>
                </View>

                {/* Digital Input (DI) Section */}
                <View style={styles.section}>
                    <View style={styles.row}>
                        <Text style={styles.sectionTitle}>Digital Input (DI):</Text>
                        {/* Display DI data or 'N/A' */}
                        <Text style={styles.sectionText}>{di || 'N/A'}</Text>
                    </View>
                </View>

                {/* Current State Section */}
                <View style={styles.section}>
                    <View style={styles.row}>
                        <Text style={styles.sectionTitle}>Current State:</Text>
                        {/* Display the current state of the spot */}
                        <Text style={styles.sectionText}>{currentState || 'N/A'}</Text>
                    </View>
                </View>

                {/* Delayed Status Section */}
                <View style={styles.section}>
                    <View style={styles.row}>
                        <Text style={styles.sectionTitle}>Delayed:</Text>
                        {/* Conditionally show whether the process is delayed or not */}
                        <Text style={styles.sectionText}>{delayed ? 'Yes' : 'No'}</Text>
                    </View>
                </View>

                {/* Weighment Process Section */}
                <View style={styles.section}>
                    <View style={styles.row}>
                        <Text style={styles.sectionTitle}>Weighment Process:</Text>
                        {/* If there is weighment process data, map through the array and display each process */}
                        {weighmentProcess && weighmentProcess.length > 0 ? (
                            weighmentProcess.map((process: any, index: number) => (
                                <View key={index} style={styles.row}>
                                    <Text style={styles.sectionText}>{process}</Text>
                                </View>
                            ))
                        ) : (
                            <View style={{ marginStart: 'auto' }}>
                                <Text style={styles.sectionText}>No weighment process</Text>
                            </View>
                        )}
                    </View>
                </View>
            </View>

            {/* Readers Section */}
            {readers && readers.length > 0 && (
                <Card>
                    <Text style={styles.sectionTitle}>Readers</Text>
                    {/* Iterate through the readers array and display the health status of each device */}
                    {readers.map((reader: any, index: number) => (
                        <View key={index} style={styles.readerContainer}>
                            {/* Conditionally render icon color based on health status */}
                            <MaterialIcons
                                name={reader.healthStatus === 'OUT_OF_SERVICE' ? 'error-outline' : 'check-circle'}
                                size={24}
                                color={reader.healthStatus === 'OUT_OF_SERVICE' ? colors.redDarkest : colors.greenDarkest}
                            />
                            <View>
                                <Text style={styles.readerText}>Device ID: {reader.deviceId}</Text>
                                <Text style={styles.readerText}>Health Status: {reader.healthStatus}</Text>
                            </View>
                        </View>
                    ))}
                </Card>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        paddingBottom: 30,
    },
    container: {
        flex: 1,
        backgroundColor: colors.white,
        padding: 15,
    },
    section: {
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: fontSizes.subheading,
        fontWeight: '600',
        color: colors.darkblack,
    },
    sectionText: {
        fontSize: fontSizes.text,
        color: '#333',
        textAlign: 'right',
        flex: 1,
    },
    statusText: {
        fontSize: fontSizes.text,
        color: colors.greenDarkest,
        flex: 1,
        textAlign: 'right'
    },
    errorText: {
        fontSize: fontSizes.text,
        color: colors.redDarkest,
        marginLeft: 10,
        flex: 1,
    },
    readerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    readerText: {
        marginLeft: 10,
        fontSize: fontSizes.text,
        color: '#555',
    },
});

export default SpotDetailsComponent;