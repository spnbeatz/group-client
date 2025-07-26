import { io, Socket } from "socket.io-client";

let chatSocket: Socket | null = null;

export const getChatSocket = (): Socket => {
  if (!chatSocket) {
    chatSocket = io(`http://localhost:4000`, {
      autoConnect: false,
    });
  }
  return chatSocket;
};

