import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { fetchChatList, fetchChatData } from '../services/chatService';
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { usePolling } from '../hooks/usePolling';
import { ActiveChat } from '@/types/chat';
import { ChatListItem } from '@/types/chat';

interface ChatContextProps {
  activeChats: ActiveChat[];
  chatList: ChatListItem[] | null;
  openChat: (chatId: string) => void;
  closeChat: (chatId: string) => void;
  minimizeChat: (chatId: string, newState: boolean) => void;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

interface ChatProviderProps {
  children: ReactNode;
}

const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const { token, userData } = useSelector((state: RootState) => state.auth);

  const [activeChats, setActiveChats] = useState<ActiveChat[]>([]);
  const [chatList, setChatList] = useState<ChatListItem[] | null>(null);
  
  const pollingIntervalTime = usePolling(10000, () => {
    if (userData?._id) {
      fetchChatList(userData._id, token);
    }
  });

  useEffect(() => {
    if (userData) {
      const fetchChats = async () => {
        const chats = await fetchChatList(userData._id, token);
        setChatList(chats);
      };
      fetchChats();
    }
  }, [userData]);

  const openChat = async (chatId: string) => {
    if (activeChats.some(chat => chat.id === chatId)) return;
    const chatData = await fetchChatData(chatId, token);
    setActiveChats(prevActiveChats => [...prevActiveChats, { ...chatData, minimized: false }]);
  };

  const closeChat = (chatId: string) => {
    setActiveChats(prevActiveChats => prevActiveChats.filter(chat => chat.id !== chatId));
  };

  const minimizeChat = (chatId: string, newState: boolean) => {
    setActiveChats(prevActiveChats =>
      prevActiveChats.map(chat => (chat.id === chatId ? { ...chat, minimized: newState } : chat))
    );
  };

  return (
    <ChatContext.Provider value={{ activeChats, chatList, openChat, closeChat, minimizeChat }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export { ChatProvider };
