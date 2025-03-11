"use client"

import React, { useState } from "react";
import { groupList } from "@/config/data";
import { Avatar } from "@heroui/avatar";
import { Circle } from "@mui/icons-material";
import { Divider } from "@heroui/divider";
import { ArrowDropDownRounded } from "@mui/icons-material";
import { Groups } from "@mui/icons-material";
import { Panel, PanelIcon, PanelLabel } from "../Panel";


export const GroupList = () => {

    const [ visibleItems, setIsVisibleItems ] = useState<number>(3);

    return (
        <Panel>
            <PanelLabel label="Group List" startContent={<PanelIcon Component={Groups} />}/>
            <div className="w-full flex flex-col items-center justify-center gap-2 mt-2">
                {groupList.map((group, index) => {
                    if(index < visibleItems) {
                        return (
                            <div className="w-full flex flex-row cursor-pointer items-center justify-start gap-2 pr-4 py-1 hover:bg-slate-300 duration-250 rounded-lg" key={group.name + index}>
                                <Avatar src={group.image} size="sm" />
                                <div className="flex flex-col items-start justify-center">
                                    <p className="text-slate-700 font-semibold text-small">{group.name}</p>
                                    {group.newPostsCount > 0 ? 
                                    (
                                        <div className="flex flex-row items-center justify-start gap-1">
                                            <Circle 
                                                className="text-rose-700"
                                                style={{
                                                    fontSize: "10px"
                                                }}    
                                            />
                                            <p className="text-tiny">{group.newPostsCount} new posts.</p>
                                        </div> 
                                        ) : (
                                            <p className="text-tiny">There are no new posts.</p>
                                        )}
                                </div>
                            </div>
                        )
                    }



                })}
                {groupList.length > visibleItems && <div className="w-full flex flex-col gap-2 items-center justify-center cursor-pointer">
                    <Divider />
                    <div className="flex flex-row justify-center items-center hover:brightness-200 hover:text-indigo-900 duration-200">
                        <p  onClick={() => setIsVisibleItems(prev => prev + 3)} className="font-semibold" style={{fontSize: "10px"}}>More groups</p>
                        <ArrowDropDownRounded fontSize="small"/>
                    </div>
                    
                </div>}
            </div>
        </Panel>
    )
}