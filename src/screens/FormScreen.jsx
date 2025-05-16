import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function FormScreen({ navigation, route }) {
  const [bookTitle, setBookTitle] = useState('');

  const onAddBook = () => {
    if (bookTitle.trim() !== '') {
      route.params?.addBook({ id: Date.now().toString(), title: bookTitle });
      setBookTitle('');
      navigation.navigate('HomeStack', { screen: 'Home' }); // navigate back to Home tab stack
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tambah Buku Baru</Text>
      <TextInput
        style={styles.input}
        placeholder="Masukkan judul buku"
        value={bookTitle}
        onChangeText={setBookTitle}
      />
      <Button title="Tambah Buku" onPress={onAddBook} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#f0f4f8', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
});
