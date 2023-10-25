import styles from "./Chat.module.css";
import { useState, useEffect } from "react";
import { useMainState } from "../context/MainProvider";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import useMessages from "../hooks/useMessages";
import InputTextWithIcon from "../components/InputTextWithIcon";
import MessageBox from "../components/MessageBox";
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
  }, [activeRoomCode, userId]);

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
    if ((e.key && e.key !== "Enter") || !newMessage) return;
    appendPendingMessage({
      content: newMessage,
      queueId: uuidv4(),
      sender: { _id: userId },
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
    <div className={styles.container}>
      <div>
        <h1 className="section-title">{activeRoomCode}</h1>
        <section className="small-header-notification">
          {isConnecting && <p>connecting to room...</p>}
          {isConnected && <p>connected</p>}
        </section>
        <section>
          {combinedMessages &&
            combinedMessages.map((message) => (
              <MessageBox
                key={message._id || message.queueId}
                senderName={message.sender.name}
                senderId={message.sender._id}
                activeUserId={userId}
                content={message.content}
              />
              // <div key={message._id || message.queueId}>
              //   <span>{message.sender.name}</span>
              //   <p>{message.content}</p>
              // </div>
            ))}
        </section>
      </div>
      <div className={styles.input_container}>
        <InputTextWithIcon
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={queueMessage}
          onClick={queueMessage}
          placeholder="Message here..."
        />
      </div>
    </div>
  );
};

export default Chat;
