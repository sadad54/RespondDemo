import React, { useEffect, useState} from 'react';
import {useRoute, RouteProp, useNavigation} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import {RootStackParamList} from '@/types';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, FlatList } from 'react-native';
import { MessageBubble } from '../components/MessageBubble';
import { Message, MOCK_MESSAGES } from '../data/chatMock';
import {ChatInput} from '../components/ChatInput';
import { TouchableOpacity, Image } from 'react-native';
import { useConversationStore } from '@/store/conversationStore';



type ChatDetailRouteProp = RouteProp<RootStackParamList, 'ChatDetail'>;
type ChatDetailNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ChatDetail'>;

export const ChatDetailScreen = () => {
    const route = useRoute<ChatDetailRouteProp>();
    const navigation = useNavigation<ChatDetailNavigationProp>();
    const {conversationId} = route.params;
//keep messages in state so we can eventually add new ones
// 1. SELECT DATA FROM STORE
  // We find the specific conversation we are looking at
  const conversation = useConversationStore(state => 
    state.conversations.find(c => c.id === conversationId)
  );
  
  // 2. GRAB THE ACTION
  const sendMessage = useConversationStore(state => state.sendMessage);

  // Safety check (in case conversation was deleted)
  if (!conversation) return null;

  const handleSend = (content: string, type: 'text' | 'image', isInternal: boolean) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text: content,
      senderId: 'me',
      timestamp: new Date().toISOString(),
      type: type,
      isInternal: isInternal,
    };

    // 3. CALL THE STORE INSTEAD OF LOCAL STATE
    sendMessage(conversationId, newMessage);
  };

    return (
        <SafeAreaView style={styles.container}>
<KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        style={styles.keyboardContainer}
      >
    <FlatList
    data={conversation.messages}
    renderItem ={({item})=><MessageBubble message={item} />}
    keyExtractor={(item) => item.id}
    inverted //the magic prop
    contentContainerStyle={styles.listContent}
    />
    {/* placeholder for Input Bar*/}
    <ChatInput onSend={handleSend} />
</KeyboardAvoidingView>
        </SafeAreaView>
    );
    
};


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20, fontWeight: 'bold' },
  subtext: { color: '#666', marginTop: 10 },
  keyboardContainer:{
    flex:1,
},
listContent:{
    paddingVertical: 16,
},
inputPlaceholder:{
    height: 50,
    backgroundColor: '#eee',
    margin: 10,
    borderRadius:25,
}
},


);