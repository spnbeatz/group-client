import React from "react";
import { NavUserDropdown } from "./NavUserDropdown";
import { Search } from "./Search";
import { NavMessagesDropdown } from "./NavMessagesDropdown";
import { Row } from "../Row";
import { NavNotifyDropdown } from "./NavNotifyDropdown";


export const Navigation = () => {
    return (
        <div className="h-16 bg-white w-full flex flex-row justify-between items-center px-8 fixed z-50 shadow-md">
            <Search />
            <Row className="gap-4">
                <NavMessagesDropdown />
                <NavNotifyDropdown />
                <NavUserDropdown />
            </Row>
        </div>
    )
}