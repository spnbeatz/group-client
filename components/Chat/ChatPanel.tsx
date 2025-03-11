import React, { useEffect, useState, useRef } from "react";
import { ChatName } from "./ChatName";
import { exampleMessages } from "@/config/data";
import { Message } from "./Message";
import { MessageProps } from "@/types";
import { PanelLabel, PanelIcon } from "../Panel";
import { chats } from "@/config/data";
import { Forum } from "@mui/icons-material";

export const ChatPanel = (
    {
        messages,

    } : {
        messages: MessageProps[],

    }
) => {

    const chatRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages]);


    return (
        <div className="w-full h-full flex flex-col justify-between items-center p-1 pb-6 gap-2 rounded-lg max-h-72">

            <div
                className="w-full h-full flex flex-col-reverse gap-2 justify-start overflow-hidden overflow-y-auto"
                ref={chatRef} 
            >
                {/* Odwracamy kolejność wiadomości */}
                {messages.slice().reverse().map((message) => (
                    <Message message={message} key={message.date} />
                ))}
            </div>
        </div>

    )
}