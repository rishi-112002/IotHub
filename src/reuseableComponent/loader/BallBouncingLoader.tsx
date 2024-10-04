import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet, Easing } from "react-native";
import colors from "../../assets/color/colors";

const SequentialBouncingLoader = () => {
    const bounce1 = useRef(new Animated.Value(0)).current;
    const bounce2 = useRef(new Animated.Value(0)).current;
    const bounce3 = useRef(new Animated.Value(0)).current;
    const bounce4 = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const bounceAnimation = (bounce: Animated.Value, delay: number) => {
            return Animated.sequence([
                Animated.timing(bounce, {
                    toValue: -15, // Ball moves up
                    duration: 300, // Faster speed
                    delay: delay,
                    easing: Easing.inOut(Easing.ease), // Smooth easing for wave-like motion
                    useNativeDriver: true,
                }),
                Animated.timing(bounce, {
                    toValue: 0, // Ball moves down
                    duration: 300, // Faster speed
                    easing: Easing.inOut(Easing.ease), // Smooth easing for wave-like motion
                    useNativeDriver: true,
                }),
            ]);
        };

        const startSequentialAnimation = () => {
            Animated.loop(
                Animated.stagger(100, [ // 100ms stagger to create the wave effect
                    bounceAnimation(bounce1, 0),
                    bounceAnimation(bounce2, 0),
                    bounceAnimation(bounce3, 0),
                    bounceAnimation(bounce4, 0),
                ])
            ).start();
        };

        startSequentialAnimation();

        return () => {
            bounce1.stopAnimation();
            bounce2.stopAnimation();
            bounce3.stopAnimation();
            bounce4.stopAnimation();
        };
    }, [bounce1, bounce2, bounce3, bounce4]);

    return (
        <View style={styles.loaderContainer}>
            <Animated.View style={[styles.ballFirst, { transform: [{ translateY: bounce1 }] }]} />
            <Animated.View style={[styles.ballSecound, { transform: [{ translateY: bounce2 }] }]} />
            <Animated.View style={[styles.ballThird, { transform: [{ translateY: bounce3 }] }]} />
            <Animated.View style={[styles.ballFour, { transform: [{ translateY: bounce4 }] }]} />
        </View>
    );
};

const styles = StyleSheet.create({
    loaderContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: "transparent",
    },
    ballFirst: {
        width: 15,
        height: 15,
        borderRadius: 7.5,
        backgroundColor: colors.blueLightest,

        marginHorizontal: 5,
    },
    ballFour: {
        width: 15,
        height: 15,
        borderRadius: 7.5,
        backgroundColor: colors.blueBase,
        marginHorizontal: 5,
    },
    ballSecound
        : {
        width: 15,
        height: 15,
        borderRadius: 7.5,
        backgroundColor: colors.blueLighter,
        marginHorizontal: 5,
    },
    ballThird: {
        width: 15,
        height: 15,
        borderRadius: 7.5,
        backgroundColor: colors.bluelight,
        marginHorizontal: 5,
    },
});

export default SequentialBouncingLoader;
