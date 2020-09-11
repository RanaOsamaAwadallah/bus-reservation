import React from "react";
import "./App.scss";
import Map from "./components/map/map";
import BusLogo from "./assets/bus.svg";
import TripInformation from "./components/tripInfo/tripInfo";
import Bookings from "./components/bookings/bookings";
import { Provider } from "react-redux";
import rootReducer from "./reducers";
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
