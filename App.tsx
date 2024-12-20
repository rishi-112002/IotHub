import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/reducer/Store';
import AppNavigation from './src/navigation/AppNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { MenuProvider } from 'react-native-popup-menu';
import Toast from 'react-native-toast-message';
import { InputProvider } from './src/contextApi/DataByConnectivity';
import { NetworkProvider } from './src/contextApi/NetworkContex';
import { ScrollProvider } from './src/contextApi/AnimationContext';
function App() {
  return (
    <Provider store={store}>
      <NetworkProvider>
        <ScrollProvider>
          <InputProvider>
            <NavigationContainer>
              <MenuProvider>
                <AppNavigation />
                <Toast />
              </MenuProvider>
            </NavigationContainer>
          </InputProvider>
        </ScrollProvider>
      </NetworkProvider>
    </Provider>
    // <ShowBottomSheet />
    // <ShowBottomSheet />
  );
}
export default App;
// import React, { useState } from 'react';
// import { Modal, Text, View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

// // Get the screen dimensions to position the tooltip more accurately
// const { width, height } = Dimensions.get('window');

// const Tooltip = ({ visible, text, targetX, targetY, onClose }) => {
//   return (
//     <Modal
//       transparent={true}
//       visible={visible}
//       animationType="fade"
//       onRequestClose={onClose}
//     >
//       <View style={styles.overlay}>
//         <View
//           style={[
//             styles.tooltipContainer,
//             { top: targetY + 10, left: targetX - 50 }, // Adjust tooltip position
//           ]}
//         >
//           {/* Tooltip Notch */}
//           <View style={styles.tooltipArrow} />

//           {/* Tooltip Content */}
//           <View style={styles.tooltipContent}>
//             <Text style={styles.tooltipText}>{text}</Text>
//           </View>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const App = () => {
//   const [isTooltipVisible, setIsTooltipVisible] = useState(false);
//   const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

//   // Handler to show the tooltip and capture the target's position
//   const showTooltip = (e) => {
//     const layout = e.nativeEvent.layout;
//     setTooltipPosition({
//       x: layout.x + layout.width / 2, // Center the tooltip horizontally
//       y: layout.y,
//     });
//     setIsTooltipVisible(true);
//   };

//   // Handler to hide the tooltip
//   const hideTooltip = () => {
//     setIsTooltipVisible(false);
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity
//         style={styles.target}
//         onLayout={showTooltip} // Capture the layout (position) of the target element
//         onPress={hideTooltip}  // Hide tooltip on press
//       >
//         <Text style={styles.targetText}>Press Me</Text>
//       </TouchableOpacity>

//       <Tooltip
//         visible={isTooltipVisible}
//         text="This is a custom tooltip with a notch!"
//         targetX={tooltipPosition.x}
//         targetY={tooltipPosition.y}
//         onClose={hideTooltip}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   target: {
//     padding: 10,
//     backgroundColor: '#007bff',
//     borderRadius: 5,
//   },
//   targetText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   overlay: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   tooltipContainer: {
//     position: 'absolute',
//     alignItems: 'center',
//   },
//   tooltipArrow: {
//     width: 0,
//     height: 0,
//     borderLeftWidth: 6,
//     borderRightWidth: 6,
//     borderTopWidth: 8,
//     borderLeftColor: 'transparent',
//     borderRightColor: 'transparent',
//     borderTopColor: '#333', // Tooltip arrow color (matches the tooltip background)
//     marginBottom: 5,
//   },
//   tooltipContent: {
//     backgroundColor: '#333',
//     padding: 10,
//     borderRadius: 5,
//     maxWidth: width - 50, // Prevent overflow
//   },
//   tooltipText: {
//     color: '#fff',
//     fontSize: 14,
//   },
// });

// export default App;
