import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../assets/color/colors';
import fontSizes from '../assets/fonts/FontSize';
import Card from '../reuseableComponent/card/CustomCard';

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
    } = spotData;

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContainer}>
            <View style={{ padding: 20 }}>
                <View style={styles.section}>
                    <View style={styles.row}>
                        <Text style={styles.sectionTitle}>Connectivity:</Text>
                        <Text style={styles.sectionText}>{connectivity || 'N/A'}</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={styles.row}>
                        <Text style={styles.sectionTitle}>Weight:</Text>
                        <Text style={styles.sectionText}>{weight !== null ? weight : 'N/A'}</Text>
                    </View>
                </View>
                <View style={styles.section}>
                    <View style={styles.row}>
                        <Text style={styles.sectionTitle}>Weight Stable:</Text>
                        <Text style={styles.statusText}>{weightStable ? 'Stable' : 'Not Stable'}</Text>
                        {weightError && (
                            <Text style={styles.errorText}>{`Error: ${weightError}`}</Text>
                        )}

                    </View>
                </View>

                <View style={styles.section}>
                    <View style={styles.row}>
                        <Text style={styles.sectionTitle}>Digital Input (DI):</Text>
                        <Text style={styles.sectionText}>{di || 'N/A'}</Text>
                    </View>
                </View>


                <View style={styles.section}>
                    <View style={styles.row}>
                        <Text style={styles.sectionTitle}>Current State:</Text>
                        <Text style={styles.sectionText}>{currentState || 'N/A'}</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={styles.row}>
                        <Text style={styles.sectionTitle}>Delayed:</Text>
                        <Text style={styles.sectionText}>{delayed ? 'Yes' : 'No'}</Text>
                    </View>
                </View>
                <View style={styles.section}>
                    <View style={styles.row}>
                        <Text style={styles.sectionTitle}>Weighment Process:</Text>

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
            {readers && readers.length > 0 && (
                <Card>
                    <Text style={styles.sectionTitle}>Readers</Text>
                    {readers.map((reader: any, index: number) => (
                        <View key={index} style={styles.readerContainer}>
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
