import { combineReducers } from "redux";
import tripInfoReducer from "./components/tripInfo/tripInfoSlice";
import bookingsReducer from "./components/bookings/bookingsSlice";
import mapReducer from "./components/map/mapSlice";

export default combineReducers({
  tripInfoState: tripInfoReducer,
  bookingsState: bookingsReducer,
  mapState: mapReducer,
});
