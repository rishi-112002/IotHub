import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Text } from 'react-native';
import colors from '../../assets/color/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import fontSizes from '../../assets/fonts/FontSize';
import { IconName, Strings } from '../../assets/constants/Lable';

const SuccessLoader = () => {
    const circleScale = useRef(new Animated.Value(0)).current;
    const checkmarkOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // First, scale up the circle
        Animated.sequence([
            Animated.timing(circleScale, {
                toValue: 1, // Scale to normal size
                duration: 200,
                useNativeDriver: true,
            }),
            // Then fade in the checkmark
            Animated.timing(checkmarkOpacity, {
                toValue: 1, // Fully visible
                duration: 50,
                useNativeDriver: true,
            }),
        ]).start();
    }, [circleScale, checkmarkOpacity]);

    return (
        <View style={styles.container}>
            {/* Animated Circle */}
            <Animated.View style={[styles.circle, { transform: [{ scale: circleScale }] }]}>
                {/* Animated Checkmark */}
                <Animated.View style={{ opacity: checkmarkOpacity }}>
                    <Icon name={IconName.CHECK} size={30} color={colors.greenDarkest} />
                </Animated.View>
            </Animated.View>
            <Text style={{ color: colors.blueDarkest, fontSize: fontSizes.text, fontWeight: "500" }}>
             {Strings.SUCCESS}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle: {
        width: 70,
        height: 70,
        borderRadius: 50, // Makes the view a circle
        borderWidth: 5,
        borderColor: colors.blueDarkest,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SuccessLoader;
