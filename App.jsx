import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './src/screens/HomeScreen';
import BookDetailsScreen from './src/screens/BookDetailsScreen';
import FormScreen from './src/screens/FormScreen';
import AboutScreen from './src/screens/AboutScreen';

const HomeStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStackScreen({ books, onBookPress }) {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        children={(props) => (
          <HomeScreen {...props} books={books} onBookPress={onBookPress} />
        )}
        options={{ title: 'Daftar Buku' }}
      />
      <HomeStack.Screen
        name="BookDetails"
        component={BookDetailsScreen}
        options={{ title: 'Detail Buku' }}
      />
    </HomeStack.Navigator>
  );
}

export default function App() {
  const [booksRead, setBooksRead] = useState([]);
  const navigationRef = useRef();

  // Fetch books from mockapi.io
  useEffect(() => {
    fetch('https://68271fe3397e48c91318b0a9.mockapi.io/api/book')
      .then((res) => res.json())
      .then((data) => {
        setBooksRead(data);
      })
      .catch((err) => {
        console.error('Failed to fetch books:', err);
      });
  }, []);

  // Add book to mockapi.io via POST then update state
  const addBook = async (book) => {
    try {
      const response = await fetch('https://68271fe3397e48c91318b0a9.mockapi.io/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: book.title,
          image: book.image || '', // optional image, empty string if none
          detail: book.detail || '', // optional detail, empty string if none
        }),
      });
      const newBook = await response.json();
      setBooksRead((prev) => [...prev, newBook]);
    } catch (error) {
      console.error('Failed to add book:', error);
    }
  };

  return (
    <NavigationContainer ref={navigationRef}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'HomeStack') {
              iconName = 'book-outline';
            } else if (route.name === 'Form') {
              iconName = 'add-circle-outline';
            } else if (route.name === 'About') {
              iconName = 'information-circle-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="HomeStack"
          options={{ title: 'Home' }}
        >
          {() => (
            <HomeStackScreen
              books={booksRead}
              onBookPress={(book) =>
                navigationRef.current?.navigate('HomeStack', {
                  screen: 'BookDetails',
                  params: { book },
                })
              }
            />
          )}
        </Tab.Screen>

        <Tab.Screen
          name="Form"
          options={{ title: 'Tambah Buku' }}
        >
          {({ navigation }) => (
            <FormScreen navigation={navigation} route={{ params: { addBook } }} />
          )}
        </Tab.Screen>

        <Tab.Screen
          name="About"
          component={AboutScreen}
          options={{ title: 'Tentang' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
