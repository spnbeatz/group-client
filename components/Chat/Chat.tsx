"use client"

import { ChatForm } from "./ChatForm";
import { ChatMessages } from "./ChatMessages";
import { ActiveChatProps } from "@/types";
import { ChatMinimized } from "./ChatMinimized";
import { ChatLabel } from "./ChatLabel";

export const Chat = ({ chat }: { chat: ActiveChatProps }) => {

    if (chat.minimized) return <ChatMinimized chat={chat}/>;
    
    return (
        <div className="w-64 h-96 bg-white rounded-md overflow-hidden border-1 border-[#687b9f] shadow-large z-50 flex flex-col justify-between items-center pointer-events-auto">
            <ChatLabel chat={chat} />
            <ChatMessages chatId={chat.id}/>
            <ChatForm chatId={chat.id}/>
        </div>
    );
};
