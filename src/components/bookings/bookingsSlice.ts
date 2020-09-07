import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { ErrorInfo } from "react";
import * as reponse from "../../shared/mocks/bookings.json";

type Booking = {
  img?: string;
  name: string;
  status?: string;
  pickupStation: string;
  dropOffStation: string;
  paymentMethod: string;
};
export type BookingsSliceState = {
  isFetching: boolean;
  bookings: Array<Booking>;
  error: ErrorInfo | null;
};
const initialState: BookingsSliceState = {
  isFetching: false,
  bookings: [],
  error: null,
};

const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    fetchStarted(state) {
      state.isFetching = true;
    },
    setBookings(state, action) {
      state.bookings = action.payload;
      state.isFetching = false;
      state.error = null;
    },
    setError(state, action) {
      state.error = action.payload;
      state.isFetching = false;
      state.bookings = [];
    },
    addBookingSuccess(state, action) {
      state.bookings = [...state.bookings, action.payload] as any;
    },
    addBookingFailed(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  fetchStarted,
  setBookings,
  setError,
  addBookingSuccess,
  addBookingFailed,
} = bookingsSlice.actions;

export default bookingsSlice.reducer;

export const fetchBookings = () => (dispatch: Dispatch) => {
  try {
    dispatch(fetchStarted());
    // Api call goes here
    dispatch(setBookings(reponse.data));
  } catch (e) {
    dispatch(setError(e.toString()));
  }
};

export const addBooking = (booking: Booking) => (dispatch: Dispatch) => {
  try {
    // Assume api call goes here to add booking
    dispatch(addBookingSuccess(booking));
  } catch (e) {
    dispatch(setError(e.toString()));
  }
};
