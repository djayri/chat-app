import { useState, useEffect } from "react";
import { useMainState } from "../context/MainProvider";
import { useNavigate } from "react-router-dom";
import useJoinRoom from "../hooks/useJoinRoom";

import InputText from "../components/InputText";
import VerticalList from "../components/VerticalList";
import Button from "../components/Button";

import styles from "./Home.module.css";

const Home = () => {
  const { setActiveRoomId, setUserId } = useMainState();
  const [username, setUsername] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    join,
    errorCode: joinErrorCode,
    errorMessage: joinErrorMessage,
  } = useJoinRoom(username, roomCode);
  const navigate = useNavigate();

  const onJoinHandler = async () => {
    setErrorMessage("");
    if (!username) {
      setErrorMessage(`Username cannot be empty`);
      return;
    }
    if (!roomCode) {
      setErrorMessage(`RoomID cannot be empty`);
      return;
    }
    if (!username || !roomCode) return;
    setActiveRoomId("");
    setUserId("");
    setIsLoading(true);
    const { roomId, userId } = await join();
    if (roomId && userId) {
      setActiveRoomId(roomId);
      setUserId(userId);
      navigate("/chat");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (joinErrorCode && joinErrorMessage) {
      setErrorMessage(`Error: ${joinErrorMessage}, Code:${joinErrorCode}`);
    }
  }, [joinErrorCode, joinErrorMessage]);

  return (
    <div className={styles.container}>
      <div>
        <h1 className="section-title centered-text">Join Chatroom</h1>
        <VerticalList>
          <InputText
            placeholder={"Username"}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputText
            placeholder={"RoomID"}
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
          />
          {isLoading && <p>joining a room....</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </VerticalList>
      </div>
      <Button
        text="JOIN"
        onClick={() => onJoinHandler()}
        customClassNames={[styles.join_button]}
      />
    </div>
  );
};

export default Home;
