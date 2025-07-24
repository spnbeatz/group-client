import { SVGProps } from "react";
import { Participant } from "./chat";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface MinUserProps {
  _id: string;
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
  participants: ChatParticipants[];
  settings: ChatSettingsProps;
  lastMessage?: LastMessageProps;
}

export interface ChatParticipants {
  id: string,
  username: string,
  avatar: string,
  _id?:string
}

export interface ActiveChatProps {
  id: string;
  participants: ChatParticipants[];
  settings: ChatSettingsProps;
  minimized: boolean;
}

export interface MessageUserProps {
  username: string,
  avatar: string
}

export interface MessageProps {
  id?: string,
  date: string,
  user: MessageUserProps,
  messages: string[]
}

export interface FormattedMessagesProps {
  id?: string,
  date: string,
  user: MessageUserProps,
  messages: {message: string, id: string}[]
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

export interface ISendMessage {
  _id?: string;  // MongoDB ID
  chatId: string;
  sender: Participant;
  receivers: Participant[];
  content?: string;
  attachments?: IAttachment[];
  
  read?: boolean;
  reactions?: IReactions;
  createdAt?: string; // ISO date string
  updatedAt?: string; // ISO date string
}


export interface PostProps {
  _id: string,
  user: string,
  content: {
      text: string,
      attachments?: [{
          type: string,
          id: string
      }]
  },
  metadata: {
      views: number,
      likes: number,
      shares: number
  },
  createdAt: string,
  updatedAt: string
}

export interface CommentProps {
  _id?: string
  userId: string,
  postId: string,
  parentCommentId: string | null,
  content: string,
  createdAt?: string,
  updatedAt?: string,
  childCount?: number,
  childComments?: CommentProps[]
}

export interface ReactionProps {
  _id?: string,
  userId: string,
  contentId: string,
  contentType: string,
  reactionType: string
}

interface CountsProps {
  users: string[] | [],
  count: number
}

export interface ReactionCountsProps {
  reactions: ReactionKeysProps,
  total: CountsProps
}

export interface ReactionKeysProps {
  like?: CountsProps,
  laugh?: CountsProps,
  angry?: CountsProps,
  love?: CountsProps,
  sad?: CountsProps,
}