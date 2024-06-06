import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import { MyContextControllerProvider } from './src/index';
import MainNavigation from './routers/MainNavigation';
const App = () => {
  return (
    <MyContextControllerProvider>
        <NavigationContainer>
          <MainNavigation/>
        </NavigationContainer>
    </MyContextControllerProvider>
  );
}
export default App

