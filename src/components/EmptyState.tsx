// src/components/EmptyState.tsx
import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

interface EmptyStateProps {
  message: string;
}

export const EmptyState = ({ message }: EmptyStateProps) => {
  const animation = useRef<LottieView>(null);

  useEffect(() => {
    // Play the animation on mount
    animation.current?.play();
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: 200,
          height: 200,
          backgroundColor: 'transparent',
        }}
        // REPLACE THIS with require('../../assets/animations/empty-state.json')
        // For now, let's use a remote URI just to test (Expo supports this!)
        source={{ uri: 'https://lottie.host/5a8e0254-207d-4c3e-9676-e52233f20e40/7zJk5q3m2a.json' }}
      />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  text: {
    fontSize: 16,
    color: '#999',
    marginTop: 10,
    fontWeight: '500',
  },
});