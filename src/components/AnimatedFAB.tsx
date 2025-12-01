// src/components/AnimatedFAB.tsx
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { 
  useAnimatedStyle, 
  withSpring, 
  interpolate, 
  Extrapolate 
} from 'react-native-reanimated';

interface AnimatedFABProps {
  onPress: () => void;
  // We will pass the scroll offset value later if we want the shrinking effect
  // For now, let's just make it a bouncy button on press
}

export const AnimatedFAB = ({ onPress }: AnimatedFABProps) => {
  return (
    <Animated.View style={styles.container}>
      <TouchableOpacity 
        style={styles.button} 
        onPress={onPress}
        activeOpacity={0.8}
      >
        <Ionicons name="create-outline" size={28} color="#fff" />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    zIndex: 999,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF', // Brand color
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8, // Android shadow
  },
});