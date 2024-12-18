import { StackNavigationOptions } from '@react-navigation/stack';
import { Easing } from 'react-native-reanimated';

export const slideFromRight: StackNavigationOptions = {
  gestureDirection: 'horizontal',
  cardStyleInterpolator: ({ current, layouts }: any) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0], // Starts from the right
            }),
          },
        ],
      },
    };
  },
  transitionSpec: {
    open: {
      animation: 'timing',
      config: {
        duration: 300,
        easing: Easing.ease, 
      },
    },
    close: {
      animation: 'timing',
      config: {
        duration: 200,
        easing: Easing.ease,
      },
    },
  },
};

export const collapseExpand = {
  gestureDirection: 'horizontal',
  cardStyleInterpolator: ({ current }: any) => {
    const progress = current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0.9], // Collapse to 90% of original size
      extrapolate: 'clamp',
    });

    return {
      cardStyle: {
        transform: [
          { scale: progress }, // Apply scaling transform
        ],
      },
    };
  },
  transitionSpec: {
    open: {
      animation: 'timing',
      config: {
        duration: 300,
        easing: Easing.ease,
      },
    },
    close: {
      animation: 'timing',
      config: {
        duration: 300,
        easing: Easing.ease,
      },
    },
  },
};
