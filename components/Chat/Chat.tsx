"use client"

import { useEffect, useState } from "react"
import { ChatForm } from "./ChatForm";
import { ChatPanel } from "./ChatPanel";
import { ActiveChatProps, IMessage, MessageProps } from "@/types";
import { ChatMinimized } from "./ChatMinimized";
import { ChatLabel } from "./ChatLabel";
import { formatDate } from "@/config/dateFormat";
import { io } from "socket.io-client";
import { getMessages } from "@/api/chat";

const socket = io("http://localhost:4000");

export const Chat = ({ chat }: { chat: ActiveChatProps }) => {
    const [messages, setMessages] = useState<MessageProps[]>([]);
    const [limit, setLimit] = useState<number>(20);

    useEffect(() => {
        socket.emit("joinChat", chat.id);

        socket.on("receiveMessage", (data) => {
            setMessages((prevMessages) => {
                const updatedMessages = [...prevMessages, data];
                return formatMessages(updatedMessages); // Zastosuj formatowanie po dodaniu wiadomości
            });
          });
      
          return () => {
            socket.emit("leaveChat", chat.id);
            socket.off("receiveMessage");
          };
    },[]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const messageList = await getMessages(chat.id, limit); // Pobieramy wiadomości
                console.log("fetched chat messages: ", messageList);
                const reversedMessages = messageList.reverse();
                setMessages(formatMessages(reversedMessages));
            } catch (error) {
                console.error("Błąd podczas pobierania wiadomości:", error);
            }
        };
    
        fetchMessages();
    }, [chat, limit]);
    

    const formatMessages = (messages: MessageProps[]) => {
        // Przechowujemy zmodyfikowaną listę wiadomości
        const updatedMessages: MessageProps[] = [];
    
        messages.forEach((message: MessageProps) => {
            // Sprawdzamy, czy mamy już wiadomość w tej samej "grupie"
            const lastMessage = updatedMessages[updatedMessages.length - 1];
            
            if (
                lastMessage && 
                formatDate(message.date, "chat") === formatDate(lastMessage.date, "chat") && // Sprawdzamy, czy są w tej samej minucie
                message.user.username === lastMessage.user.username // Sprawdzamy, czy to ta sama osoba
            ) {
                // Jeśli tak, dodajemy wiadomość do tej samej grupy
                lastMessage.messages.push(message.messages[0]);
            } else {
                // Jeśli nie, tworzymy nową grupę dla tej wiadomości
                updatedMessages.push({
                    date: message.date,
                    user: message.user,
                    messages: message.messages, // Zaczynamy nową grupę
                });
            }
        });
    
        // Ustawiamy zaktualizowaną listę wiadomości
        return updatedMessages;
    };

    const newMessage = (message: IMessage) => {
        socket.emit("sendMessage", { message });
    }

    if (chat.minimized) return <ChatMinimized chat={chat}/>;
    
    return (
        <div className="w-64 h-96 bg-white rounded-md overflow-hidden border-1 border-[#687b9f] shadow-large z-50 flex flex-col justify-between items-center pointer-events-auto">
            <ChatLabel chat={chat} />
            <ChatPanel messages={messages} />
            <ChatForm newMessage={newMessage} chatId={chat.id}/>
        </div>
    );
};
