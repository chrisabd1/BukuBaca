import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import BookDetailsScreen from './src/screens/BookDetailsScreen';
import AboutScreen from './src/screens/AboutScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'BukuBaca' }} />
        <Stack.Screen name="BookDetails" component={BookDetailsScreen} options={{ title: 'Detail Buku' }} />
        <Stack.Screen name="About" component={AboutScreen} options={{ title: 'Tentang Aplikasi' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
