import InputText from "../components/InputText";
import VerticalList from "../components/VerticalList";
import Button from "../components/Button";
import styles from "./Home.module.css";
import { useState } from "react";
const Home = () => {
  const [username, setUsername] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const onJoinHandler = () => {
    console.log("join");
  };
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
        </VerticalList>
      </div>
      <Button
        text="JOIN"
        onClick={onJoinHandler}
        customClassNames={[styles.join_button]}
      />
    </div>
  );
};

export default Home;
