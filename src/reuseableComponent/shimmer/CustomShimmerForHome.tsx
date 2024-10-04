import React from 'react';
import { StyleSheet, View } from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import colors from '../../assets/color/colors';

function CustomShimmerForHome({ height = 100, width = '100%', borderRadius = 10 }) {
    return (
        <ShimmerPlaceholder
            style={[styles.shimmer, { height, width, borderRadius }]}
            shimmerColors={[colors.white, colors.yellowlight, colors.yellowLightest]}
        />
    );
}

const styles = StyleSheet.create({
    shimmer: {
        marginVertical: 5,
    },
});


export default CustomShimmerForHome;
