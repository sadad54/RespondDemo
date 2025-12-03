
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

// 6. Michael (Product Demo Request - Email)
const MESSAGES_MICHAEL: Message[] = [
  {
    id: generateId(),
    text: 'Perfect! Looking forward to the demo on Friday at 3 PM.',
    senderId: 'them',
    timestamp: '2023-10-25T15:45:00Z',
    type: 'text',
  },
  {
    id: generateId(),
    text: 'I can do Friday at 3 PM or Monday at 10 AM. Which works better?',
    senderId: 'me',
    timestamp: '2023-10-25T15:40:00Z',
    type: 'text',
  },
  {
    id: generateId(),
    text: 'Follow up scheduled. High-value prospect from LinkedIn ad.',
    senderId: 'me',
    timestamp: '2023-10-25T15:38:00Z',
    type: 'text',
    isInternal: true,
  },
  {
    id: generateId(),
    text: 'Hi, I saw your product on LinkedIn and would love to schedule a demo.',
    senderId: 'them',
    timestamp: '2023-10-25T15:30:00Z',
    type: 'text',
  },
];

// 7. Lisa (Billing Question - Messenger)
const MESSAGES_LISA: Message[] = [
  {
    id: generateId(),
    text: 'Got it, thanks for clarifying!',
    senderId: 'them',
    timestamp: '2023-10-25T13:20:00Z',
    type: 'text',
  },
  {
    id: generateId(),
    text: 'The charge appears on your statement as "InboxScout Pro" - that\'s us!',
    senderId: 'me',
    timestamp: '2023-10-25T13:15:00Z',
    type: 'text',
  },
  {
    id: generateId(),
    text: 'Customer confused about billing. Checked account - all charges are correct.',
    senderId: 'me',
    timestamp: '2023-10-25T13:10:00Z',
    type: 'text',
    isInternal: true,
  },
  {
    id: generateId(),
    text: 'I see a charge on my card but I\'m not sure what it\'s for. Can you help?',
    senderId: 'them',
    timestamp: '2023-10-25T13:05:00Z',
    type: 'text',
  },
];

// 8. James (Feature Request - WhatsApp)
const MESSAGES_JAMES: Message[] = [
  {
    id: generateId(),
    text: 'That would be amazing! When can we expect this?',
    senderId: 'them',
    timestamp: '2023-10-25T11:30:00Z',
    type: 'text',
  },
  {
    id: generateId(),
    text: 'Great suggestion! I\'ve forwarded this to our product team. They\'re considering adding dark mode in Q1 2024.',
    senderId: 'me',
    timestamp: '2023-10-25T11:25:00Z',
    type: 'text',
  },
  {
    id: generateId(),
    text: 'Feature request logged: Dark mode support. Customer ID: 8923',
    senderId: 'me',
    timestamp: '2023-10-25T11:20:00Z',
    type: 'text',
    isInternal: true,
  },
  {
    id: generateId(),
    text: 'Love the app! Any chance you\'ll add dark mode soon?',
    senderId: 'them',
    timestamp: '2023-10-25T11:15:00Z',
    type: 'text',
  },
];

// 9. Maria (Technical Issue - Email)
const MESSAGES_MARIA: Message[] = [
  {
    id: generateId(),
    text: 'The sync is working perfectly now. Thank you so much for your help!',
    senderId: 'them',
    timestamp: '2023-10-25T10:50:00Z',
    type: 'text',
  },
  {
    id: generateId(),
    text: 'Try syncing again - I\'ve reset your account permissions on our end.',
    senderId: 'me',
    timestamp: '2023-10-25T10:45:00Z',
    type: 'text',
  },
  {
    id: generateId(),
    text: 'Escalated to engineering. Issue with OAuth token refresh.',
    senderId: 'me',
    timestamp: '2023-10-25T10:40:00Z',
    type: 'text',
    isInternal: true,
  },
  {
    id: generateId(),
    text: 'I\'m still having trouble syncing my calendar. It worked yesterday.',
    senderId: 'them',
    timestamp: '2023-10-25T10:35:00Z',
    type: 'text',
  },
  {
    id: generateId(),
    text: 'Can you try disconnecting and reconnecting your calendar?',
    senderId: 'me',
    timestamp: '2023-10-25T10:30:00Z',
    type: 'text',
  },
  {
    id: generateId(),
    text: 'My calendar isn\'t syncing properly.',
    senderId: 'them',
    timestamp: '2023-10-25T10:25:00Z',
    type: 'text',
  },
];

