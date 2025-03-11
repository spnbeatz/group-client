
import React from "react";
import { Listbox, ListboxItem } from "@heroui/listbox";
import { chats } from "@/config/data";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { PlaylistAdd } from "@mui/icons-material";
import { Diversity2 } from "@mui/icons-material";
import { PanelIcon, PanelLabel } from "../Panel";

export const ChatList = (
    {
        selectChat
    } : {
        selectChat: (id:string) => void
    }
) => {
    return (
        <div
            className="w-full h-3/4 bg-white rounded-lg flex flex-col justify-between items-center py-4 gap-2"
        >
            <PanelLabel 
                label="Group Chats" 
                className="px-4"
                startContent={(
                    <PanelIcon Component={Diversity2} />
                )}
            />
            <Listbox
                classNames={{
                    base: "w-full",
                    list: "overflow-scroll",
                    }}
                className="h-full"
                items={chats}
                onAction={(item) => selectChat(item.toString())}
            >
                {(item) => (
                    <ListboxItem key={item.id}>
                        <div className="flex gap-4 items-center">
                            <Avatar alt={item.name} className="flex-shrink-0" size="sm" src={item.image} />
                            <div className="flex flex-col">
                                <span className="text-small font-semibold">{item.name}</span>
                                <div className="flex flex-row justify-start items-center gap-2">
                                    <span className="text-tiny font-semibold text-default-500">Patryk P: </span>
                                    <span className="text-tiny text-default-500">Hello !</span>
                                </div>

                            </div>
                        </div>
                    </ListboxItem>
                )}

            </Listbox>
            <div className="w-full px-4">
                <Button
                    variant="light"
                    className="w-full text-xs text-gray-600"
                >
                    <PlaylistAdd color="inherit" fontSize="medium" />
                    <p>Create new chat</p>
                </Button>
            </div>


        </div>
    )
}