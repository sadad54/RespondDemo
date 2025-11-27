// src/features/inbox/data/mock.ts
import { Conversation } from '@/types';

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: '1',
    user: {
      id: 'u1',
      name: 'Sarah Chen',
      avatar: 'https://i.pravatar.cc/150?u=u1',
      isOnline: true,
    },
    lastMessage: 'Can we schedule the demo for Tuesday?',
    timestamp: '2023-10-25T14:30:00Z',
    unreadCount: 2,
    status: 'delivered',
    isPinned: true,
  },
  {
    id: '2',
    user: {
      id: 'u2',
      name: 'Alex Rodriguez',
      avatar: 'https://i.pravatar.cc/150?u=u2',
      isOnline: false,
    },
    lastMessage: 'The contract has been signed!',
    timestamp: '2023-10-25T09:15:00Z',
    unreadCount: 0,
    status: 'read',
  },
  {
    id: '3',
    user: {
      id: 'u3',
      name: 'Tech Support',
      avatar: 'https://i.pravatar.cc/150?u=u3',
      isOnline: false,  
    },
    lastMessage: 'Your ticket #492 has been resolved.',
    timestamp: '2023-10-24T18:00:00Z',
    unreadCount: 5,
    status: 'sent',
  },
  // Add more items here to test scrolling performance later!
];