import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { fetchChatList, fetchChatData } from '../services/chatService';
import { useAuthContext } from './AuthContext';
import { usePolling } from '../hooks/usePolling';
import { ChatListItemProps, ActiveChatProps } from '../types';

interface ChatContextProps {
  activeChats: ActiveChatProps[];
  chatList: ChatListItemProps[] | null;
  openChat: (chatId: string) => void;
  closeChat: (chatId: string) => void;
  minimizeChat: (chatId: string, newState: boolean) => void;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

interface ChatProviderProps {
  children: ReactNode;
}

const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const { token, userData } = useAuthContext();
  const [activeChats, setActiveChats] = useState<ActiveChatProps[]>([]);
  const [chatList, setChatList] = useState<ChatListItemProps[] | null>(null);
  
  const pollingIntervalTime = usePolling(10000, () => {
    if (userData?.id) {
      fetchChatList(userData.id);
    }
  });

  useEffect(() => {
    if (userData) {
      const fetchChats = async () => {
        const chats = await fetchChatList(userData.id);
        setChatList(chats);
      };
      fetchChats();
    }
  }, [userData]);

  const openChat = async (chatId: string) => {
    if (activeChats.some(chat => chat.id === chatId)) return;
    const chatData = await fetchChatData(chatId);
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
