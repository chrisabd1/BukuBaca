import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tentang BukuBaca</Text>
      <Text style={styles.content}>
        Aplikasi BukuBaca dibuat untuk membantu pengguna mencatat buku yang sudah dibaca secara mudah dan cepat.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f8',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  content: {
    fontSize: 16,
    textAlign: 'center',
  },
});
