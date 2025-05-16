// App.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import BookList from './src/components/BookList';

export default function App() {
  const [bookTitle, setBookTitle] = useState('');
  const [booksRead, setBooksRead] = useState([
    { id: '1', title: 'Laskar Pelangi' },
  ]);

  const handleAddBook = () => {
    if (bookTitle.trim() !== '') {
      setBooksRead([
        ...booksRead,
        { id: Date.now().toString(), title: bookTitle },
      ]);
      setBookTitle('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📚 BukuBaca</Text>

      <TextInput
        style={styles.input}
        placeholder="Masukkan judul buku yang sudah dibaca"
        value={bookTitle}
        onChangeText={setBookTitle}
      />

      <Button title="Tambah Buku" onPress={handleAddBook} />

      <Text style={styles.subTitle}>Daftar Buku yang Sudah Dibaca:</Text>

      <BookList books={booksRead} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 60,
    backgroundColor: '#f0f4f8',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  subTitle: {
    fontSize: 18,
    marginTop: 24,
    marginBottom: 8,
    fontWeight: '600',
  },
});
