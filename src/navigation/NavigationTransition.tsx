import { Easing } from 'react-native-reanimated';

export const slideFromRight = {
    gestureDirection: 'horizontal',
    cardStyleInterpolator: ({current, layouts}: any) => {
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
          duration: 400,
          easing: Easing.ease, // Apply easing to the timing animation
        },
      },
      close: {
        animation: 'timing',
        config: {
          duration: 400,
          easing: Easing.ease,
        },
      },
    },
  };

export const collapseExpand = {
  gestureDirection: 'horizontal',
  cardStyleInterpolator: ({ current, next, layouts }) => {
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
