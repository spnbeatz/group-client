"use client"

import { Chat } from "./Chat"
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";

export const ChatLayout = () => {

    const activeChats = useSelector((state: RootState) => state.chat.activeChats);

    return (
        <div className="w-screen fixed bottom-0 left-0 flex flex-row justify-end items-end px-4 gap-4 pointer-events-none">
            {activeChats.map((chat) => {
                return (
                    <Chat key={chat.id} chat={chat} />
                )
            })}
        </div>
    )
}