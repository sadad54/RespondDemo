// src/store/conversationStore.ts
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Conversation } from '@/types';
import { MOCK_CONVERSATIONS } from '@/features/inbox/data/mock';
import { zustandStorage } from './storage';

interface ConversationState {
  conversations: Conversation[];
  // Actions
  deleteConversation: (id: string) => void;
  addConversation: (conversation: Conversation) => void;
  // We can add more later (like setConversations)
}

export const useConversationStore = create<ConversationState>()(
  persist(
    (set) => ({
      // Initial State (Load mocks only if storage is empty, or just start with mocks for now)
      conversations: MOCK_CONVERSATIONS,

      // Action: Delete
      deleteConversation: (id) =>
        set((state) => ({
          conversations: state.conversations.filter((c) => c.id !== id),
        })),

      // Action: Add
      addConversation: (conversation) =>
        set((state) => ({
          conversations: [conversation, ...state.conversations],
        })),
    }),
    {
      name: 'conversation-storage', // unique name for the key in MMKV
      storage: createJSONStorage(() => zustandStorage), // Use our fast adapter!
    }
  )
);