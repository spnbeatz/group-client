"use client";

import React, { createContext, useContext, useEffect } from "react";
import { Socket } from "socket.io-client";
import { getChatSocket } from "@/services/chatSocket";

const MessageSocketContext = createContext<Socket | null>(null);

export const useMessageSocket = () => useContext(MessageSocketContext);

export const MessageSocketProvider = ({ children }: { children: React.ReactNode }) => {
  const socket = getChatSocket();

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <MessageSocketContext.Provider value={socket}>
      {children}
    </MessageSocketContext.Provider>
  );
};
