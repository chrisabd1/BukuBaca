import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BookList from '../components/BookList';

export default function HomeScreen({ books = [], onBookPress }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daftar Buku yang Sudah Dibaca:</Text>
      <BookList books={books} onPressItem={onBookPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#f0f4f8' },
  title: { fontSize: 18, fontWeight: '600', marginBottom: 12 },
});
