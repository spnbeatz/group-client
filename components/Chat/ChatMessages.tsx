import React, { useEffect, useRef } from "react";
import { Message } from "./Message";
import { useMessages } from "@/hooks/useMessages";


export const ChatMessages = ({chatId} : {chatId: string}) => {

    const chatRef = useRef<HTMLDivElement>(null);
    const { formattedMessages, fetchNextPage, hasNextPage, isFetchingNextPage } = useMessages(chatId);

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [formattedMessages]);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const target = e.currentTarget as HTMLDivElement;
        const { scrollTop, scrollHeight, clientHeight } = target;
        if (scrollTop + clientHeight >= scrollHeight - 10 && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    };


    return (
        <div className="w-full h-full flex flex-col justify-between items-center p-1 pb-6 gap-2 rounded-lg max-h-72">
            <div
                onScroll={handleScroll}
                className="w-full h-full flex flex-col-reverse gap-2 justify-start overflow-hidden overflow-y-auto"
                ref={chatRef} 
            >
                {isFetchingNextPage && <p>loading</p>}
                {formattedMessages && formattedMessages.slice().reverse().map((message) => (
                    <Message message={message} key={message.date} />
                ))}
            </div>
        </div>

    )
}