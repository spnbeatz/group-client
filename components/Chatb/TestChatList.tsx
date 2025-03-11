"use client"

import { Panel } from "../Panel"
import { useChat } from "@/context/ChatContext"
import { createChat } from "@/api/chat"
import { useAuthContext } from "@/context/AuthContext"
import { useEffect } from "react"
import { LoadingScreen } from "../LoadingScreen"

export const TestChatList = () => {

    const { userList, openChat, activeChats } = useChat();
    const { userData } = useAuthContext();

    useEffect(() => {
        console.log(activeChats, "active chats");
    }, [activeChats]);

    const newChat = async (participants: string[]) => {
        try {
            const createdChat = await createChat(participants);
            if(createdChat) {
                console.log("utworzono czat: ", createdChat);
                openChat(createdChat.chatId);
            } else {
                console.log("nie udało się utworzyć czatu!");
            }
        } catch (error) {
            console.log("Błąd podczas próby stworzenia czatu!");
        }
    }

    if (!userList || !userData) {
        return <LoadingScreen/>; // lub inny komunikat o ładowaniu
    }

    return (
        <Panel>
            {userList && userList.map((chat) => {
                console.log(chat, "chat")
                if ( chat.id !== userData.id ){
                    return (
                        <div key={chat.id} className="w-full h-12 flex items-center justify-center" onClick={() => newChat([chat.id, userData.id])}>
                            <p>{chat.id}</p>
                        </div>
                    )
                } else return null;


            })}
        </Panel>
    )
}