import React from "react";
import {Avatar, AvatarGroup, AvatarIcon} from "@heroui/avatar";
import { members } from "@/config/data";
import {Badge} from "@heroui/badge";
import {Tooltip} from "@heroui/tooltip";
import {Divider} from "@heroui/divider";
import { Diversity1 } from "@mui/icons-material";
import { PanelIcon, PanelLabel } from "../Panel";

export const ChatMembersPanel = () => {
    return (
        <div className="h-full rounded-lg bg-white flex flex-col justify-start items-center p-2 gap-2">
            <PanelLabel 
                label="Members" 
                startContent={(<PanelIcon Component={Diversity1} />)}
                className="p-2"
            />
            <div className="overflow-y-scroll px-2" style={{scrollbarWidth: "none"}}>
                <AvatarGroup 
                    isBordered 
                    isGrid 
                    max={members.length} 
                    classNames={{
                        base: "grid-cols-1 py-2"
                    }}>
                    {members.map((member) => {
                        return (
                            <Member member={member} key={`${member.avatar}${member.name}`}/>
                        )
                    })}
                </AvatarGroup>
            </div>

        </div>
    )
}

interface MemberProps {
    name: string,
    online: boolean,
    avatar: string
}

const Member = ({member}: {member: MemberProps}) => {
    return (
        <Badge 
            color={member.online ? "success" : "default"}
            shape="circle"
            placement="bottom-right"
            content=""
        >
            <Tooltip content={member.name} showArrow color="foreground" size="sm">
                <Avatar 
                    size="md"
                    color="danger"
                    src={member.avatar} 
                    className="hover:scale-110"
                />
            </Tooltip>

        </Badge>
        
    )
}