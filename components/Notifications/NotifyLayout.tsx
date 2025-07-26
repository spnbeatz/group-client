"use client"

import { useEffect, useState } from "react"
import { Notify } from "./Notify"
import { useSelector } from "react-redux"
import { RootState } from "@/state/store"
import { AnimatePresence } from "framer-motion"
import { useChatQuery } from "@/queries/useChat"
import { useNotifySocket } from "@/context/NotifySocketProvider";
import { NotifyProps } from "@/types/notifies"



export const NotifyLayout = () => {
    const userData = useSelector((state: RootState) => state.auth.userData);
    const [notifies, setNotifies] = useState<NotifyProps[]>([]);

    const { openChat } = useChatQuery();

    const socket = useNotifySocket();

    useEffect(() => {
        if (!userData?._id || !socket) return;


        socket.emit("subscribe", userData._id);

        const handleNotification = async (message: NotifyProps) => {
            console.log(message, " received notify")

            switch (message.type) {
                case "push.message":
                    await openChat(message.contentId)
                    break;
                default:
                    setNotifies((prev) => [...prev, message]);
            }
            // push.message

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
