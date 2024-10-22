/* eslint-disable react-hooks/exhaustive-deps */
// src/hooks/useFadeAnimation.ts
import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

const useFadeAnimation = (duration: number = 500) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration,
            useNativeDriver: true,
        }).start();
    }, [duration]);

    return fadeAnim;
};

export default useFadeAnimation;
