import { useState } from "react";
import { axiosInstance } from "../utils/axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const useJoinRoom = (username, roomCode) => {
  const [errorCode, setErrorCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const join = async () => {
    if (!username || !roomCode) return;
    try {
      setErrorCode("");
      setErrorMessage("");
      // register user
      const registerUserResult = await axiosInstance.post(
        `${BACKEND_URL}/user`,
        { name: username }
      );
      if (!registerUserResult?.data?._id)
        throw new Error("failed to register user");
      // create room
      const createRoomResult = await axiosInstance.post(`${BACKEND_URL}/room`, {
        code: roomCode,
      });
      if (!createRoomResult?.data?._id)
        throw new Error("failed to create room");

      // join room
      const joinRoomResult = await axiosInstance.put(
        `${BACKEND_URL}/room/${roomCode}`,
        { userId: registerUserResult.data._id }
      );
      if (!joinRoomResult?.data?._id) throw new Error("failed to join a room");
      return {
        roomId: joinRoomResult.data._id,
        userId: registerUserResult.data._id,
      };
    } catch (error) {
      console.error(error);
      setErrorCode(error.response.data.appStatus);
      setErrorMessage(error.response.data.message);
    }
    return {};
  };

  return { join, errorCode, errorMessage };
};

export default useJoinRoom;
