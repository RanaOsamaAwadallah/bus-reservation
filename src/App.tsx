import React from "react";
import "./App.css";
// import Map from "./components/map/map";
import BusLogo from "./assets/bus.svg";
import { TripInformation } from "./components/tripInfo/tripInfo";
import * as data from "./shared/mocks/tripInformation.json";
import * as bookings from "./shared/mocks/bookings.json";
import { Bookings } from "./components/bookings/bookings";

function App() {
  return (
    <div className="App">
      <header>
        <img src={BusLogo} alt="Bus Logo" />
      </header>
      {/* <Map /> */}
      <div className="trip-data">
        <TripInformation {...data.data} />
        <Bookings bookings={bookings.data} />
      </div>
    </div>
  );
}

export default App;
