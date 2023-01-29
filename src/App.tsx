import React from "react";
import MenuBar from "./components/MenuBar";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import TrainGame from "./components/TrainGame/TrainGame";
import { About } from "./components/About";
import { Links } from "./links";
import Practice from "./components/Practice";

export const BASE_ROUTE = "/train-game-calculator";

function App() {
  return (
    <>
      <MenuBar />
      <div className="App">
        <Routes>
          <Route path={Links.Home} element={<TrainGame />} />
          <Route path={Links.About} element={<About />} />
          <Route path={Links.Practice} element={<Practice />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
