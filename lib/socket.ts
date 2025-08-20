import { io } from "socket.io-client";

const socket = io("http://localhost:3000", { transports: ["websocket"] });

socket.on("connect", () => {
  console.log("✅ Connected to socket server:", socket.id);
});

socket.on("disconnect", () => {
  console.log("❌ Disconnected from socket server");
});

export default socket;
