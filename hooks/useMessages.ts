"use client"

import { useState, useEffect } from "react";
import socket from "@/services/chatSocket";
import { FormattedMessagesProps } from "@/types";
import { formatMessages } from "@/utils/chatHelpers";
import { useChatMessages } from "@/queries/useMessages";
import { ISendMessage } from "@/types";


export const useMessages = (chatId: string) => {
    const [messages, setMessages] = useState<FormattedMessagesProps[]>([]);
    const [formattedMessages, setFormattedMessages] = useState<FormattedMessagesProps[]>([]);

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useChatMessages(chatId);

    useEffect(() => {
        if (data) {
            console.log(data, "use effect data messages")
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
        socket.connect();
        socket.emit("joinChat", chatId);

        socket.on("receiveMessage", (message) => {
            console.log(message, " received message")
            console.log(data?.pages.flat(), " lista wiaodmosci do polacznia")
            setMessages((prevMessages) => {
                const updatedMessages = [...prevMessages, message];
                return updatedMessages;
            });
        });

        // zrobic openchat jesli nie jest open 

        return () => {
            socket.emit("leaveChat", chatId);
            socket.off("receiveMessage");
        };
    }, []);

    const newMessage = (message: ISendMessage) => {
        socket.emit("sendMessage", message);
    }


    return { formattedMessages, newMessage, fetchNextPage, hasNextPage, isFetchingNextPage }
}