// 10. Robert (Partnership Inquiry - Instagram)
const MESSAGES_ROBERT: Message[] = [
  {
    id: generateId(),
    text: 'Sounds great! Let\'s schedule a call next week to discuss details.',
    senderId: 'them',
    timestamp: '2023-10-24T17:30:00Z',
    type: 'text',
  },
  {
    id: generateId(),
    text: 'We\'d love to explore a partnership. I can share our partnership program overview.',
    senderId: 'me',
    timestamp: '2023-10-24T17:25:00Z',
    type: 'text',
  },
  {
    id: generateId(),
    text: 'Potential partnership opportunity. Company: TechFlow Solutions. Revenue: $5M+',
    senderId: 'me',
    timestamp: '2023-10-24T17:20:00Z',
    type: 'text',
    isInternal: true,
  },
  {
    id: generateId(),
    text: 'We\'re interested in partnering with your platform. Do you have a partner program?',
    senderId: 'them',
    timestamp: '2023-10-24T17:15:00Z',
    type: 'text',
  },
];

// 11. Jennifer (Account Upgrade - WhatsApp)
const MESSAGES_JENNIFER: Message[] = [
  {
    id: generateId(),
    text: 'Perfect! I\'ve upgraded your account. You should see the new features immediately.',
    senderId: 'me',
    timestamp: '2023-10-24T14:10:00Z',
    type: 'text',
  },
  {
    id: generateId(),
    text: 'Account upgrade processed. Applied 20% annual discount.',
    senderId: 'me',
    timestamp: '2023-10-24T14:05:00Z',
    type: 'text',
    isInternal: true,
  },
  {
    id: generateId(),
    text: 'Yes, please upgrade me to the Enterprise plan. I\'ll pay annually.',
    senderId: 'them',
    timestamp: '2023-10-24T14:00:00Z',
    type: 'text',
  },
  {
    id: generateId(),
    text: 'The Enterprise plan includes priority support, advanced analytics, and API access. Would you like to upgrade?',
    senderId: 'me',
    timestamp: '2023-10-24T13:55:00Z',
    type: 'text',
  },
  {
    id: generateId(),
    text: 'What features come with the Enterprise plan?',
    senderId: 'them',
    timestamp: '2023-10-24T13:50:00Z',
    type: 'text',
  },
];

// 12. Kevin (Refund Request - Email)
const MESSAGES_KEVIN: Message[] = [
  {
    id: generateId(),
    text: 'Refund processed. Customer should see it in 5-7 business days.',
    senderId: 'me',
    timestamp: '2023-10-24T12:30:00Z',
    type: 'text',
    isInternal: true,
  },
  {
    id: generateId(),
    text: 'I\'ve processed your refund. You\'ll receive a confirmation email shortly.',
    senderId: 'me',
    timestamp: '2023-10-24T12:25:00Z',
    type: 'text',
  },
  {
    id: generateId(),
    text: 'I need to cancel my subscription and get a refund. The product doesn\'t meet my needs.',
    senderId: 'them',
    timestamp: '2023-10-24T12:20:00Z',
    type: 'text',
  },
];

