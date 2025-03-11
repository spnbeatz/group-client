"use client"

import { GroupList } from "@/components/Home/GroupList";
import { IncomingEvents } from "@/components/Home/IncomingEvents";
import React, { useContext, useState } from "react";
import { ColumnWrapper } from "@/components/ColumnWrapper";
import { Transmissions } from "@/components/Home/Transmissions";
import { SuggestedGroups } from "@/components/Home/SuggestedGroups";
import { posts } from "@/config/data";
import { Post } from "@/components/Posts/Post";
import { TestChatList } from "@/components/Chatb/TestChatList";

export default function Home() {

    return (
        <div 
            className="w-full flex flex-row justify-between gap-4 items-start py-5 "
            style={{
                height: "95%"
            }}
        >
            <ColumnWrapper className="w-1/5">
                <IncomingEvents/>
                <TestChatList />
                <SuggestedGroups />
            </ColumnWrapper>
            <ColumnWrapper className="w-2/5">
                {posts.map((post) => {
                    return (
                        <Post key={post.user.toString()} post={post}/>
                    )
                })}
            </ColumnWrapper>

            <ColumnWrapper className="w-1/5">
                
                <Transmissions />
                
                <GroupList />
            </ColumnWrapper>
        </div>
    )
}

