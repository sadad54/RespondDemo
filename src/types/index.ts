//this specific set of strings is a "union type"
//it ensures strict sfety for message statuses.
export type MessageStatus = 'sent' | 'delivered' | 'read' | 'failed';

export interface User {
    id: string;
    name: string;
    avatar: string;
    isOnline: boolean;
}

export interface Conversation{
    id: string;
    user: User;
    lastMessage: string;
    timestamp: string;
    unreadCount: number;
    status: MessageStatus;
    isPinned?: boolean;
}