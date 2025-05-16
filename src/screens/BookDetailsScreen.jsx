import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function BookDetailsScreen({ route }) {
  const { book } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detail Buku</Text>
      <Text style={styles.bookTitle}>{book.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f4f8' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 16 },
  bookTitle: { fontSize: 20 },
});
