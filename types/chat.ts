import { MessageUser } from "./user";
import { Reactions } from "./reactions";

export type ChatParticipant = {
    username: string,
    id: string,
    avatar: string,
    _id?: String
}

export interface ChatListItem {
  id: string;
  participants: ChatParticipant[];
  settings: ChatSettings;
  lastMessage?: LastMessage;
}
// STARE: ChatListItemProps

export interface ActiveChat {
  id: string;
  participants: ChatParticipant[];
  settings: ChatSettings;
  minimized: boolean;
}

export interface IMessage {
  id?: string; // MongoDB ID
  chatId: string;
  senderId: string;
  text?: string;
  attachments?: Attachment[];
  read?: boolean;
  reactions?: Reactions;
  createdAt?: string;
  updatedAt?: string;
}

export interface ISendMessage {
  id?: string; // MongoDB ID
  chatId: string;
  sender: ChatParticipant;
  receivers: ChatParticipant[];
  content?: string;
  attachments?: Attachment[];
  read?: boolean;
  reactions?: Reactions;
  createdAt?: string;
  updatedAt?: string;
}

export interface Message {
  chatId: string;
  id?: string;
  date: string;
  user: MessageUser;
  messages: string[];
}
// STARE: MessageProps

export interface FormattedMessagesProps {
  chatId: string,
  id?: string,
  date: string,
  user: MessageUser,
  messages: {message: string, id: string}[]
}

export interface LastMessage {
  chatId: string;
  senderId: string;
  text?: string;
  attachments?: MessageAttachment[];
}
// STARE: LastMessageProps

export interface MessageAttachment {
  type: string;
  url: string;
}
// STARE: MessageAttachmentsProps

export type AttachmentType = "image" | "video" | "file";
// STARE: AttachmentType

export interface Attachment {
  type: AttachmentType;
  url: string;
}

// settings

export interface ChatBackgroundSettings {
  type: string;
  value: string;
}

// STARE: ChatSettingsBackgroundProps

export interface ChatSettings {
  background: ChatBackgroundSettings;
}

// STARE: ChatSettingsProps