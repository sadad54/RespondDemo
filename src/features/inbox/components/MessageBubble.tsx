// src/features/inbox/components/MessageBubble.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Message } from '../data/chatMock';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isMe = message.senderId === 'me';

  return (
    <View
      style={[
        styles.container,
        isMe ? styles.rightContainer : styles.leftContainer,
      ]}
    >
      <Text style={[styles.text, isMe ? styles.rightText : styles.leftText]}>
        {message.text}
      </Text>
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
});