import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
interface ChatInputProps {
    onSend: (text: string, type:'text'|'image') => void;//updated signature
}

export const ChatInput =({onSend}: ChatInputProps)=>{
    const [text, setText]=useState('');

    const handleSend = () => {
        if (text.trim().length ===0) return; //empty bubbles are not sent

        onSend(text,'text'); //indicate it's a text message
        setText(''); //clear input after sending
    };
    const handlePickImage = async () => {
     //   1. ask for permission
     const result = await ImagePicker.launchImageLibraryAsync({
     mediaTypes:['images'],
    allowsEditing:true,
    quality:1,
     });
        if(!result.canceled){
    //2. if user picked someething, send it as a message
    //in a real app, you would upload this to aws s3 here
    //for this demo we just pass the local uri
    onSend(result.assets[0].uri,'image'); //indicate it's an image uri
        }
    };
    
    return(
        <View style={styles.container}>
            {/* The attach button */}
            <TouchableOpacity onPress={handlePickImage} style={styles.iconButton}>
        <Ionicons name="add" size={24} color="#007AFF" />
      </TouchableOpacity>

            <TextInput
            style={styles.input}
            value = {text}
            onChangeText={setText}
            placeholder="Type a message..."
            placeholderTextColor="#999"
            multiline //allow multiple lines

        />
        <TouchableOpacity onPress={handleSend}
        style={[styles.sendButton,{backgroundColor:text.length>0?"#007AFF":"#ccc"}]}
        disabled={text.length===0}
        >
            <Ionicons name="arrow-up" size={20} color="white" />
        </TouchableOpacity>
         </View>
    );
};
const styles = StyleSheet.create({
    iconButton:{
        padding: 5,
        marginRight: 8,
        marginBottom:5,//align visually with input
    },
    container:{
        flexDirection:'row',
        padding:10,
        borderTopWidth:StyleSheet.hairlineWidth,
        borderTopColor:'#ccc',
        alignItems:'flex-end',//align send button at bottom
    },
    input:{
        flex:1,
        backgroundColor:'#f0f0f0',
        borderRadius:20,
        paddingHorizontal:15,
        paddingTop:10, //more padding for multiline
        paddingBottom: 10,
        marginRight: 10,
        fontSize:16,
        maxHeight: 100, //limit height when multiline
    },
    sendButton:{
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems:'center',
        justifyContent:'center',
        marginBottom:2,//align visually with input
    },
})