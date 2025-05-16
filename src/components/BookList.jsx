import React from 'react';
import { FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function BookList({ books, onPressItem }) {
  return (
    <FlatList
      data={books}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => onPressItem && onPressItem(item)}>
          <Text style={styles.bookItem}>• {item.title}</Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  bookItem: {
    fontSize: 16,
    paddingVertical: 8,
  },
});
