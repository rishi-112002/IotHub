import React, { useCallback, memo } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { ComponentStyles } from '../../styles/ComponentStyles';
import { TextStyles } from '../../styles/TextStyles';
import { ContainerStyles } from '../../styles/ContainerStyles';

type CustomSwitchProps = {
  value: boolean; // State to determine if the switch is active
  label: string; // Text label to display next to the switch
  onChangeValue: (value: boolean) => void; // Callback function triggered on switch toggle
};

const SwitchWithLabel: React.FC<CustomSwitchProps> = memo(
  ({ value, label: label, onChangeValue }) => {
    // Memoize the toggle handler to avoid re-creating it on each render
    const { styles } = ComponentStyles();
    const { textStyles } = TextStyles();
    const { containerStyles } = ContainerStyles();
    const handleToggle = useCallback(() => {
      onChangeValue(!value);
    }, [value, onChangeValue]);

    // Memoize styles
    const switchStyle = value ? styles.switchActive : styles.switchInactive;
    const containerStyle = value ? containerStyles.containerActive : containerStyles.containerInactive;

    return (
      <View style={containerStyles.switchContainer}>
        <Text style={textStyles.switchLabel}>{label}</Text>
        <TouchableOpacity
          style={[containerStyles.switchSubContainer, containerStyle]}
          onPress={handleToggle}
          activeOpacity={0.8}>
          <Animated.View style={[styles.switch, switchStyle]} />
        </TouchableOpacity>
      </View>
    );
  },
);


export default SwitchWithLabel;
