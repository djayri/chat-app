import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    socket.emit("join_room", { roomCode: "test", userName: "tesssst" });
    socket.on("room_connected", (roomCode) => {
      console.log(`connected to room ${roomCode}`);
    });
  }, []);

  useEffect(() => {
    socket.on("message_received", (data) => {
      console.log(`new message received, data:${JSON.stringify(data)}`);
      setMessages((current) => [...current, data.content]);
    });
  }, [socket]);

  const sendMessage = (e) => {
    if (e.key !== "Enter" || !newMessage) return;

    socket.emit("new_message", {
      roomCode: "test",
      sender: "djay",
      content: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div>
      <label htmlFor="message">Message</label>
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
