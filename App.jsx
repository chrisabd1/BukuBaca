import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

export default function App() {
  const [bookTitle, setBookTitle] = useState('');

  const [booksRead, setBooksRead] = useState([
    { id: '1', title: 'Laskar Pelangi' }, // Example book already read
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

      <FlatList
        data={booksRead}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.bookItem}>• {item.title}</Text>}
      />
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
  bookItem: {
    fontSize: 16,
    paddingVertical: 4,
  },
});
