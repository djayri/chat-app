import styles from "./Chat.module.css";
import { useState, useEffect, useRef } from "react";
import { useMainState } from "../context/MainProvider";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import useMessages from "../hooks/useMessages";
import InputTextWithIcon from "../components/InputTextWithIcon";
import MessageBox from "../components/MessageBox";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../utils/axios";
const socket = io.connect("http://localhost:3001");

const Chat = () => {
  const {
    activeRoomId,
    activeRoomCode,
    userId,
    setActiveRoomId,
    setUserId,
    setActiveRoomCode,
  } = useMainState();
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

  useEffect(() => {
    if (allMessages.length) scrollToBottom();
  }, [allMessages]);

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
    scrollToBottom();
    setNewMessage("");
  };

  useEffect(() => {
    socket.on("message_received", (data) => {
      if (data.sender !== userId) appendNewMessage(data);
    });
  }, [socket]);

  const bottomRef = useRef(null);
  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const combinedMessages = [...allMessages, ...pendingMessages];

  const navigate = useNavigate();
  const exit = async () => {
    await axiosInstance.put(
      `${process.env.REACT_APP_BACKEND_URL}/room/leave/${activeRoomCode}`,
      { userId }
    );
    setActiveRoomId("");
    setUserId("");
    setActiveRoomCode("");
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <div>
        <div class={styles.header}>
          <div onClick={exit}>Exit</div>
          <h1 className="section-title">{activeRoomCode}</h1>
        </div>
        <section className="small-header-notification">
          {isConnecting && <p>connecting to room...</p>}
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
            ))}
          <div id={styles.bottom_chat} ref={bottomRef}></div>
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
