
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/reducer/Store';
import AppNavigation from './src/navigation/AppNavigation';
import { NavigationContainer } from '@react-navigation/native';
function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </Provider>

  );
}
export default App;
