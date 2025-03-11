"use client"

import React, { useContext, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { GroupCreationModal } from "@/components/GroupCreationModal/GroupCreationModal";


import { ChatMembersPanel } from "@/components/Chat/ChatMembersPanel";
import { GroupInfoPanel } from "@/components/GroupInfo/GroupInfoPanel";
import { PostsScrollContainer } from "@/components/Posts/PostsScrollContainer";
import { ColumnWrapper } from "@/components/ColumnWrapper";

export default function Group() {
    const { logout, userData } = useAuthContext();
    const [ groupCreation, setGroupCreation ] = useState<boolean>(false);

    const openGroupCreationModal = () => {
        setGroupCreation(true);
    } 

    const closeGroupCreationModal = () => {
        setGroupCreation(false);
    }
    return (
        <div 
            className="w-full flex flex-row justify-between gap-4 items-start py-5 "
            style={{
                height: "95%"
            }}
        >
            {groupCreation && <GroupCreationModal closeModal={closeGroupCreationModal} />}
{/*             <p>{userData?.username}</p> */}
            <button className="rounded-full bg-black w-5 h-5 absolute" type="button" onClick={() => logout()}></button>
{/*             <button type="button" onClick={() => openGroupCreationModal()}> open modal</button> */}
            <ColumnWrapper className="w-1/4">
                <GroupInfoPanel />
            </ColumnWrapper>
            <PostsScrollContainer />
            <div className="flex flex-row items-start justify-center gap-4 h-full w-1/4">
            
                <ColumnWrapper>
                    <ChatMembersPanel />
                </ColumnWrapper>
            </div>
            
        </div>
    )
}
