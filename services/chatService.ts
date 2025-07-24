import { getChatList, getChatData } from '@/api/chat';
import { MinUserProps, ChatListItemProps } from '../types';

export const fetchChatList = async (userId: string, token: string | null): Promise<ChatListItemProps[]> => {
  try {
    const chatList = await getChatList(userId, token);
    return chatList;
  } catch (error) {
    console.error('Error fetching chat list', error);
    return [];
  }
};

export const fetchChatData = async (chatId: string, token: string | null) => {
  try {
    const chatData = await getChatData(chatId, token);
    return chatData;
  } catch (error) {
    console.error('Error fetching chat data', error);
    return null;
  }
};
