// src/components/BookList.js
import React from 'react';
import { FlatList, Text, StyleSheet } from 'react-native';

export default function BookList({ books }) {
  return (
    <FlatList
      data={books}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Text style={styles.bookItem}>• {item.title}</Text>
      )}
    />
  );
}

const styles = StyleSheet.create({
  bookItem: {
    fontSize: 16,
    paddingVertical: 4,
  },
});
