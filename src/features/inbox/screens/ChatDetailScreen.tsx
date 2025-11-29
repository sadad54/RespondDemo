import React, { useEffect, useState} from 'react';
import {useRoute, RouteProp, useNavigation} from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {RootStackParamList} from '@/types';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, FlatList } from 'react-native';
import { MessageBubble } from '../components/MessageBubble';
import { Message, MOCK_MESSAGES } from '../data/chatMock';
import {ChatInput} from '../components/ChatInput';


type ChatDetailRouteProp = RouteProp<RootStackParamList, 'ChatDetail'>;

export const ChatDetailScreen = () => {
    const route = useRoute<ChatDetailRouteProp>();
    const navigation = useNavigation();
    const {conversationId} = route.params;
//keep messages in state so we can eventually add new ones
const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);

const handleSend= (text:string)=>{
    const newMessage: Message={
        id: Date.now().toString(), //simple unique id
        text: text,
        senderId:'me',
        timestamp: new Date().toISOString(),
    };

    //add to the start of the array bc our list is inverted
    setMessages((prev)=> [newMessage, ...prev]);
};
    //Systems thinking: in a real app we would fetch messages here with useEffect
    //useEffect(() => {api.getMessages(conversationId)}, [conversationId]);

    useEffect(() => {
        //we are setting the header title dynamically based on conversationId
        navigation.setOptions({title: `Chat #${conversationId}`});
    }, [navigation, conversationId]);

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