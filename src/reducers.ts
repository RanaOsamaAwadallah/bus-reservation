import { combineReducers } from "redux";
import tripInfoReducer from "./components/tripInfo/tripInfoSlice";

export default combineReducers({
  tripInfoState: tripInfoReducer,
});
