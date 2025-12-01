// src/features/inbox/screens/NewChatScreen.tsx
import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/types';
import { SearchBar } from '../components/SearchBar';
import { useDebounce } from '../hooks/useDebounce';
import { useConversationStore } from '@/store/conversationStore';
import { User, Conversation, ChannelType } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NewChatNavigationProp = NativeStackNavigationProp<RootStackParamList, 'NewChat'>;

// Mock list of available contacts (in a real app, this would come from an API)
const AVAILABLE_CONTACTS: User[] = [
  {
    id: 'contact-1',
    name: 'Emma Wilson',
    avatar: 'https://i.pravatar.cc/150?img=1',
    isOnline: true,
    email: 'emma@example.com',
    company: 'Tech Corp',
  },
  {
    id: 'contact-2',
    name: 'Michael Chen',
    avatar: 'https://i.pravatar.cc/150?img=2',
    isOnline: false,
    email: 'michael@example.com',
    company: 'Design Studio',
  },
  {
    id: 'contact-3',
    name: 'Sophia Martinez',
    avatar: 'https://i.pravatar.cc/150?img=3',
    isOnline: true,
    email: 'sophia@example.com',
    company: 'Marketing Agency',
  },
  {
    id: 'contact-4',
    name: 'James Anderson',
    avatar: 'https://i.pravatar.cc/150?img=4',
    isOnline: true,
    email: 'james@example.com',
    company: 'Finance Inc',
  },
  {
    id: 'contact-5',
    name: 'Olivia Brown',
    avatar: 'https://i.pravatar.cc/150?img=5',
    isOnline: false,
    email: 'olivia@example.com',
    company: 'Consulting Group',
  },
];

export const NewChatScreen = () => {
  const navigation = useNavigation<NewChatNavigationProp>();
  const addConversation = useConversationStore((state) => state.addConversation);
  const existingConversations = useConversationStore((state) => state.conversations);

  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 300);

  // Get existing user IDs to filter them out (optional - you might want to show all contacts)
  const existingUserIds = useMemo(
    () => new Set(existingConversations.map((c) => c.user.id)),
    [existingConversations]
  );

  // Filter contacts based on search query
  const filteredContacts = useMemo(() => {
    let contacts = AVAILABLE_CONTACTS;

    if (debouncedSearch) {
      const lowerQuery = debouncedSearch.toLowerCase();
      contacts = contacts.filter(
        (contact) =>
          contact.name.toLowerCase().includes(lowerQuery) ||
          contact.email?.toLowerCase().includes(lowerQuery) ||
          contact.company?.toLowerCase().includes(lowerQuery)
      );
    }

    return contacts;
  }, [debouncedSearch]);

  const handleSelectContact = useCallback(
    (user: User) => {
      // Haptic feedback
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

      // Check if conversation already exists
      const existingConversation = existingConversations.find((c) => c.user.id === user.id);

      if (existingConversation) {
        // Navigate to existing conversation
        navigation.navigate('ChatDetail', { conversationId: existingConversation.id });
      } else {
        // Create new conversation
        const newConversation: Conversation = {
          id: `conv-${Date.now()}`,
          user,
          lastMessage: '',
          timestamp: new Date().toISOString(),
          unreadCount: 0,
          status: 'sent',
          channel: 'whatsapp' as ChannelType, // Default channel
          tags: [],
          messages: [],
        };

        addConversation(newConversation);
        navigation.navigate('ChatDetail', { conversationId: newConversation.id });
      }
    },
    [navigation, addConversation, existingConversations]
  );

  const renderContactItem = useCallback(
    ({ item }: { item: User }) => (
      <TouchableOpacity
        style={styles.contactRow}
        onPress={() => handleSelectContact(item)}
        activeOpacity={0.7}
      >
        <View style={styles.avatarContainer}>
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
          {item.isOnline && <View style={styles.onlineIndicator} />}
        </View>
        <View style={styles.contactInfo}>
          <Text style={styles.contactName}>{item.name}</Text>
          {item.company && <Text style={styles.contactCompany}>{item.company}</Text>}
        </View>
        <Ionicons name="chevron-forward" size={20} color="#ccc" />
      </TouchableOpacity>
    ),
    [handleSelectContact]
  );

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <View style={styles.content}>
        <SearchBar value={searchQuery} onChangeText={setSearchQuery} placeholder="Search contacts..." />
        
        <FlatList
          data={filteredContacts}
          renderItem={renderContactItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="search-outline" size={48} color="#ccc" />
              <Text style={styles.emptyText}>No contacts found</Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  listContent: {
    paddingVertical: 8,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#f0f0f0',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#fff',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  contactCompany: {
    fontSize: 14,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 12,
  },
});