// 13. Sophia (Integration Help - Messenger)
const MESSAGES_SOPHIA: Message[] = [
  {
    id: generateId(),
    text: 'You\'re welcome! Let me know if you need anything else.',
    senderId: 'me',
    timestamp: '2023-10-24T09:45:00Z',
    type: 'text',
  },
  {
    id: generateId(),
    text: 'It\'s working now! Thank you so much!',
    senderId: 'them',
    timestamp: '2023-10-24T09:40:00Z',
    type: 'text',
  },
  {
    id: generateId(),
    text: 'Make sure you\'re using the API key from Settings > Integrations, not the old one.',
    senderId: 'me',
    timestamp: '2023-10-24T09:35:00Z',
    type: 'text',
  },
  {
    id: generateId(),
    text: 'I\'m getting an authentication error when trying to connect via API.',
    senderId: 'them',
    timestamp: '2023-10-24T09:30:00Z',
    type: 'text',
  },
];

// 14. Tom (Trial Extension - Email)
const MESSAGES_TOM: Message[] = [
  {
    id: generateId(),
    text: 'I\'ve extended your trial by 7 days. Enjoy exploring the platform!',
    senderId: 'me',
    timestamp: '2023-10-23T16:20:00Z',
    type: 'text',
  },
  {
    id: generateId(),
    text: 'Trial extension approved. Customer needs more time to evaluate.',
    senderId: 'me',
    timestamp: '2023-10-23T16:15:00Z',
    type: 'text',
    isInternal: true,
  },
  {
    id: generateId(),
    text: 'My trial expires tomorrow but I need a few more days to show it to my team. Can you extend it?',
    senderId: 'them',
    timestamp: '2023-10-23T16:10:00Z',
    type: 'text',
  },
];

// 15. Rachel (Bug Report - WhatsApp)
const MESSAGES_RACHEL: Message[] = [
  {
    id: generateId(),
    text: 'Bug fixed in v2.3.1. Customer notified.',
    senderId: 'me',
    timestamp: '2023-10-23T14:00:00Z',
    type: 'text',
    isInternal: true,
  },
  {
    id: generateId(),
    text: 'Thanks for reporting! We\'ve fixed this issue and it will be in the next update.',
    senderId: 'me',
    timestamp: '2023-10-23T13:55:00Z',
    type: 'text',
  },
  {
    id: generateId(),
    text: 'I found a bug - when I export reports, the dates are showing incorrectly.',
    senderId: 'them',
    timestamp: '2023-10-23T13:50:00Z',
    type: 'text',
  },
];

