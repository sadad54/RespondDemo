export interface Message {
  id: string;
  text: string;
  senderId: string; // 'me' or 'them'
  timestamp: string;
  type?: 'text' | 'image';//new optional field (defaults to text)
  isInternal?: boolean;
}



export const MOCK_MESSAGES: Message[] = [
  {
    id: 'm1',
    text: 'Great, see you then!',
    senderId: 'me',
    timestamp: '2023-10-25T14:35:00Z',
  },
  {
    id: 'm2',
    text: 'How about 2 PM on Tuesday?',
    senderId: 'them',
    timestamp: '2023-10-25T14:32:00Z',
  },
  {
    id: 'm3',
    text: 'Hi! I wanted to follow up on our meeting.',
    senderId: 'me',
    timestamp: '2023-10-25T14:30:00Z',
  },
  {
    id: 'm4',
    text: 'Hello!',
    senderId: 'them',
    timestamp: '2023-10-25T09:00:00Z',
  },
  {
    id: 'm0',
    text: 'Client is asking for a discount. @Manager, can we approve 10%?',
    senderId: 'me',
    timestamp: '2023-10-25T14:40:00Z',
    isInternal: true, // <--- This is a private note!
  },
  // Add more to test scrolling!
];