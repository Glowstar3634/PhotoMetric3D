import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { UserProvider } from './app/UserContext';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { registerRootComponent } from 'expo';
import * as Font from 'expo-font';

import Start from './app/start';
import Home from './app/home';

async function loadFonts() {
  await Font.loadAsync({
    'antoutline': require('@ant-design/icons-react-native/fonts/antoutline.ttf'),
    'antfill': require('@ant-design/icons-react-native/fonts/antfill.ttf'),
  });
}

const Stack = createStackNavigator();  

export default function App() {

  React.useEffect(() => {
    loadFonts();
  }, []);

  return (
    <UserProvider>
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName="start" screenOptions={{
          headerShown: false,
          gestureEnabled: false
        }}>
          <Stack.Screen name="start" component={Start} />
          <Stack.Screen name="home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}