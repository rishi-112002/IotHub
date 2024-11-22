import React, { useEffect, useCallback, useImperativeHandle } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

type BottomSheetProp = {
  children?: React.ReactNode;
};
export type BottomSheetRefProp = {
  scrollTo: (destination: number) => void;
  isActive: () => boolean;
};

const BottomSheet = React.forwardRef<BottomSheetProp, BottomSheetRefProp>(
  ({ children }, ref) => {
    const MAX_translateY = -SCREEN_HEIGHT + 50;
    const MIN_translateY = -SCREEN_HEIGHT / 3; // Minimum scroll position to prevent scrolling too far
    const translateY = useSharedValue(0);
    const context = useSharedValue({ y: 0 });
    const active = useSharedValue(false);

    // Handle scrollTo function
    const scrollTo = useCallback(
      (destination: number) => {
        'worklet';
        active.value = destination !== 0;
        translateY.value = withSpring(destination, { damping: 40, stiffness: 150 }); // Smoother animation
      },
      [active, translateY],
    );

    const isActive = useCallback(() => active.value, [active]);

    useImperativeHandle(ref, () => ({ scrollTo, isActive }), [scrollTo, isActive]);

    // Gesture handling for dragging
    const gesture = Gesture.Pan()
      .onStart(() => {
        context.value = { y: translateY.value };
      })
      .onUpdate(event => {
        translateY.value = event.translationY + context.value.y;
        // Restrict the translation to within bounds
        translateY.value = Math.max(translateY.value, MAX_translateY); 
        translateY.value = Math.min(translateY.value, 0);  // Prevent dragging above the initial position
      })
      .onEnd(() => {
        if (translateY.value > MIN_translateY) {
          scrollTo(0);  // Scroll back to the initial position if the user releases above this threshold
        } else {
          scrollTo(MAX_translateY); // Otherwise, go to the maximum position
        }
      });

    useEffect(() => {
      scrollTo(MIN_translateY);  // Initial position on mount
    }, [scrollTo]);

    const rBottomSheetStyle = useAnimatedStyle(() => {
      const borderRadius = interpolate(
        translateY.value,
        [MAX_translateY + 50, MAX_translateY],
        [25, 5],
        Extrapolation.CLAMP,
      );
      return {
        borderRadius,
        transform: [{ translateY: translateY.value }],
      };
    });

    return (
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.container, rBottomSheetStyle]}>
          <View style={styles.line} />
          {children}
        </Animated.View>
      </GestureDetector>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    height: SCREEN_HEIGHT,
    width: '100%',
    position: 'absolute',
    top: SCREEN_HEIGHT / 1.5,
    backgroundColor: 'red',
    borderRadius: 25,
  },
  line: {
    width: 50,
    height: 5,
    alignSelf: 'center',
    marginVertical: 10,
    backgroundColor: 'gray',
    borderRadius: 10,
  },
});

export default BottomSheet;
