// src/components/SkeletonRow.tsx
import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  Easing 
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

// A reusable atom for a gray box that shimmers
const SkeletonBox = ({ width, height, style }: { width: number | string, height: number, style?: any }) => {
  const translateX = useSharedValue(-width);

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(Number(width), { duration: 1000, easing: Easing.linear }),
      -1 // Infinite loop
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={[{ width, height, backgroundColor: '#E1E9EE', overflow: 'hidden' }, style]}>
      <Animated.View style={[{ width: '100%', height: '100%' }, animatedStyle]}>
        <LinearGradient
          colors={['transparent', 'rgba(255,255,255,0.5)', 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ flex: 1 }}
        />
      </Animated.View>
    </View>
  );
};

export const SkeletonRow = () => {
  return (
    <View style={styles.container}>
      {/* Avatar Circle */}
      <SkeletonBox width={50} height={50} style={{ borderRadius: 25 }} />
      
      <View style={styles.content}>
        {/* Name Bar */}
        <SkeletonBox width={120} height={16} style={{ marginBottom: 8, borderRadius: 4 }} />
        {/* Message Bar */}
        <SkeletonBox width={200} height={12} style={{ borderRadius: 4 }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#f0f0f0',
    height: 80,
  },
  content: {
    marginLeft: 12,
    flex: 1,
  },
});