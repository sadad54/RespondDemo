// import React from 'react';
// import {View, StyleSheet, Dimensions} from 'react-native';
// import { GestureDetector, Gesture } from 'react-native-gesture-handler';
// import Animated, {
//     useAnimatedStyle,
//     useSharedValue,
//     withSpring,
//     withTiming,
//     runOnJS,
// } from 'react-native-reanimated';
// import {Ionicons} from '@expo/vector-icons';// expo's built-in icon lib


// interface SwipeableRowProps{
//     children: React.ReactNode;
//     onSwipeLeft:()=>void;
// }
// const {width: SCREEN_WIDTH} = Dimensions.get('window');
// const SWIPE_THRESHOLD = -SCREEN_WIDTH * 0.3; //Swipe 30% to trigger

// export const SwipeableRow =({children, onSwipeLeft}: SwipeableRowProps)=>{
//     const translateX = useSharedValue(0);
//     const itemHeight = useSharedValue(80);//matching with the row height
//     const opacity = useSharedValue(1);}
//     //this fucntion runs on the js thread to remove the data afte swiping
//     const handleComplete=()=>{
//         onSwipeLeft();
//     };

//     const panGesture=Gesture.Pan()
//     .onChange((event)=>{
//         //only allow swiping left (negative X)
//         if(event.translationX<0){
//             translateX.value=event.translationX;
//         }
//     })
//     .onEnd(()=>{
//         if(translateX.value<SWIPE_THRESHOLD){       
//             //if swiped far enough then nimate it off the screen fully
//             translateX.value = withTIming(-SCREEN_WIDTH, undefined,(isFinished)=>{
//                 if(isFinished){
//                     //after animation completes, we run the cleanup on js thread
//                     runOnJS(handleComplete)();
//                 }
//             });
//         } else {
//             //if not swiped far enough, reset position
//             translateX.value = withSpring(0);
//         }
//     });
//     const animatedStyle = useAnimatedStyle(() => ({
//     transform: [{ translateX: translateX.value }],
//   }));

//   const containerStyle = useAnimatedStyle(() => ({
//     height: itemHeight.value,
//     opacity: opacity.value,
//     marginBottom: itemHeight.value === 0 ? 0 : 0, // Clean up margin
//   }));

//   return (
//     <Animated.View style={[styles.wrapper, containerStyle]}>
//       {/* Background Layer (Red Archive) */}
//       <View style={styles.backgroundContainer}>
//         <View style={styles.iconContainer}>
//             <Ionicons name="archive" size={24} color="white" />
//         </View>
//       </View>

//       {/* Foreground Layer (The actual row) */}
//       <GestureDetector gesture={panGesture}>
//         <Animated.View style={[styles.foreground, animatedStyle]}>
//           {children}
//         </Animated.View>
//       </GestureDetector>
//     </Animated.View>
//   );
// };

// const styles = StyleSheet.create({
//   wrapper: {
//     overflow: 'hidden', // Ensures the background doesn't bleed out
//   },
//   backgroundContainer: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: '#ef4444', // Red color for 'Remove'
//     justifyContent: 'center',
//     alignItems: 'flex-end',
//     paddingRight: 20,
//   },
//   iconContainer: {
//      width: 40,
//      alignItems: 'center'
//   },
//   foreground: {
//     backgroundColor: 'white',
//   },
// });
// src/features/inbox/components/SwipeableRow.tsx
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons'; // Built-in with Expo

interface SwipeableRowProps {
  children: React.ReactNode;
  onSwipeLeft: () => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = -SCREEN_WIDTH * 0.3; // Swipe 30% to trigger

export const SwipeableRow = ({ children, onSwipeLeft }: SwipeableRowProps) => {
  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(80); // Matches our row height
  const opacity = useSharedValue(1);

  // This function runs on the JS thread to actually remove the data
  const handleComplete = () => {
    onSwipeLeft();
  };

  const panGesture = Gesture.Pan()
    .onChange((event) => {
      // Only allow swiping left (negative X)
      if (event.translationX < 0) {
        translateX.value = event.translationX;
      }
    })
    .onEnd(() => {
      if (translateX.value < SWIPE_THRESHOLD) {
        // If swiped far enough, animate off screen completely
        translateX.value = withTiming(-SCREEN_WIDTH, undefined, (isFinished) => {
          if (isFinished) {
            // Collapse the height to 0 for that "sucking away" effect
            itemHeight.value = withTiming(0);
            opacity.value = withTiming(0, undefined, (finished) => {
                if (finished) {
                    runOnJS(handleComplete)();
                }
            });
          }
        });
      } else {
        // Otherwise snap back to start
        translateX.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const containerStyle = useAnimatedStyle(() => ({
    height: itemHeight.value,
    opacity: opacity.value,
    marginBottom: itemHeight.value === 0 ? 0 : 0, // Clean up margin
  }));

  return (
    <Animated.View style={[styles.wrapper, containerStyle]}>
      {/* Background Layer (Red Archive) */}
      <View style={styles.backgroundContainer}>
        <View style={styles.iconContainer}>
            <Ionicons name="archive" size={24} color="white" />
        </View>
      </View>

      {/* Foreground Layer (The actual row) */}
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.foreground, animatedStyle]}>
          {children}
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    overflow: 'hidden', // Ensures the background doesn't bleed out
  },
  backgroundContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#ef4444', // Red color for 'Remove'
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 20,
  },
  iconContainer: {
     width: 40,
     alignItems: 'center'
  },
  foreground: {
    backgroundColor: 'white',
  },
});