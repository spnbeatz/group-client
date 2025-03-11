import React, { useState } from "react";
import { Input } from "@heroui/input";
import { Form } from "@heroui/form";
import { Button } from "@heroui/button";
import { NearMeRounded as SendIcon } from "@mui/icons-material";
import { useAuthContext } from "@/context/AuthContext";
import { IMessage } from "@/types";


export const ChatForm = (
    {
        newMessage,
        chatId
    }:{
        newMessage: (message: any) => void,
        chatId: string
    }
) => {

    const { userData } = useAuthContext();

    const [ message, setMessage ] = useState<string>("");

    const sendMessage = () => {
        if(message.length > 0 && userData){
            const newTextMessage: IMessage = {
                chatId,
                senderId: userData.id,
                text: message
            }

            newMessage(newTextMessage);
            setMessage("");
        }
    }

    return (
        <Form className="w-full rounded-lg flex  p-2 flex-row justify-between items-center ">
            <Input 
                placeholder="Write your message" 
                type="text" 
                size="sm"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                classNames={{
                    input: "text-xs"
                }}
            />
            <Button 
                isIconOnly 
                size="sm" 
                className="flex justify-center items-center bg-white"
                onPress={() => sendMessage()}
            >
                <SendIcon fontSize="small" className="text-[#687b9f]"/>
            </Button>
        </Form>
    )
}