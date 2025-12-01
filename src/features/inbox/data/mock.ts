// src/features/inbox/data/mock.ts
import { Conversation } from '@/types';

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: '1',
    user: {
      id: 'u1',
      name: 'Sarah Chen',
      avatar: 'https://i.pravatar.cc/150?u=u1',
      email: 'sarah.chen@techcorp.com',
      phone: '+60 12-345 6789',
      location: 'Kuala Lumpur, MY',
      company: 'TechCorp Solutions',
      isOnline: true,
      attributes: {
        'Plan': 'Enterprise',
        'LTV': '$12,500',
        'Renewal': '2024-12-01'
      }
    },
    lastMessage: 'Can we schedule the demo for Tuesday?',
    timestamp: '2023-10-25T14:30:00Z',
    unreadCount: 2,
    status: 'delivered',
    isPinned: true,
    channel: 'whatsapp',
    tags: ['Lead', 'Urgent'],
  },
  {
    id: '2',
    user: {
      id: 'u2',
      name: 'Alex Rodriguez',
      avatar: 'https://i.pravatar.cc/150?u=u2',
      isOnline: false,
      email: 'alex.rodriguez@sales.com',
      phone: '+1 (555) 123-4567',
      location: 'New York, NY',
      company: 'Sales Inc.',
      attributes: {
        'Plan': 'Pro',
        'LTV': '$8,200',
        'Renewal': '2024-09-15'
      }
    },
    lastMessage: 'The contract has been signed!',
    timestamp: '2023-10-25T09:15:00Z',
    unreadCount: 0,
    status: 'read',
    channel: 'email',
    tags: ['Customer'],
  },
  {
    id: '3',
    user: {
      id: 'u3',
      name: 'Tech Support',
      avatar: 'https://i.pravatar.cc/150?u=u3',
      isOnline: false,  
      email: 'support@techsupport.com',
      phone: '+1 (555) 987-6543',
      location: 'San Francisco, CA',
      company: 'TechSupport Services',
      attributes: {
        'Plan': 'Basic',
        'LTV': '$5,800',
        'Renewal': '2024-07-20'
      }
    },
    lastMessage: 'Your ticket #492 has been resolved.',
    timestamp: '2023-10-24T18:00:00Z',
    unreadCount: 5,
    status: 'sent',
    channel: 'instagram',
    tags: ['Support', 'VIP']
  },
  // Add more items here to test scrolling performance later!
];