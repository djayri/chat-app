import { createContext, useContext, useState } from "react";

const MainContext = createContext();

const MainProvider = ({ children }) => {
  const [activeRoomId, setActiveRoomId] = useState("");
  const [userId, setUserId] = useState("");

  return (
    <MainContext.Provider
      value={{ activeRoomId, userId, setActiveRoomId, setUserId }}
    >
      {children}
    </MainContext.Provider>
  );
};

export const useMainState = () => {
  return useContext(MainContext);
};

export default MainProvider;
