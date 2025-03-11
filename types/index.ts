import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface MinUserProps {
  id: string;
  username: string;
  avatar: string;
  status: string;
}

export interface ChatSettingsProps {
  background: ChatSettingsBackgroundProps;
}

export interface ChatSettingsBackgroundProps {
  type: string;
  value: string;
}

export interface LastMessageProps {
  chatId: string;
  senderId: string;
  text?: string;
  attachments?: MessageAttachmentsProps[];
}

export interface MessageAttachmentsProps {
  type: string;
  url: string;
}

export interface ChatListItemProps {
  id: string;
  participants: MinUserProps[];
  settings: ChatSettingsProps;
  lastMessage?: LastMessageProps;
}

export interface ActiveChatProps {
  id: string;
  participants: MinUserProps[];
  settings: ChatSettingsProps;
  minimized: boolean;
}

export interface MessageUserProps {
  username: string,
  avatar: string
}

export interface MessageProps {
  date: string,
  user: MessageUserProps,
  messages: string[]
}

// Typy dla załączników
export type AttachmentType = "image" | "video" | "file";

export interface IAttachment {
  type: AttachmentType;
  url: string;
}

// Typy dla reakcji
export interface IReactions {
  likeCount?: number;
  smileCount?: number;
  loveCount?: number;
  angryCount?: number;
}

// Główny interfejs wiadomości
export interface IMessage {
  _id?: string;  // MongoDB ID
  chatId: string;
  senderId: string;
  text?: string;
  attachments?: IAttachment[];
  read?: boolean;
  reactions?: IReactions;
  createdAt?: string; // ISO date string
  updatedAt?: string; // ISO date string
}
