
import { Divider } from "@mui/material";
import React from "react";
import { Avatar } from "@heroui/avatar";

export const ChatName = ({avatar, label}: {avatar:string,label:string}) => {
    return (
        <div className="flex flex-row justify-start gap-3 items-center">
            <Avatar isBordered src={avatar} className="w-5 h-5" radius="sm" />
            <div className="font-semibold text-tiny text-gray-700">{label}</div>
        </div>
    )
}