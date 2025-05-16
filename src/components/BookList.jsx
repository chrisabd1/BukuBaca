import React, { useRef, useEffect } from 'react';
import { Animated, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';

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
    <TouchableOpacity onPress={() => onPressItem && onPressItem(item)}>
      <Animated.Text
        style={[
          styles.bookItem,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        • {item.title}
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
  bookItem: {
    fontSize: 16,
    paddingVertical: 8,
  },
});
