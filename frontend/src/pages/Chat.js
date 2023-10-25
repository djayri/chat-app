import { useState, useEffect } from "react";
import { useMainState } from "../context/MainProvider";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import useMessages from "../hooks/useMessages";

const socket = io.connect("http://localhost:3001");

const Chat = () => {
  const { activeRoomId, activeRoomCode, userId } = useMainState();
  const [newMessage, setNewMessage] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (activeRoomCode && userId) {
      fetchAllMessages();
      updateConnectionStatus(false);

      socket.emit("join_room", { roomCode: activeRoomCode, userName: userId });
      socket.on("room_connected", (roomCode) => {
        updateConnectionStatus(true);
        console.log(`connected to room ${roomCode}`);
      });
    }
  }, [activeRoomId, userId]);

  const onMessageSent = (storedMessage) => {
    socket.emit("new_message", {
      ...storedMessage,
      roomCode: activeRoomCode,
    });
  };

  const {
    allMessages,
    pendingMessages,
    fetchAllMessages,
    appendNewMessage,
    appendPendingMessage,
  } = useMessages(activeRoomId, userId, onMessageSent);

  useEffect(() => {}, [allMessages]);

  const updateConnectionStatus = (isConnected) => {
    setIsConnecting(!isConnected);
    setIsConnected(isConnected);
  };

  const queueMessage = (e) => {
    if (e.key !== "Enter" || !newMessage) return;
    appendPendingMessage({
      content: newMessage,
      queueId: uuidv4(),
      sender: userId,
    });
    setNewMessage("");
  };

  useEffect(() => {
    socket.on("message_received", (data) => {
      if (data.sender !== userId) appendNewMessage(data);
    });
  }, [socket]);

  const combinedMessages = [...allMessages, ...pendingMessages];
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
        onKeyDown={queueMessage}
      />
      <section>
        {combinedMessages &&
          combinedMessages.map((message) => (
            <div key={message._id}>
              <span>{message.sender.name}</span>
              <p>{message.content}</p>
            </div>
          ))}
      </section>
    </div>
  );
};

export default Chat;
