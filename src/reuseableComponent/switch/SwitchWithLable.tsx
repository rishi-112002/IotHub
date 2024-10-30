import React, {useCallback, memo} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Animated} from 'react-native';

type CustomSwitchProps = {
  value: boolean; // State to determine if the switch is active
  label: string; // Text label to display next to the switch
  onChangeValue: (value: boolean) => void; // Callback function triggered on switch toggle
};

const SwitchWithLabel: React.FC<CustomSwitchProps> = memo(
  ({value, label: label, onChangeValue}) => {
    // Memoize the toggle handler to avoid re-creating it on each render
    const handleToggle = useCallback(() => {
      onChangeValue(!value);
    }, [value, onChangeValue]);

    // Memoize styles
    const switchStyle = value ? styles.switchActive : styles.switchInactive;
    const containerStyle = value ? styles.active : styles.inactive;

    return (
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <TouchableOpacity
          style={[styles.switchContainer, containerStyle]}
          onPress={handleToggle}
          activeOpacity={0.8}>
          <Animated.View style={[styles.switch, switchStyle]} />
        </TouchableOpacity>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  label: {
    fontSize: 16,
    color: '#333', // Text color
    fontWeight: '500',
  },
  switchContainer: {
    width: 50,
    height: 26,
    borderRadius: 13,
    padding: 3,
    justifyContent: 'center',
  },
  switch: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  inactive: {
    backgroundColor: '#E8EBF3', // Inactive state background
  },
  active: {
    backgroundColor: '#4CAF50', // Active state background
  },
  switchInactive: {
    backgroundColor: '#979EC2',
    transform: [{translateX: 0}],
  },
  switchActive: {
    backgroundColor: '#fff',
    transform: [{translateX: 24}], // Move to the right when active
  },
});

export default SwitchWithLabel;
