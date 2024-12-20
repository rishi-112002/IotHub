import React, { createContext, useState } from 'react';
import { Animated } from 'react-native';

// Define the context type
interface ScrollContextType {
    scrollY: Animated.Value;
    translateY: Animated.AnimatedInterpolation<number>;
    setScrollY: (value: Animated.Value) => void;
    diffClamp: Animated.AnimatedDiffClamp<number>;
    searchBarTranslate: Animated.AnimatedInterpolation<number>;
    headerTranslate: Animated.AnimatedInterpolation<number>;
}


// Create the context with default values
export const ScrollContext = createContext<ScrollContextType>({
    scrollY: new Animated.Value(0),
    diffClamp: new Animated.Value(0),
    translateY: new Animated.Value(0).interpolate({
        inputRange: [0, 200],
        outputRange: [0, 140],
        extrapolate: 'clamp',
    }),
    headerTranslate: new Animated.Value(0).interpolate({
        inputRange: [0, 200],
        outputRange: [0, -140],
        extrapolate: 'clamp',
    }),
    searchBarTranslate: new Animated.Value(0).interpolate({
        inputRange: [0, 200],
        outputRange: [0, -200],
        extrapolate: 'clamp',
    }),
    setScrollY: () => { },
});

// Create a provider component
export const ScrollProvider = (props: { children: React.ReactNode }) => {
    const { children } = props;

    // State for `scrollY`
    const [scrollY] = useState(new Animated.Value(0));

    // Diff clamp to limit the scroll values
    const diffClamp = Animated.diffClamp(scrollY, 0, 100);

    // Compute animations based on diffClamp
    const translateY = diffClamp.interpolate({
        inputRange: [0, 200],
        outputRange: [0, 140],
        extrapolate: 'clamp',
    });

    const headerTranslate = diffClamp.interpolate({
        inputRange: [0, 200],
        outputRange: [0, -140],
        extrapolate: 'clamp',
    });

    const searchBarTranslate = diffClamp.interpolate({
        inputRange: [0, 200],
        outputRange: [0, -200],
        extrapolate: 'clamp',
    });

    return (
        <ScrollContext.Provider
            value={{
                scrollY,
                translateY,
                setScrollY: () => { }, // Currently unused, can be updated later if needed
                diffClamp,
                headerTranslate,
                searchBarTranslate,
            }}
        >
            {children}
        </ScrollContext.Provider>
    );
};
