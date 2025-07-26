"use client"

import { useState, useEffect } from "react";
import { FormattedMessagesProps, Message } from "@/types/chat";
import { formatMessages } from "@/utils/chatHelpers";
import { useChatMessages } from "@/queries/useMessages";
import { ISendMessage } from "@/types/chat";
import { useMessageSocket } from "@/context/MessageContextProvider";


export const useMessages = (chatId: string) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [formattedMessages, setFormattedMessages] = useState<FormattedMessagesProps[]>([]);

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useChatMessages(chatId);

    const socket = useMessageSocket();

    useEffect(() => {
        refetch();
    }, [])

    useEffect(() => {
        if (data) {
            setMessages(data.pages.flat())
        }
    }, [data])

    useEffect(() => {
        if (messages) {
            const formattedMessages = formatMessages(messages);
            setFormattedMessages(formattedMessages);
        }
    }, [messages])

    useEffect(() => {
        console.log(formattedMessages, "formatted")
    }, [formattedMessages])

    useEffect(() => {
        if (!socket || !chatId) return;

        const handleReceiveMessage = (message: Message) => {
            console.log("Received message:", message);

            setMessages((prevMessages: Message[]) => {
                return [...prevMessages, message];
            });
        };

        socket.emit("joinChat", chatId);
        socket.on("receiveMessage", handleReceiveMessage);

        return () => {
            socket.emit("leaveChat", chatId);
            socket.off("receiveMessage", handleReceiveMessage); // ważne!
        };
    }, [socket, chatId]);

    const newMessage = (message: ISendMessage) => {
        if (!socket) {
            console.warn("Socket not initialized yet.");
            return;
        }

        if (!socket.connected) {
            socket.connect(); // opcjonalnie
        }

        socket.emit("sendMessage", message);
    };



    return { formattedMessages, newMessage, fetchNextPage, hasNextPage, isFetchingNextPage }
}