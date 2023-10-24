import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/chat" Component={Chat} />
        <Route path="/" Component={Home} />
      </Routes>
    </div>
  );
}

export default App;
