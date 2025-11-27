import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {InboxScreen} from '@/features/inbox/screens/InboxScreen';
import { RootStackParamList } from '@/types';
import { ChatDetailScreen } from '@/features/inbox/screens/ChatDetailScreen';

//1. create a typed stack navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator
            initialRouteName="Inbox"
            screenOptions={{
                headerTintColor: '#000',
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};