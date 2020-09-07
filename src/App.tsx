import React from "react";
import "./App.css";
import Map from "./components/map/map";
import BusLogo from "./assets/bus.svg";
import TripInformation from "./components/tripInfo/tripInfo";
import Bookings from "./components/bookings/bookings";
import rootReducer from "./reducers";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: rootReducer,
});

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header>
          <img src={BusLogo} alt="Bus Logo" />
        </header>
        <Map />
        <div className="trip-data">
          <TripInformation />
          <Bookings />
        </div>
      </div>
    </Provider>
  );
}

export default App;
