import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default function EditBookScreen({ route, navigation }) {
  const { book } = route.params;
  const [title, setTitle] = useState(book.title);
  const [image, setImage] = useState(book.image || '');
  const [detail, setDetail] = useState(book.detail || '');

  const onUpdateBook = async () => {
    if (title.trim() === '') {
      alert('Judul buku harus diisi');
      return;
    }
    try {
      await firestore().collection('books').doc(book.id).update({
        title: title.trim(),
        image: image.trim(),
        detail: detail.trim(),
      });
      navigation.goBack();
    } catch (error) {
      Alert.alert('Gagal update buku', error.message);
    }
  };

  const onDeleteBook = () => {
    Alert.alert(
      'Konfirmasi',
      'Apakah Anda yakin ingin menghapus buku ini?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: async () => {
            try {
              await firestore().collection('books').doc(book.id).delete();
              navigation.goBack();
            } catch (error) {
              Alert.alert('Gagal hapus buku', error.message);
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Edit Buku</Text>

      <TextInput
        style={styles.input}
        placeholder="Judul buku"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="URL gambar (optional)"
        value={image}
        onChangeText={setImage}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Detail buku (optional)"
        value={detail}
        onChangeText={setDetail}
        multiline
        numberOfLines={4}
      />

      <Button title="Update Buku" onPress={onUpdateBook} />

      <View style={{ marginTop: 20 }}>
        <Button title="Hapus Buku" color="red" onPress={onDeleteBook} />
      </View>
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
