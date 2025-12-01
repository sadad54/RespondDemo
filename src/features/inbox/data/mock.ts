// src/features/inbox/data/mock.ts
import { Conversation, Message } from '@/types';

// Helper to generate random IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

// --- MESSAGE HISTORIES ---

// 1. Sarah (Sales Lead - WhatsApp)
const MESSAGES_SARAH: Message[] = [
  {
    id: generateId(),
    text: 'Great, I will send the signed contract by EOD.',
    senderId: 'them',
    timestamp: '2023-10-25T14:35:00Z',
    type: 'text',
  },
  {
    id: generateId(),
    text: 'Client agreed to the 10% discount. @Manager please approve.',
    senderId: 'me',
    timestamp: '2023-10-25T14:32:00Z',
    type: 'text',
    isInternal: true, // Internal Note
  },
  {
    id: generateId(),
    text: 'Is there any flexibility on the pricing?',
    senderId: 'them',
    timestamp: '2023-10-25T14:30:00Z',
    type: 'text',
  },
];

// 2. Alex (Existing Customer - Email)
const MESSAGES_ALEX: Message[] = [
  {
    id: generateId(),
    text: 'Thank you, that fixed the login issue!',
    senderId: 'them',
    timestamp: '2023-10-25T09:15:00Z',
    type: 'text',
  },
  {
    id: generateId(),
    text: 'Please try clearing your browser cache now.',
    senderId: 'me',
    timestamp: '2023-10-25T09:10:00Z',
    type: 'text',
  },
  {
    id: generateId(),
    text: 'Bug reproduced on staging. Ticket #902 created.',
    senderId: 'me',
    timestamp: '2023-10-25T09:05:00Z',
    type: 'text',
    isInternal: true,
  },
  {
    id: generateId(),
    text: 'I am getting a 404 error on the dashboard.',
    senderId: 'them',
    timestamp: '2023-10-25T09:00:00Z',
    type: 'text',
  },
];

// 3. Tech Support (Vendor - Instagram)
const MESSAGES_VENDOR: Message[] = [
  {
    id: generateId(),
    text: 'Your ticket #492 has been resolved.',
    senderId: 'them',
    timestamp: '2023-10-24T18:00:00Z',
    type: 'text',
  },
  {
    id: generateId(),
    text: 'Do you have an ETA on the server maintenance?',
    senderId: 'me',
    timestamp: '2023-10-24T10:00:00Z',
    type: 'text',
  },
];

// 4. David (Complaint - Messenger)
const MESSAGES_DAVID: Message[] = [
  {
    id: generateId(),
    text: 'I need this resolved immediately.',
    senderId: 'them',
    timestamp: '2023-10-24T16:20:00Z',
    type: 'text',
  },
  {
    id: generateId(),
    text: 'Customer is irate. Handle with care.',
    senderId: 'me',
    timestamp: '2023-10-24T16:15:00Z',
    type: 'text',
    isInternal: true,
  },
];

// 5. Emma (Inquiry - WhatsApp)
const MESSAGES_EMMA: Message[] = [
  {
    id: generateId(),
    text: 'Hey! Just wanted to say I love the new feature.',
    senderId: 'them',
    timestamp: '2023-10-23T11:00:00Z',
    type: 'text',
  },
];

// --- MASTER CONVERSATION LIST ---

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: '1',
    user: {
      id: 'u1',
      name: 'Sarah Chen',
      avatar: 'https://i.pravatar.cc/150?u=sarah', // Reliable placeholder
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
    lastMessage: 'Great, I will send the signed contract by EOD.',
    timestamp: '2023-10-25T14:35:00Z',
    unreadCount: 2,
    status: 'delivered',
    isPinned: true,
    channel: 'whatsapp',
    tags: ['Lead', 'Urgent'],
    messages: MESSAGES_SARAH,
  },
  {
    id: '2',
    user: {
      id: 'u2',
      name: 'Alex Rodriguez',
      avatar: 'https://i.pravatar.cc/150?u=alex',
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
    lastMessage: 'Thank you, that fixed the login issue!',
    timestamp: '2023-10-25T09:15:00Z',
    unreadCount: 0,
    status: 'read',
    channel: 'email',
    tags: ['Customer'],
    messages: MESSAGES_ALEX,
  },
  {
    id: '3',
    user: {
      id: 'u3',
      name: 'Server Admin',
      avatar: 'https://ui-avatars.com/api/?name=Server+Admin&background=0D8ABC&color=fff', // Text-based avatar fallback
      isOnline: true,
      email: 'support@cloudvendor.com',
      phone: '+1 (555) 987-6543',
      location: 'San Francisco, CA',
      company: 'Cloud Vendor Inc',
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
    tags: ['Support', 'VIP'],
    messages: MESSAGES_VENDOR,
  },
  {
    id: '4',
    user: {
      id: 'u4',
      name: 'David Miller',
      avatar: 'https://i.pravatar.cc/150?u=david',
      email: 'david.m@gmail.com',
      phone: '+1 (555) 000-1111',
      location: 'Chicago, IL',
      company: 'Miller Logistics',
      attributes: {
        'Risk': 'High',
        'Sentiment': 'Negative'
      },
      isOnline: false
    },
    lastMessage: 'I need this resolved immediately.',
    timestamp: '2023-10-24T16:20:00Z',
    unreadCount: 1,
    status: 'delivered',
    channel: 'messenger',
    tags: ['Complaint'],
    messages: MESSAGES_DAVID,
  },
  {
    id: '5',
    user: {
      id: 'u5',
      name: 'Emma Watson',
      avatar: 'https://i.pravatar.cc/150?u=emma',
      email: 'emma.w@startup.io',
      location: 'London, UK',
      company: 'Startup IO',
      attributes: {
        'Plan': 'Trial',
        'Expiry': '3 Days'
      },
      isOnline: false
    },
    lastMessage: 'Hey! Just wanted to say I love the new feature.',
    timestamp: '2023-10-23T11:00:00Z',
    unreadCount: 0,
    status: 'read',
    channel: 'whatsapp',
    tags: ['Feedback'],
    messages: MESSAGES_EMMA,
  },
];