import { useState, useEffect } from "react";
import { axiosInstance } from "../utils/axios";

const useMessages = (roomId, sender, onMessageSent) => {
  const [isFetchingMessages, setIsFetchingMessages] = useState(false);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [allMessages, setAllMessages] = useState([]);
  const [pendingMessages, setPendingMessages] = useState([]);

  useEffect(() => {
    for (let message of pendingMessages) dequeuePendingMessage(message);
  }, [pendingMessages]);

  const dequeuePendingMessage = async (message) => {
    if (!message) return;

    try {
      const storedMessage = await sendMessage(message);
      setPendingMessages((current) =>
        current.filter((c) => c.queueId !== message.queueId)
      );
      onMessageSent(storedMessage);
    } catch (error) {
      console.error("failed sending message", message);
    }
  };

  const fetchAllMessages = async () => {
    const { data } = await axiosInstance.get(
      `${process.env.REACT_APP_BACKEND_URL}/messages/${roomId}`
    );
    setAllMessages(data);
  };

  const sendMessage = async (message) => {
    if (!message) return;
    const { data: storedMessage } = await axiosInstance.post(
      `${process.env.REACT_APP_BACKEND_URL}/messages/${roomId}`,
      { sender: message.sender, content: message.content }
    );
    setAllMessages((current) => [...current, storedMessage]);
    return storedMessage;
  };

  const appendNewMessage = (message) => {
    setAllMessages((current) => [...current, message]);
  };

  const appendPendingMessage = (message) => {
    setPendingMessages((current) => [...current, message]);
  };

  return {
    isFetchingMessages,
    isSendingMessage,
    fetchAllMessages,
    allMessages,
    appendNewMessage,
    pendingMessages,
    appendPendingMessage,
  };
};

export default useMessages;
