import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatListItemProps, ActiveChatProps } from '@/types';

interface ChatState {
  chatList: ChatListItemProps[] | null;
  activeChats: ActiveChatProps[];
}

const initialState: ChatState = {
  chatList: null,
  activeChats: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChatList: (state, action: PayloadAction<ChatListItemProps[] | null>) => {
      state.chatList = action.payload;
    },
    addActiveChat: (state, action: PayloadAction<ActiveChatProps>) => {
      state.activeChats.push(action.payload);
    },
    removeActiveChat: (state, action: PayloadAction<string>) => {
      state.activeChats = state.activeChats.filter(chat => chat.id !== action.payload);
    },
    updateMinimizedChat: (state, action: PayloadAction<{ chatId: string; minimized: boolean }>) => {
      const chat = state.activeChats.find(chat => chat.id === action.payload.chatId);
      if (chat) {
        chat.minimized = action.payload.minimized;
      }
    },
  },
});

export const { setChatList, addActiveChat, removeActiveChat, updateMinimizedChat } = chatSlice.actions;
export default chatSlice.reducer;
