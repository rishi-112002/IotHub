
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/reducer/Store';
import AppNavigation from './src/navigation/AppNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { MenuProvider } from 'react-native-popup-menu';
import Toast from 'react-native-toast-message';

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MenuProvider>
          <AppNavigation />
          <Toast />
        </MenuProvider>
      </NavigationContainer>
    </Provider>
  );
}
export default App;
