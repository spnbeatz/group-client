"use client"

import { useEffect, useState } from "react"
import { Notify } from "./Notify"
import socket from "@/services/notifySocket"
import { useSelector } from "react-redux"
import { RootState } from "@/state/store"
import { AnimatePresence } from "framer-motion"

export interface NotifyProps {
    contendId: string,
    userId: string,
    isRead: boolean,
    content: string,
    sendAt: string,
    type: string,
}

export const NotifyLayout = () => {
    const userData = useSelector((state: RootState) => state.auth.userData);
    const [notifies, setNotifies] = useState<NotifyProps[]>([]);

    console.log("SASDASDA")

    useEffect(() => {
        if (!userData?._id) return;

        socket.connect();
        socket.emit("subscribe", userData._id);

        const handleNotification = (message: NotifyProps) => {
            setNotifies((prev) => [...prev, message]);
        };

        socket.on("new_notification", handleNotification);

        return () => {
            socket.off("new_notification", handleNotification);
        };
    }, [userData?._id]);

    return (
        <div className="fixed top-0 right-0 flex flex-col justify-start items-start px-2 gap-4 pt-[70px] z-50">
            <AnimatePresence>
                {notifies.map((notify, index) => (
                    <Notify
                        key={index}
                        {...notify}
                        onRemove={() => {
                            setNotifies((prev) => prev.filter((n) => n !== notify));
                        }}
                    />
                ))}
            </AnimatePresence>

        </div>
    )
}
