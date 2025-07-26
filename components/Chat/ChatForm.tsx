import React, { useState } from "react";
import { Input } from "@heroui/input";
import { Form } from "@heroui/form";
import { Button } from "@heroui/button";
import { NearMeRounded as SendIcon } from "@mui/icons-material";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import { ChatParticipant, ISendMessage } from "@/types/chat";
import { useMessages } from "@/hooks/useMessages";


export const ChatForm = (
    {
        chatId
    }: {
        chatId: string
    }
) => {

    const userData = useSelector((state: RootState) => state.auth.userData);
    const participants: ChatParticipant[] | undefined = useSelector((state: RootState) =>
        state.chat.activeChats.find(chat => chat.id === chatId)?.participants
    );

    const [message, setMessage] = useState<string>("");
    const { newMessage } = useMessages(chatId);

    const sendMessage = () => {
        if (message.length > 0 && userData && participants) {
            const newTextMessage: ISendMessage = {
                chatId,
                sender: {
                    id: userData._id,
                    username: userData.username,
                    avatar: userData.avatar
                },
                receivers: participants?.filter((user) => user.id !== userData._id),
                content: message
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
                <SendIcon fontSize="small" className="text-[#687b9f]" />
            </Button>
        </Form>
    )
}