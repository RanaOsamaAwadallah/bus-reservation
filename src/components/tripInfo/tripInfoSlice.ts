import { createSlice, Dispatch } from "@reduxjs/toolkit";
import * as response from "../../shared/mocks/tripInformation.json";
import { ErrorInfo } from "react";

export type TripInfoSliceState = {
  isFetching: boolean;
  tripInfo: {
    tripDate?: string;
    time?: string;
    driverName?: string;
    carType?: string;
    startLocationName?: string;
    endLocationName?: string;
    tripDistance?: number | null;
    tripFare?: number | null;
  };
  error: ErrorInfo | null;
};
const initialState: TripInfoSliceState = {
  isFetching: false,
  tripInfo: {
    tripDate: "",
    time: "",
    driverName: "",
    carType: "",
    startLocationName: "",
    endLocationName: "",
    tripDistance: null,
    tripFare: null,
  },
  error: null,
};
const tripInfoSlice = createSlice({
  name: "tripInfo",
  initialState,
  reducers: {
    fetchStarted(state) {
      state.isFetching = true;
    },
    setTripInfo(state, action) {
      state.tripInfo = action.payload;
      state.isFetching = false;
      state.error = null;
    },
    setError(state, action) {
      state.error = action.payload;
      state.isFetching = false;
      state.tripInfo = {
        tripDate: "",
        time: "",
        driverName: "",
        carType: "",
        startLocationName: "",
        endLocationName: "",
        tripDistance: null,
        tripFare: null,
      };
    },
  },
});

export const { fetchStarted, setTripInfo, setError } = tripInfoSlice.actions;

export default tripInfoSlice.reducer;

export const fetchTripInfo = () => (dispatch: Dispatch) => {
  try {
    dispatch(fetchStarted());
    const tripInfo = response.data;
    dispatch(setTripInfo(tripInfo));
  } catch (e) {
    dispatch(setError(e.toString()));
  }
};
