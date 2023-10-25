import { useState, useEffect } from "react";
import { useMainState } from "../context/MainProvider";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

const Chat = () => {
  const { activeRoomId, activeRoomCode, userId } = useMainState();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (activeRoomCode && userId) {
      updateConnectionStatus(false);
      socket.emit("join_room", { roomCode: activeRoomCode, userName: userId });
      socket.on("room_connected", (roomCode) => {
        updateConnectionStatus(true);
        console.log(`connected to room ${roomCode}`);
      });
    }
  }, [activeRoomId, userId]);

  const updateConnectionStatus = (isConnected) => {
    setIsConnecting(!isConnected);
    setIsConnected(isConnected);
  };

  useEffect(() => {
    socket.on("message_received", (data) => {
      console.log(`new message received, data:${JSON.stringify(data)}`);
      if (data.sender !== userId)
        setMessages((current) => [...current, data.content]);
    });
  }, [socket]);

  const sendMessage = (e) => {
    if (e.key !== "Enter" || !newMessage) return;

    socket.emit("new_message", {
      roomCode: activeRoomCode,
      sender: userId,
      content: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div>
      <h1 className="section-title">{activeRoomCode}</h1>
      <label htmlFor="message">Message</label>
      <section className="small-header-notification">
        {isConnecting && <p>connecting to room...</p>}
        {isConnected && <p>connected</p>}
      </section>
      <input
        id="message"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={sendMessage}
      />
      <section>
        {messages &&
          messages.map((message, index) => <div key={index}>{message}</div>)}
      </section>
    </div>
  );
};

export default Chat;
