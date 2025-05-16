import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import firestore from '@react-native-firebase/firestore';

import HomeScreen from './src/screens/HomeScreen';
import BookDetailsScreen from './src/screens/BookDetailsScreen';
import FormScreen from './src/screens/FormScreen';
import AboutScreen from './src/screens/AboutScreen';
import EditBookScreen from './src/screens/EditBookScreen';

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
      <HomeStack.Screen
        name="EditBook"
        component={EditBookScreen}
        options={{ title: 'Edit Buku' }}
      />
    </HomeStack.Navigator>
  );
}

export default function App() {
  const [booksRead, setBooksRead] = useState([]);
  const navigationRef = useRef();

  // Fetch books from Firebase Firestore
  useEffect(() => {
    const unsubscribe = firestore()
      .collection('books')
      .onSnapshot(
        (querySnapshot) => {
          const books = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setBooksRead(books);
        },
        (error) => {
          console.error('Failed to fetch books:', error);
        }
      );

    return () => unsubscribe();
  }, []);

  const addBook = async (book) => {
    try {
      await firestore().collection('books').add({
        title: book.title,
        image: book.image || '',
        detail: book.detail || '',
      });
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
