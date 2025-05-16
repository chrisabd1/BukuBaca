import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default function BookDetailsScreen({ route }) {
  const { book } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Detail Buku</Text>
      <Text style={styles.bookTitle}>{book.title}</Text>
      {book.image ? (
        <Image source={{ uri: book.image }} style={styles.image} resizeMode="contain" />
      ) : null}
      <Text style={styles.detail}>{book.detail}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 24, backgroundColor: '#f0f4f8', alignItems: 'center' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 16 },
  bookTitle: { fontSize: 20, marginBottom: 12 },
  image: { width: 200, height: 300, marginBottom: 16, borderRadius: 8, backgroundColor: '#ddd' },
  detail: { fontSize: 16, textAlign: 'center' },
});
