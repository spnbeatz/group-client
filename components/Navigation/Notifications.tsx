"use client"

import {  Dropdown,  DropdownTrigger,  DropdownMenu,  DropdownSection,  DropdownItem} from "@heroui/dropdown";
import { Notifications as Notify } from "@mui/icons-material";

export const Notifications = () => {

    return (
        <div className="flex items-center gap-4">
            <Dropdown placement="bottom-start">
                <DropdownTrigger>
                    <Notify fontSize="small" className="text-gray-500"/>
                </DropdownTrigger>
                <DropdownMenu>
                    <DropdownItem key="profile" className="h-14 gap-2">
                        <p>here will be message list item</p>
                    </DropdownItem>

                </DropdownMenu>
            </Dropdown>
        </div>
    )
}