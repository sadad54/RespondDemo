import { StatusBar } from 'expo-status-bar';
import { Linking, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { InboxScreen } from './src/features/inbox/screens/InboxScreen';
import { RootNavigator } from '@/navigation/RootNavigator';
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';

// 1. Configure standard behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});
//
export default function App() {
  // Listen for interaction
  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      const url = response.notification.request.content.data.url;
      // Navigate to the deep link
      if (typeof url === 'string' && url) {
        Linking.openURL(url);
      }
    });

    return () => subscription.remove();
  }, []);

  return <RootNavigator />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
