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
const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
//find the convo to go the user details
const conversation = useConversationStore((state) => 
    state.conversations.find((c) => c.id === conversationId));



const handleSend= (content: string, type: 'text' | 'image', isInternal:boolean)=>{
    const newMessage: Message={
        id: Date.now().toString(), //simple unique id
        text: content,
        senderId:'me',
        timestamp: new Date().toISOString(),
        type: type, // include the message type
        isInternal: isInternal,
    };

    //add to the start of the array bc our list is inverted
    setMessages((prev)=> [newMessage, ...prev]);
};
    //Systems thinking: in a real app we would fetch messages here with useEffect
    //useEffect(() => {api.getMessages(conversationId)}, [conversationId]);

    useEffect(() => {
        if (!conversation) return;
    
        // Use setOptions to render a custom header title
        navigation.setOptions({
          headerTitle: () => (
            <TouchableOpacity 
              style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}
              onPress={() => navigation.navigate('ContactDetails', { userId: conversation.user.id })}
            >
              <Image 
                source={{ uri: conversation.user.avatar }} 
                style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: '#ccc' }} 
              />
              <View>
                 <Text style={{ fontSize: 16, fontWeight: '600' }}>{conversation.user.name}</Text>
                 {/* Optional: Show status or company here too */}
              </View>
            </TouchableOpacity>
          ),
          // Remove default title
          title: '', 
        });
      }, [navigation, conversation]);

    return (
        <SafeAreaView style={styles.container}>
<KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        style={styles.keyboardContainer}
      >
    <FlatList
    data={messages}
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