// 16. Chris (Onboarding Question - Instagram)
const MESSAGES_CHRIS: Message[] = [
  {
    id: generateId(),
    text: 'Perfect! I\'ve set up your first campaign. Check your dashboard.',
    senderId: 'me',
    timestamp: '2023-10-22T15:30:00Z',
    type: 'text',
  },
  {
    id: generateId(),
    text: 'Yes, you can import your contacts via CSV. Go to Contacts > Import.',
    senderId: 'me',
    timestamp: '2023-10-22T15:25:00Z',
    type: 'text',
  },
  {
    id: generateId(),
    text: 'Can I import my existing contact list?',
    senderId: 'them',
    timestamp: '2023-10-22T15:20:00Z',
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
  {
    id: '6',
    user: {
      id: 'u6',
      name: 'Michael Thompson',
      avatar: 'https://i.pravatar.cc/150?u=michael',
      email: 'michael.thompson@enterprise.com',
      phone: '+44 20 7946 0958',
      location: 'London, UK',
      company: 'Enterprise Solutions Ltd',
      attributes: {
        'Plan': 'Enterprise',
        'LTV': '$45,000',
        'Source': 'LinkedIn Ad',
        'Stage': 'Demo Scheduled'
      },
      isOnline: true,
    },
    lastMessage: 'Perfect! Looking forward to the demo on Friday at 3 PM.',
    timestamp: '2023-10-25T15:45:00Z',
    unreadCount: 0,
    status: 'read',
    isPinned: true,
    channel: 'email',
    tags: ['Lead', 'High Value'],
    messages: MESSAGES_MICHAEL,
  },
  {
    id: '7',
    user: {
      id: 'u7',
      name: 'Lisa Park',
      avatar: 'https://i.pravatar.cc/150?u=lisa',
      email: 'lisa.park@email.com',
      phone: '+1 (555) 234-5678',
      location: 'Seattle, WA',
      company: 'Park Consulting',
      attributes: {
        'Plan': 'Pro',
        'LTV': '$6,500',
        'Renewal': '2024-11-01'
      },
      isOnline: false,
    },
    lastMessage: 'Got it, thanks for clarifying!',
    timestamp: '2023-10-25T13:20:00Z',
    unreadCount: 0,
    status: 'read',
    channel: 'messenger',
    tags: ['Customer', 'Billing'],
    messages: MESSAGES_LISA,
  },
  {
    id: '8',
    user: {
      id: 'u8',
      name: 'James Wilson',
      avatar: 'https://i.pravatar.cc/150?u=james',
      email: 'james.w@designstudio.com',
      phone: '+1 (555) 345-6789',
      location: 'Austin, TX',
      company: 'Design Studio Co',
      attributes: {
        'Plan': 'Pro',
        'LTV': '$9,200',
        'Feature Request': 'Dark Mode'
      },
      isOnline: true,
    },
    lastMessage: 'That would be amazing! When can we expect this?',
    timestamp: '2023-10-25T11:30:00Z',
    unreadCount: 1,
    status: 'delivered',
    channel: 'whatsapp',
    tags: ['Customer', 'Feature Request'],
    messages: MESSAGES_JAMES,
  },
  {
    id: '9',
    user: {
      id: 'u9',
      name: 'Maria Garcia',
      avatar: 'https://i.pravatar.cc/150?u=maria',
      email: 'maria.garcia@techstart.io',
      phone: '+34 91 123 4567',
      location: 'Madrid, Spain',
      company: 'TechStart IO',
      attributes: {
        'Plan': 'Enterprise',
        'LTV': '$28,000',
        'Issue': 'Calendar Sync',
        'Status': 'Resolved'
      },
      isOnline: false,
    },
    lastMessage: 'The sync is working perfectly now. Thank you so much for your help!',
    timestamp: '2023-10-25T10:50:00Z',
    unreadCount: 0,
    status: 'read',
    channel: 'email',
    tags: ['Customer', 'Support', 'Resolved'],
    messages: MESSAGES_MARIA,
  },
  {
    id: '10',
    user: {
      id: 'u10',
      name: 'Robert Kim',
      avatar: 'https://i.pravatar.cc/150?u=robert',
      email: 'robert.kim@techflow.com',
      phone: '+82 2 1234 5678',
      location: 'Seoul, South Korea',
      company: 'TechFlow Solutions',
      attributes: {
        'Type': 'Partner',
        'Revenue': '$5M+',
        'Status': 'In Discussion'
      },
      isOnline: true,
    },
    lastMessage: 'Sounds great! Let\'s schedule a call next week to discuss details.',
    timestamp: '2023-10-24T17:30:00Z',
    unreadCount: 0,
    status: 'read',
    channel: 'instagram',
    tags: ['Partnership', 'High Value'],
    messages: MESSAGES_ROBERT,
  },
  {
    id: '11',
    user: {
      id: 'u11',
      name: 'Jennifer Lee',
      avatar: 'https://i.pravatar.cc/150?u=jennifer',
      email: 'jennifer.lee@corp.com',
      phone: '+1 (555) 456-7890',
      location: 'San Francisco, CA',
      company: 'Corp Industries',
      attributes: {
        'Plan': 'Enterprise',
        'LTV': '$52,000',
        'Upgrade': 'Completed',
        'Discount': '20% Annual'
      },
      isOnline: true,
    },
    lastMessage: 'Perfect! I\'ve upgraded your account. You should see the new features immediately.',
    timestamp: '2023-10-24T14:10:00Z',
    unreadCount: 0,
    status: 'read',
    channel: 'whatsapp',
    tags: ['Customer', 'Upgrade', 'VIP'],
    messages: MESSAGES_JENNIFER,
  },
  {
    id: '12',
    user: {
      id: 'u12',
      name: 'Kevin Brown',
      avatar: 'https://i.pravatar.cc/150?u=kevin',
      email: 'kevin.brown@email.com',
      phone: '+1 (555) 567-8901',
      location: 'Boston, MA',
      company: 'Brown & Associates',
      attributes: {
        'Plan': 'Pro',
        'Status': 'Cancelled',
        'Refund': 'Processed'
      },
      isOnline: false,
    },
    lastMessage: 'I\'ve processed your refund. You\'ll receive a confirmation email shortly.',
    timestamp: '2023-10-24T12:25:00Z',
    unreadCount: 0,
    status: 'read',
    channel: 'email',
    tags: ['Cancelled', 'Refund'],
    messages: MESSAGES_KEVIN,
  },
  {
    id: '13',
    user: {
      id: 'u13',
      name: 'Sophia Martinez',
      avatar: 'https://i.pravatar.cc/150?u=sophia',
      email: 'sophia.m@devtools.com',
      phone: '+1 (555) 678-9012',
      location: 'Portland, OR',
      company: 'DevTools Inc',
      attributes: {
        'Plan': 'Enterprise',
        'LTV': '$35,000',
        'Integration': 'API'
      },
      isOnline: true,
    },
    lastMessage: 'You\'re welcome! Let me know if you need anything else.',
    timestamp: '2023-10-24T09:45:00Z',
    unreadCount: 0,
    status: 'read',
    channel: 'messenger',
    tags: ['Customer', 'Technical'],
    messages: MESSAGES_SOPHIA,
  },
  {
    id: '14',
    user: {
      id: 'u14',
      name: 'Tom Anderson',
      avatar: 'https://i.pravatar.cc/150?u=tom',
      email: 'tom.anderson@startup.com',
      phone: '+1 (555) 789-0123',
      location: 'Denver, CO',
      company: 'Startup Co',
      attributes: {
        'Plan': 'Trial',
        'Expiry': 'Extended 7 Days',
        'Status': 'Evaluating'
      },
      isOnline: false,
    },
    lastMessage: 'I\'ve extended your trial by 7 days. Enjoy exploring the platform!',
    timestamp: '2023-10-23T16:20:00Z',
    unreadCount: 0,
    status: 'read',
    channel: 'email',
    tags: ['Trial', 'Extension'],
    messages: MESSAGES_TOM,
  },
  {
    id: '15',
    user: {
      id: 'u15',
      name: 'Rachel Green',
      avatar: 'https://i.pravatar.cc/150?u=rachel',
      email: 'rachel.green@qa.com',
      phone: '+1 (555) 890-1234',
      location: 'Toronto, Canada',
      company: 'QA Solutions',
      attributes: {
        'Plan': 'Pro',
        'LTV': '$7,800',
        'Bug Report': 'Fixed'
      },
      isOnline: false,
    },
    lastMessage: 'Thanks for reporting! We\'ve fixed this issue and it will be in the next update.',
    timestamp: '2023-10-23T13:55:00Z',
    unreadCount: 0,
    status: 'read',
    channel: 'whatsapp',
    tags: ['Customer', 'Bug Report'],
    messages: MESSAGES_RACHEL,
  },
  {
    id: '16',
    user: {
      id: 'u16',
      name: 'Chris Taylor',
      avatar: 'https://i.pravatar.cc/150?u=chris',
      email: 'chris.taylor@marketing.com',
      phone: '+1 (555) 901-2345',
      location: 'Miami, FL',
      company: 'Marketing Pro',
      attributes: {
        'Plan': 'Pro',
        'LTV': '$11,200',
        'Onboarding': 'In Progress'
      },
      isOnline: true,
    },
    lastMessage: 'Perfect! I\'ve set up your first campaign. Check your dashboard.',
    timestamp: '2023-10-22T15:30:00Z',
    unreadCount: 0,
    status: 'read',
    channel: 'instagram',
    tags: ['Customer', 'Onboarding'],
    messages: MESSAGES_CHRIS,
  },
];