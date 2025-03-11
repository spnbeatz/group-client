import React from "react";
import { UserMenu } from "./Navigation/UserMenu";
import { Search } from "./Navigation/Search";
import { Menu } from "./Navigation/Menu";
import { Messages } from "./Navigation/Messages";
import { Row } from "./Row";
import { Notifications } from "./Navigation/Notifications";

const navigationItems = [
    {
        icon: ""
    },
    {
        icon: ""
    },
    {
        icon: ""
    },
    {
        icon: ""
    }
]

export const Navigation = () => {
    return (
        <div className="h-16 bg-white w-full flex flex-row justify-between items-center px-8 fixed z-50 shadow-md">
            <Menu />
            <Search />
            <Row className="gap-4">
                <Messages />
                <Notifications />
                <UserMenu />
            </Row>
            
            
        </div>
    )
}