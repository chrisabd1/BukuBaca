import React, { useRef, useEffect } from 'react';
import { Animated, FlatList, Text, StyleSheet, TouchableOpacity, View, Image } from 'react-native';

function AnimatedBookItem({ item, onPressItem }) {
  const fadeAnim = useRef(new Animated.Value(0)).current; // initial opacity 0
  const slideAnim = useRef(new Animated.Value(20)).current; // initial translateY 20

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <TouchableOpacity onPress={() => onPressItem && onPressItem(item)} style={styles.itemContainer}>
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.bookImage} />
      ) : (
        <View style={[styles.bookImage, styles.noImage]}>
          <Text style={styles.noImageText}>No Image</Text>
        </View>
      )}
      <Animated.Text
        style={[
          styles.bookItem,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        {item.title}
      </Animated.Text>
    </TouchableOpacity>
  );
}

export default function BookList({ books, onPressItem }) {
  return (
    <FlatList
      data={books}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <AnimatedBookItem item={item} onPressItem={onPressItem} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  bookImage: {
    width: 50,
    height: 70,
    borderRadius: 4,
    marginRight: 12,
    backgroundColor: '#ddd',
  },
  noImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImageText: {
    fontSize: 10,
    color: '#888',
  },
  bookItem: {
    fontSize: 16,
    flexShrink: 1,
  },
});
