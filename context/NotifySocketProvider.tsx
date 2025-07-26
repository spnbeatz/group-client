"use client";

import React, { createContext, useContext, useEffect } from "react";
import { Socket } from "socket.io-client";
import { getNotifySocket } from "@/services/notifySocket";

const NotifySocketContext = createContext<Socket | null>(null);

export const useNotifySocket = () => useContext(NotifySocketContext);

export const NotifySocketProvider = ({ children }: { children: React.ReactNode }) => {
  const socket = getNotifySocket();

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <NotifySocketContext.Provider value={socket}>
      {children}
    </NotifySocketContext.Provider>
  );
};
