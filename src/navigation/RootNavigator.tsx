import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {InboxScreen} from '@/features/inbox/screens/InboxScreen';
import { RootStackParamList } from '@/types';
import { ChatDetailScreen } from '@/features/inbox/screens/ChatDetailScreen';
import { ContactDetailsScreen } from '@/features/inbox/screens/ContactDetailsScreen';
import * as Linking from 'expo-linking';

const linking = {
  prefixes: [Linking.createURL('/')], // Handles expo:// and responddemo://
  config: {
    screens: {
      Inbox: 'inbox',
      ChatDetail: {
        path: 'chat/:conversationId', // :id is a dynamic param!
        parse: {
          conversationId: (id: string) => id,
        },
      },
      ContactDetails: 'contact/:userId',
    },
  },
};

//1. create a typed stack navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <NavigationContainer linking={linking}>
        <Stack.Navigator
            initialRouteName="Inbox"
            screenOptions={{
              headerTintColor: '#000',
              animation: 'slide_from_right', // Ensures native-feeling transitions
              headerShadowVisible: false, // Cleaner, modern look (removes the ugly line)
              headerStyle: { backgroundColor: '#fff' },
            }}
      >
        <Stack.Screen 
            name="Inbox" 
            component={InboxScreen} 
            options={{ title: 'Messages' }}
        />
        {/* We will build the ChatDetail component in the next module */}
        {/* For now, we can comment it out or use a placeholder */}
         <Stack.Screen name="ChatDetail" component={ChatDetailScreen} />
         <Stack.Screen name="ContactDetails" component={ContactDetailsScreen} options={{title: 'Contact Info'}}
         />
      </Stack.Navigator>
    </NavigationContainer>
  );
};