import { getChatList, getChatData } from '@/api/chat';
import { MinUserProps, ChatListItemProps } from '../types';

export const fetchChatList = async (userId: string): Promise<ChatListItemProps[]> => {
  try {
    const chatList = await getChatList(userId);
    return chatList;
  } catch (error) {
    console.error('Error fetching chat list', error);
    return [];
  }
};

export const fetchChatData = async (chatId: string) => {
  try {
    const chatData = await getChatData(chatId);
    return chatData;
  } catch (error) {
    console.error('Error fetching chat data', error);
    return null;
  }
};
