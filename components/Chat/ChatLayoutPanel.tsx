"use client"

import { Chat } from "./Chat"
import { useChat } from "@/context/ChatContext"


export const ChatLayoutPanel = () => {

    const { activeChats } = useChat();

    return (
        <div className="w-screen fixed bottom-0 left-0 flex flex-row justify-end items-end px-4 gap-4 pointer-events-none">
            {activeChats.map((chat) => {
                return (
                    <Chat key={chat.id} chat={chat}/>
                )
            })}
        </div>
    )
}