import React from "react";
import "./App.css";
import Map from "./components/map/map";
import BusLogo from "./assets/bus.svg";

function App() {
  return (
    <div className="App">
      <header>
        <img src={BusLogo} alt="Bus Logo" />
      </header>
      <Map />
    </div>
  );
}

export default App;
