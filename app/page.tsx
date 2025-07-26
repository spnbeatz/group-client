"use client"

import { GroupList } from "@/components/Home/GroupList";
import { IncomingEvents } from "@/components/Home/IncomingEvents";
import { ColumnWrapper } from "@/components/ColumnWrapper";
import { Transmissions } from "@/components/Home/Transmissions";
import { SuggestedGroups } from "@/components/Home/SuggestedGroups";
import { Posts } from "@/components/Posts/Posts";

export default function Home() {

    return (
        <div className='w-full h-[95%] flex flex-row justify-center gap-4 items-start py-5'>
            <ColumnWrapper className="w-full max-w-[400px] hidden lg:flex">
                <IncomingEvents />
                <SuggestedGroups />
            </ColumnWrapper>
            <Posts className="max-w-[600px] flex-shrink-0" />
            <ColumnWrapper className="w-full max-w-[400px] hidden lg:flex">
                <Transmissions />
                <GroupList />
            </ColumnWrapper>
        </div>
    )
}

