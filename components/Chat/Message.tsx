import React, { useState } from "react";
import { Avatar } from "@heroui/avatar";
import { MessageProps } from "@/types";
import { useAuthContext } from "@/context/AuthContext";
import { Divider } from "@heroui/divider";
import { formatDate } from "@/config/dateFormat";
import { Bubble } from "./Bubble";


export const Message = (
    {
        message
    }: {
        message: MessageProps
    }) => {

    const { userData } = useAuthContext();

    const styles = {
        owner: "flex-row-reverse",
        other: "flex-row"
    }
    const [ isOwner, setIsOwner ] = useState<boolean>(message.user.username === userData?.username);

    return (
        <div className="w-full flex flex-col justify-center items-center px-4">
            <div className="w-full flex flex-row justify-center items-center">
                <Divider />
                <p 
                    className=" text-gray-500 p-2"
                    style={{
                        fontSize: "10px"
                    }}
                >{formatDate(message.date, "chat")}</p>
                <Divider />
            </div>
            <div className={`w-full flex justify-start items-end gap-2 ${styles[isOwner ? "owner" : "other"]}`}>
                <Avatar src={message.user.avatar} className="w-7 h-7 flex-shrink-0"/>
                <div className="flex flex-col gap-1 w-full">
                    {message.messages.map((msg, index)=>{
                        return (
                            <Bubble 
                                index={index} 
                                length={message.messages.length} 
                                message={msg}
                                isOwner={isOwner}
                                key={msg + index + message.messages.length + "asdasda"}
                            />
                        )
                    })}
                </div>

                
            </div>
        </div>

    )
}