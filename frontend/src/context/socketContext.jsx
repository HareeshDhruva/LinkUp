import { createContext, useEffect, useState, useContext } from "react";
import io from "socket.io-client";
import { useAuthContext } from "./authContextProvider.jsx";

export const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const socketInstance = io(import.meta.env.VITE_API_URL, {
        query: { userId: authUser._id },
      });

      setSocket(socketInstance);

      socketInstance.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
        console.log("Online users updated:", users);
      });

      socketInstance.on("connect", () => {
        console.log("Socket connected:", socketInstance.id);
      });

      socketInstance.on("disconnect", () => {
        console.log("Socket disconnected:", socketInstance.id);
        setOnlineUsers([]);
      });

      return () => {
        socketInstance.off("getOnlineUsers");
        socketInstance.off("connect");
        socketInstance.off("disconnect");
        socketInstance.close();
        console.log("Socket closed and cleaned up");
      };
    } else if (socket) {
      socket.close();
      setSocket(null);
      console.log("Socket closed due to lack of authUser");
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
