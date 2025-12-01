import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Conversation, Message } from '@/types';
import { zustandStorage } from './storage';

// 👇 1. Import the new mock data
import { MOCK_CONVERSATIONS } from '@/features/inbox/data/mock';

interface ConversationState {
  conversations: Conversation[];
  deleteConversation: (id: string) => void;
  addConversation: (conversation: Conversation) => void;
  sendMessage: (conversationId: string, message: Message) => void;
}

export const useConversationStore = create<ConversationState>()(
  persist(
    (set) => ({
      // 👇 2. Set the initial state to your rich mocks!
      // This ensures that when the app installs, these chats appear instantly.
      conversations: MOCK_CONVERSATIONS, 

      deleteConversation: (id) =>
        set((state) => ({
          conversations: state.conversations.filter((c) => c.id !== id),
        })),

      addConversation: (conversation) =>
        set((state) => ({
          conversations: [conversation, ...state.conversations],
        })),

      sendMessage: (conversationId, newMessage) =>
        set((state) => ({
          conversations: state.conversations.map((c) => {
            if (c.id === conversationId) {
              return {
                ...c,
                // Add new message to the TOP of the list (since we invert the UI)
                messages: [newMessage, ...c.messages],
                lastMessage: newMessage.type === 'image' ? '📷 Image' : newMessage.text,
                timestamp: newMessage.timestamp,
                // Reset unread count if we reply
                unreadCount: 0,
                // Move this conversation to the top of the inbox list
                // (We can do this by sorting later, or just updating timestamp here)
              };
            }
            return c;
          }),
        })),
    }),
    {
      name: 'conversation-storage',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);