"use client"

import { ChatForm } from "./ChatForm";
import { ChatBody } from "./ChatBody";
import { ActiveChat } from "@/types/chat";
import { ChatMinimized } from "./ChatMinimized";
import { ChatHeader } from "./ChatHeader";

export const Chat = ({ chat }: { chat: ActiveChat }) => {

    if (chat.minimized) return <ChatMinimized chat={chat} />;

    return (
        <div className="w-64 h-96 bg-white rounded-md overflow-hidden border-1 border-[#687b9f] shadow-large z-50 flex flex-col justify-between items-center pointer-events-auto">
            <ChatHeader chat={chat} />
            <ChatBody chatId={chat.id} />
            <ChatForm chatId={chat.id} />
        </div>
    );
};
