import { getChatList, getChatData } from '@/api/chat';
import { ChatListItem } from '@/types/chat';

export const fetchChatList = async (userId: string, token: string | null): Promise<ChatListItem[]> => {
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
