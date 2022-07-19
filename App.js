import React, { useState } from 'react';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import cfgStore, { persistor } from "./store/ConfigureStore";
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from "./src/Screens/SplashScreen";
import CatListScreen from './src/Screens/CatListScreen';
import EditDetail from './src/Screens/EditDetail';
import AddCatDetail from './src/Screens/AddCatDetail';
import TrafficDemo from './src/Screens/TrafficDemo';
import SignUpScreen from './src/Screens/SignUpScreen';
import LoginScreen from './src/Screens/LoginScreen'

import { NavigationContainer } from '@react-navigation/native';

const RootStack = createStackNavigator();

const StackNav =() => {
  return (
    <NavigationContainer independent={true} >
      <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name="SplashScreen" component={SplashScreen} />
        <RootStack.Screen name="CatListScreen" component={CatListScreen} />
        <RootStack.Screen name="EditDetail" component={EditDetail} />
        <RootStack.Screen name="AddCatDetail" component={AddCatDetail} />
        <RootStack.Screen name="TrafficDemo" component={TrafficDemo} />
        <RootStack.Screen name="SignUpScreen" component={SignUpScreen}/>
        <RootStack.Screen name="LoginScreen" component={LoginScreen}/>
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const App = () => {
  const store = cfgStore();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StackNav />
      </PersistGate>
    </Provider>
  )
}

export default App;
