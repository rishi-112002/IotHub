import React, {useEffect, useCallback, useImperativeHandle} from 'react';
import { Text } from 'react-native';
import {View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const {height: SCREEN_HEIGHT} = Dimensions.get('screen'); // Ensure SCREEN_HEIGHT is defined

type BottomSheetProp = {
  children?: React.ReactNode;
  onClose: () => void; // onClose prop to handle close button click
};
export type BottomSheetRefProp = {
  scrollTo: (destination: number) => void;
  isActive: () => boolean;
};

const BottomSheet = React.forwardRef<BottomSheetProp, BottomSheetRefProp>(
  ({children, onClose}, ref) => {
    const MAX_translateY = -SCREEN_HEIGHT + 50;
    const MIN_translateY = SCREEN_HEIGHT / 3; // Minimum scroll position to prevent scrolling too far
    const translateY = useSharedValue(0);
    const context = useSharedValue({y: 0});
    const active = useSharedValue(false);

    const scrollTo = useCallback(
      (destination: number) => {
        'worklet';
        active.value = destination !== 0;
        translateY.value = withSpring(destination, {
          damping: 40,
          stiffness: 150,
        });
      },
      [active, translateY],
    );

    const isActive = useCallback(() => active.value, [active]);

    useImperativeHandle(ref, () => ({scrollTo, isActive}), [
      scrollTo,
      isActive,
    ]);

    const gesture = Gesture.Pan()
      .onStart(() => {
        context.value = {y: translateY.value};
      })
      .onUpdate(event => {
        translateY.value = event.translationY + context.value.y;
        translateY.value = Math.max(translateY.value, MAX_translateY);
        translateY.value = Math.min(translateY.value, 0); // Max translate Y is 0
      })
      .onEnd(() => {
        if (translateY.value > MIN_translateY) {
          scrollTo(0); // Close the sheet if it's dragged too high
        } else {
          scrollTo(MAX_translateY); // Open the sheet if it's dragged down
        }
      });

    useEffect(() => {
      scrollTo(MIN_translateY); // Start with sheet partially open
    }, [MIN_translateY, scrollTo]);

    const rBottomSheetStyle = useAnimatedStyle(() => {
      const borderRadius = interpolate(
        translateY.value,
        [MAX_translateY - 50, MAX_translateY],
        [25, 5],
        Extrapolation.CLAMP,
      );
      return {
        borderRadius,
        transform: [{translateY: translateY.value}],
      };
    });

    return (
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.container, rBottomSheetStyle]}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <View style={styles.line} />
          {children}
        </Animated.View>
      </GestureDetector>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
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
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 10,
    borderRadius: 25,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default BottomSheet;
