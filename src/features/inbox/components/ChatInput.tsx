import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
interface ChatInputProps {
    onSend: (text: string, type:'text'|'image', isInternal:boolean) => void;//updated signature with isInternal
}

export const ChatInput =({onSend}: ChatInputProps)=>{
    const [text, setText]=useState('');
//New Mode State
  const [isInternalMode, setInternalMode] = useState(false);
    const handleSend = () => {
        if (text.trim().length ===0) return; //empty bubbles are not sent

        onSend(text,'text', isInternalMode); //indicate it's a text message
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
    onSend(result.assets[0].uri,'image', isInternalMode); //indicate it's an image uri
        }
    };
    
  return (
    <View style={[
      styles.container, 
      // 2. Visual Safety Guard: Change background color in Note Mode
      isInternalMode ? styles.internalContainer : styles.replyContainer
    ]}>
            
{/* Mode Switcher */}
      <View style={styles.modeTabs}>
         <TouchableOpacity 
           onPress={() => setInternalMode(false)}
           style={[styles.tab, !isInternalMode && styles.activeTab]}
         >
           <Text style={[styles.tabText, !isInternalMode && styles.activeTabText]}>Reply</Text>
         </TouchableOpacity>
         
         <TouchableOpacity 
           onPress={() => setInternalMode(true)}
           style={[styles.tab, isInternalMode && styles.activeInternalTab]}
         >
           <Text style={[styles.tabText, isInternalMode && styles.activeInternalTabText]}>Internal Note</Text>
         </TouchableOpacity>
      </View>

      <View style={styles.inputRow}>
        <TouchableOpacity onPress={handlePickImage} style={styles.iconButton}>
          <Ionicons name="add" size={24} color={isInternalMode ? "#F59E0B" : "#007AFF"} />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          // 3. UX: Change placeholder text
          placeholder={isInternalMode ? "Add a private note..." : "Type a message..."}
          placeholderTextColor="#999"
          multiline
        />
        
        <TouchableOpacity 
          onPress={handleSend} 
          style={[
            styles.sendButton, 
            { backgroundColor: text.length > 0 ? (isInternalMode ? '#F59E0B' : '#007AFF') : '#ccc' }
          ]}
          disabled={text.length === 0}
        >
          {isInternalMode ? (
             <Ionicons name="lock-closed" size={16} color="white" />
          ) : (
             <Ionicons name="arrow-up" size={20} color="white" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ccc',
  },
  replyContainer: { backgroundColor: '#fff' },
  internalContainer: { backgroundColor: '#FFFBEB' }, // Light Yellow for warning
  
  modeTabs: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingTop: 8,
    marginBottom: 4,
  },
  tab: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginRight: 8,
  },
  activeTab: { backgroundColor: '#E3F2FD' }, // Light Blue
  activeInternalTab: { backgroundColor: '#FEF3C7' }, // Darker Yellow
  tabText: { fontSize: 12, fontWeight: '600', color: '#666' },
  activeTabText: { color: '#007AFF' },
  activeInternalTabText: { color: '#D97706' },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 10,
    marginRight: 10,
    fontSize: 16,
    maxHeight: 100,
  },
  iconButton: { padding: 5, marginRight: 8, marginBottom: 5 },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
});