//this specific set of strings is a "union type"
//it ensures strict sfety for message statuses.
export type MessageStatus = 'sent' | 'delivered' | 'read' | 'failed';
export type ChannelType = 'whatsapp' | 'messenger' | 'email' | 'instagram';

export interface User {
    id: string;
    name: string;
    avatar: string;
    isOnline: boolean;

    //  CRM Fields
  email?: string;
  phone?: string;
  location?: string;
  company?: string;
  attributes?: Record<string, string>; // e.g. { "Plan": "Enterprise", "Renewal": "
}

export interface Conversation{
    id: string;
    user: User;
    lastMessage: string;
    timestamp: string;
    unreadCount: number;
    status: MessageStatus;
    isPinned?: boolean;
    channel: ChannelType;
    tags: string[]; 
    messages: Message[];//e.g., ['support', 'vip', 'sales']
}
// This defines which screens exist and what data they expect
export type RootStackParamList = {
  Inbox: undefined; // No data needed to show the Inbox
  ChatDetail: { conversationId: string }; // We MUST pass an ID to open a chat
  ContactDetails: { userId: string }; // We MUST pass a user ID to open contact details
  NewChat: undefined; // No data needed to start a new chat
};
export interface Message {
  id: string;
  text: string;
  senderId: string; // 'me' or 'them'
  timestamp: string;
  type?: 'text' | 'image';//new optional field (defaults to text)
  isInternal?: boolean;
}
