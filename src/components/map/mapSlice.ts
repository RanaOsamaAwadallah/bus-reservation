import { createSlice, Dispatch } from "@reduxjs/toolkit";
import * as response from "../../shared/mocks/route.json";
import { ErrorInfo } from "react";
import {
  decodePolyline,
  getProgressPath,
} from "../../shared/helpers/mapHelper";

export type MapSliceState = {
  isFetching: boolean;
  mapData: {
    polyline: Array<{ lat: number; lng: number }>;
    waypoints: Array<{ lat: number; lng: number }>;
    progressPath: Array<{ lat: number; lng: number; distance: number }>;
  };
  error: ErrorInfo | null;
};
const initialState: MapSliceState = {
  isFetching: false,
  mapData: {
    polyline: [],
    waypoints: [],
    progressPath: [],
  },
  error: null,
};

const mapSlice = createSlice({
  name: "mapSlice",
  initialState,
  reducers: {
    fetchStarted(state) {
      state.isFetching = true;
    },
    setRouteInfo(state, action) {
      const decodedPolyline = decodePolyline(
        action.payload.routes[0].overview_polyline.points
      );
      const waypoints = action.payload.routes[0].legs[0].via_waypoint.map(
        (waypoint: any) => waypoint.location
      );
      state.mapData = {
        polyline: decodedPolyline,
        waypoints,
        progressPath: getProgressPath(decodedPolyline),
      };
      state.isFetching = false;
      state.error = null;
    },
    setError(state, action) {
      state.error = action.payload;
      state.isFetching = false;
      state.mapData = initialState.mapData;
    },
  },
});

export const { fetchStarted, setRouteInfo, setError } = mapSlice.actions;

export default mapSlice.reducer;

export const fetchRouteData = () => (dispatch: Dispatch) => {
  try {
    dispatch(fetchStarted());
    dispatch(setRouteInfo(response.data));
  } catch (e) {
    dispatch(setError(e.toString()));
  }
};
