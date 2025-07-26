"use client"

import { useInfiniteQuery } from "@tanstack/react-query";
import { getMessages } from "@/api/chat";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

export const useChatMessages = (chatId: string, limit = 20) => {
    const token = useSelector((state: RootState) => state.auth.token);

    return useInfiniteQuery({
        queryKey: ["chatMessages", chatId, token],
        queryFn: async ({ pageParam = 0 }) => {
            if (!chatId) throw new Error("Brak chatId");
            return await getMessages(chatId, pageParam, limit, token);
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length === limit ? allPages.length * limit : undefined;
        },
        enabled: !!chatId,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });
};
