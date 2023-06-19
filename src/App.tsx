import MenuBar from "./components/MenuBar";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import TrainGame from "./components/TrainGame/TrainGame";
import { About } from "./components/About";
import { Links } from "./links";
import { LiveVs } from "./components/LiveVs";
import Practice from "./components/Practice";
import React, { useEffect } from "react";
import socket from "./ws";

export const BASE_ROUTE = "/train-game-calculator";

function App() {
  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <>
      <MenuBar />
      <div className="App">
        <Routes>
          <Route path={Links.Home} element={<TrainGame />} />
          <Route path={Links.About} element={<About />} />
          <Route path={Links.Practice} element={<Practice />} />
          <Route path={Links.LiveVs} element={<LiveVs />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
