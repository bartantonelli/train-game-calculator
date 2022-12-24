import React from "react";
import MenuBar from "./components/MenuBar";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import TrainGame from "./components/TrainGame/TrainGame";
import { About } from "./components/About";

function App() {
  return (
    <>
      <MenuBar />
      <div className="App">
        <Routes>
          <Route path="/" element={<TrainGame />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
