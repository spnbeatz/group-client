/* import { io } from "socket.io-client";

const socket = io("http://localhost:4012", { autoConnect: false });

export default socket; */

import { io, Socket } from "socket.io-client";

let notifySocket: Socket | null = null;

export const getNotifySocket = (): Socket => {
  if (!notifySocket) {
    notifySocket = io(`http://localhost:4012`, {
      autoConnect: false,
    });
  }
  return notifySocket;
};

