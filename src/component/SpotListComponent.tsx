import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import colors from '../assets/color/colors';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import fontSizes from '../assets/fonts/FontSize';
import CustomShimmerForHome from '../reuseableComponent/shimmer/CustomShimmerForHome'; // Shimmer effect for loading placeholders
import { AppNavigationParams } from '../navigation/NavigationStackList'; // Navigation types
import CustomMenu from '../reuseableComponent/menuOptions/CustomMenu'; // Custom menu component
import { useSelector } from 'react-redux'; // Redux for accessing state
import { RootState } from '../reducer/Store'; // Root state for redux

type init = {
    item: any, // Type definition for FlatList item
};

// Main component
function SpotList(props: { data: any }) {
    const { data } = props; // Destructuring data from props
    const [loading] = useState(true); // Initial loading state
    const navigation = useNavigation<NavigationProp<AppNavigationParams>>(); // Navigation hook
    const fadeAnim = new Animated.Value(0); // Animation state for fade-in effect
    const baseUrls = useSelector((state: RootState) => state.authentication.baseUrl); // Accessing base URL from Redux store

    // Function to trigger fade-in animation
    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    // Function to render each item in the FlatList
    const renderSpot = ({ item }: init) => {
        let weightDisplay;
        
        // Handling different display cases for weight
        if (item.weight !== null) {
            weightDisplay = (
                <Text style={[styles.weightText, { color: item.weightStable ? 'green' : 'red' }]}>
                    {item.weight}
                </Text>
            );
        } else if (item.weightError) {
            weightDisplay = (
                <Text style={styles.errorText}>
                    {item.weightError}
                </Text>
            );
        } else {
            weightDisplay = <Text style={styles.noInfoText}>No Weight Info</Text>;
        }

        // Triggering fade-in animation when rendering each spot
        fadeIn();

        return (
            <Animated.View style={[styles.spotContainer, { opacity: fadeAnim }]}>
                {!loading ? (
                    // Shimmer loading placeholders when data is not ready
                    <View>
                        <CustomShimmerForHome width="80%" height={20} />
                        <CustomShimmerForHome width="30%" height={15} />
                        <CustomShimmerForHome width="50%" height={15} />
                        <CustomShimmerForHome width="40%" height={15} />
                        <CustomShimmerForHome width="60%" height={15} />
                    </View>
                ) : (
                    // Touchable to navigate to SpotDetailScreen on press
                    <TouchableOpacity onPress={() => navigation.navigate("SpotDetailScreen", { data: item })}>
                        <View style={styles.contentContainer}>
                            <View style={styles.infoContainer}>
                                <Text style={styles.spotTitle}>
                                    {item.name?.length > 14 ? item.name.substring(0, 14) : item.name}
                                </Text>
                            </View>
                            <View style={{ flexDirection: "row", columnGap: 40 }}>
                                {/* Connectivity status display */}
                                <View style={{ backgroundColor: item.active ? '#DCFCE7' : "#FEF2F2", paddingVertical: 3, paddingHorizontal: 5, borderRadius: 15 }}>
                                    <Text style={{ color: item.active ? "#15803D" : "#B91C1C", fontSize: fontSizes.vSmallText }}>
                                        {item.active ? 'Connected' : 'Not-Connected'}
                                    </Text>
                                </View>
                                {/* Custom menu for options */}
                                <CustomMenu baseUrl={baseUrls} spotName={item.name} />
                            </View>
                        </View>
                        <View style={styles.section}>
                            {/* Display weight or appropriate message */}
                            <Text style={styles.label}>Weight: </Text>
                            {weightDisplay}
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 4, columnGap: 20 }}>
                            {/* Delayed status display */}
                            <View style={{ borderColor: item.delayed ? "#FEF2F2" : '#DCFCE7', borderWidth: 2, paddingHorizontal: 3, paddingVertical: 3, borderRadius: 15 }}>
                                <Text style={[styles.details, { color: item.delayed ? "#B91C1C" : "#15803D" }]}>
                                    {item.delayed ? 'Delayed' : 'On Time'}
                                </Text>
                            </View>

                            {/* Current state display */}
                            <View style={{ borderColor: item.currentState ? '#DCFCE7' : "#FEF2F2", borderWidth: 2, paddingHorizontal: 3, paddingVertical: 3, borderRadius: 15 }}>
                                <Text style={{ color: item.currentState ? "#15803D" : "#B91C1C", fontSize: fontSizes.vSmallText }}>{item.currentState || 'No State Info'}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}

                {/* Divider between items */}
                <View style={styles.divider} />
            </Animated.View>
        );
    };

    return (
        // FlatList to render the list of spots
        <View style={{ paddingBottom: 20 }}>
            <FlatList
                data={data} // Data passed as props
                keyExtractor={(_item, index) => index.toString()} // Key extractor for list
                renderItem={renderSpot} // Render function for each spot
            />
        </View>
    );
}

const styles = StyleSheet.create({
    // Styles for the spot container
    spotContainer: {
        paddingHorizontal: 20,
    },
    // section  styling
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 4,
    },
    // Content layout styling
    contentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        columnGap: 20,
    },
    // Info section styling
    infoContainer: {
        flex: 1,
    },
    // Spot title styling
    spotTitle: {
        fontSize: fontSizes.heading,
        color: colors.darkblack,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    // Connectivity row styling
    connectivityRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    // Label text styling
    label: {
        fontSize: fontSizes.text,
        color: "gray",
        fontWeight: '600',
    },
    // General details text styling
    details: {
        fontSize: fontSizes.vSmallText,
        color: colors.blueDarkest,
        fontWeight: '600',
    },
    // Weight text styling
    weightText: {
        fontSize: fontSizes.text,
        fontWeight: 'bold',
    },
    // Error text styling for weight errors
    errorText: {
        color: 'red',
        fontSize: fontSizes.text,
    },
    // Text styling when no info is available
    noInfoText: {
        fontSize: fontSizes.text,
        color: 'gray',
    },
    // Divider between items
    divider: {
        height: 1,
        marginVertical: 15,
        backgroundColor: '#d4d4d4', // Light gray divider
    },
});

export default SpotList;
