import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

export default function FormScreen({ navigation, route }) {
  const [bookTitle, setBookTitle] = useState('');
  const [bookImage, setBookImage] = useState('');
  const [bookDetail, setBookDetail] = useState('');

  const onAddBook = () => {
    if (bookTitle.trim() === '') {
      alert('Judul buku harus diisi');
      return;
    }

    route.params?.addBook({
      title: bookTitle,
      image: bookImage.trim(),
      detail: bookDetail.trim(),
    });

    // Clear form
    setBookTitle('');
    setBookImage('');
    setBookDetail('');

    navigation.navigate('HomeStack', { screen: 'Home' });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Tambah Buku Baru</Text>

      <TextInput
        style={styles.input}
        placeholder="Masukkan judul buku"
        value={bookTitle}
        onChangeText={setBookTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Masukkan URL gambar (optional)"
        value={bookImage}
        onChangeText={setBookImage}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Masukkan detail buku (optional)"
        value={bookDetail}
        onChangeText={setBookDetail}
        multiline
        numberOfLines={4}
      />

      <Button title="Tambah Buku" onPress={onAddBook} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flexGrow: 1, 
    padding: 24, 
    backgroundColor: '#f0f4f8', 
    justifyContent: 'center',
  },
  title: { 
    fontSize: 22, 
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
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
});
