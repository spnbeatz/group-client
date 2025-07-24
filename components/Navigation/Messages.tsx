"use client"

import {  Dropdown,  DropdownTrigger,  DropdownMenu,  DropdownSection,  DropdownItem} from "@heroui/dropdown";
import { Avatar } from "@heroui/avatar";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { ChatBubble } from "@mui/icons-material";
import { ChatListItemProps } from "@/types";
import {Badge} from "@heroui/badge";
import { useChatQuery } from "@/queries/useChat";

export const Messages = () => {

    const chatList = useSelector((state: RootState) => state.chat.chatList);
    const { openChat, getChatListQuery } = useChatQuery();

    getChatListQuery()


    return (
        <div className="flex items-center gap-4">
            <Dropdown placement="bottom-start">
                <DropdownTrigger>
                    <ChatBubble fontSize="small" className="text-gray-500"/>
                </DropdownTrigger>
                <DropdownMenu>
                    {(chatList ?? []).map((chat,index) => {
                        return (
                            <DropdownItem key={chat.id + index} className="h-14 gap-2" onAction={() => openChat(chat.id)}>
                                <MessagesListItem chat={chat} />
                            </DropdownItem>
                        )

                    })}


                </DropdownMenu>
            </Dropdown>
        </div>
    )
}

const MessagesListItem = ({chat} : {chat: ChatListItemProps}) => {

    const getStatusColor = (status: string) => {
        switch(status){
            case "online":
                return "primary";
            case "offline":
                return "default";
            default:
                return "warning"
        }
    }

    const userData = useSelector((state: RootState) => state.auth.userData);
    return (
        <div className="w-full h-full flex flex-row items-center justify-start gap-2">
            <Badge /* color={getStatusColor(chat.participants.find(user => user._id !== userData?._id)?.status || "offline")} */  color="default" content="" placement="bottom-right" shape="circle">
                <Avatar size="sm" isBordered src={chat.participants.find(user => user._id !== userData?._id)?.avatar} />
            </Badge>
            
            <div className="flex flex-col justify-center items-start">
                {chat.participants.map((participant, index) => {
                    if(participant._id !== userData?._id){
                        return (
                            <p className="text-xs font-semibold text-gray-500" key={participant._id + participant.avatar}>
                                {participant.username} 
                                {chat.participants.length -1 > 2
                                    ? index > 1 && index !== chat.participants.length - 2 
                                        ? ", " 
                                        : " and "
                                    : chat.participants.length === 2 && index !== chat.participants.length - 2 
                                        ? " and " 
                                        : ""}
                            </p>
                        )
                    }

                })}
                <p className="text-tiny text-gray-400">{chat.lastMessage ? chat.lastMessage.text : "No new messages!"}</p>

            </div>
        </div>
    )
}