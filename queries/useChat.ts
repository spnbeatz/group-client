"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as chat from "@/api/chat";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { setChatList, addActiveChat } from "@/state/reducers/chatSlice";
import { ChatParticipant } from "@/types/chat";
import { store } from "@/state/store";



export const useChatQuery = () => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const { token, userData } = useSelector((state: RootState) => state.auth);
    const activeChats = useSelector((state: RootState) => state.chat.activeChats);

    const openChat = async (chatId: string) => {
        const state = store.getState();
        const activeChats = state.chat.activeChats;

        if (activeChats.some((chat) => chat.id === chatId)) {
            console.log("chat już otwarty");
            return;
        }

        try {
            const chatData = await chat.getChatData(chatId, token);
            dispatch(addActiveChat({ ...chatData, minimized: false }));
        } catch (error) {
            console.error("Failed to fetch chat data:", error);
        }
    };

    const createChatMutation = useMutation({
        mutationFn: async (participants: ChatParticipant[]) => {
            const { chatId } = await chat.createChat(participants, token);
            await openChat(chatId); // 🔹 Po utworzeniu od razu otwieramy czat
        },
        onError: (error) => {
            console.error("Failed creating chat:", error);
        },
    });

    const getChatListQuery = () => useQuery({
        queryKey: ["chatList", token],
        queryFn: async () => {
            if (token && userData) {
                const data = await chat.getChatList(userData._id, token);
                dispatch(setChatList(data));
                return data;
            } else throw new Error("Brak tokena");

        },
        refetchInterval: 10000, // Polling co 10 sekund
        enabled: !!token && !!userData,
    })

    return { createChatMutation, getChatListQuery, openChat }

}
