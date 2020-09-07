import { combineReducers } from "redux";
import tripInfoReducer from "./components/tripInfo/tripInfoSlice";
import bookingsReducer from "./components/bookings/bookingsSlice";

export default combineReducers({
  tripInfoState: tripInfoReducer,
  bookingsState: bookingsReducer,
});
