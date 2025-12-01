// src/features/inbox/components/MessageBubble.tsx
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Message } from '../data/chatMock';
import { Ionicons } from '@expo/vector-icons';
interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isMe = message.senderId === 'me';
  const isImage = message.type === 'image';
  const isInternal = message.isInternal;

//If it's an internal note, render the special "Yellow Box"
  if (isInternal) {
    return (
      <View style={styles.internalContainer}>
        <View style={styles.internalHeader}>
           <Ionicons name="lock-closed" size={12} color="#D97706" />
           <Text style={styles.internalLabel}>Private Note</Text>
        </View>
        {isImage ? (
           <Image source={{ uri: message.text }} style={styles.imageContent} resizeMode="cover" />
        ) : (
           <Text style={styles.internalText}>{message.text}</Text>
        )}
        <Text style={styles.internalTime}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • You
        </Text>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        isMe ? styles.rightContainer : styles.leftContainer,
      ]}
    >
    {isImage ? (
        <Image 
            source={{ uri: message.text }} 
            style={styles.imageContent} 
            resizeMode="cover"
        />
      ) : (
        <Text style={[styles.text, isMe ? styles.rightText : styles.leftText]}>
            {message.text}
        </Text>
      )}
      <Text style={[styles.time, isMe ? styles.rightTime : styles.leftTime]}>
        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 20,
    marginVertical: 4,
    marginHorizontal: 12,
  },
  leftContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
    borderBottomLeftRadius: 4, // Little distinct corner
  },
  rightContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF', // iOS Blue
    borderBottomRightRadius: 4,
  },
  text: {
    fontSize: 16,
  },
  leftText: {
    color: '#000',
  },
  rightText: {
    color: '#fff',
  },
  time: {
    fontSize: 10,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  leftTime: {
    color: '#666',
  },
  rightTime: {
    color: 'rgba(255,255,255,0.7)',
  },
  imageContent: {
        width: 200,
        height: 150,
        borderRadius: 10,
        marginBottom: 4,
    },
    internalContainer: {
    alignSelf: 'center', // Center it like a system message
    width: '90%',
    backgroundColor: '#FEF3C7', // Light Yellow
    borderColor: '#FCD34D', // Border to make it pop
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
  },
  internalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  internalLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#D97706',
    marginLeft: 4,
  },
  internalText: {
    fontSize: 15,
    color: '#4B5563',
  },
  internalTime: {
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 6,
    textAlign: 'right',
  },
});