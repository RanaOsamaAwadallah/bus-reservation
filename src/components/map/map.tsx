import React from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Polyline,
  Marker,
  Circle,
} from "react-google-maps";
import * as data from "../../shared/mocks/route.json";
import {
  decodePolyline,
  getProgressPath,
  getDistance,
} from "../../shared/helpers/mapHelper";
import { STOPS } from "../../shared/constants";

class Map extends React.Component {
  state = {
    progress: [],
    path: [],
    progressPath: [],
  };
  interval = 0;
  velocity = 5;
  initialDate: any = new Date();

  componentDidMount = () => {
    const encodedPolyline = data.routes[0].overview_polyline.points;
    const decodedPolyline = decodePolyline(encodedPolyline);
    const progressPath = getProgressPath(decodedPolyline);
    this.setState({ path: decodedPolyline, progressPath });

    console.log(this.state.path);
  };

  componentWillUnmount = () => {
    window.clearInterval(this.interval);
  };

  startTrip = () => {
    this.interval = window.setInterval(this.moveObject, 200);
  };

  moveObject = () => {
    const distance = getDistance(this.initialDate, this.velocity);
    if (!distance) {
      return;
    }

    let progress = this.state.progressPath.filter(
      (coordinates: any) => coordinates.distance < distance
    );

    const nextLine: any = this.state.progressPath.find(
      (coordinates: any) => coordinates.distance > distance
    );
    if (!nextLine) {
      this.setState({ progress });
      return; // it's the end!
    }
    const lastLine: any = progress[progress.length - 1];

    const lastLineLatLng = new window.google.maps.LatLng(
      lastLine.lat,
      lastLine.lng
    );

    const nextLineLatLng = new window.google.maps.LatLng(
      nextLine.lat,
      nextLine.lng
    );

    // distance of this line
    const totalDistance = nextLine.distance - lastLine.distance;
    const percentage = (distance - lastLine.distance) / totalDistance;

    const position = window.google.maps.geometry.spherical.interpolate(
      lastLineLatLng,
      nextLineLatLng,
      percentage
    );

    progress = progress.concat(position as any);
    this.setState({ progress });
  };

  render = () => {
    return (
      <>
        <GoogleMap
          defaultZoom={12}
          defaultCenter={{ lat: 30.0409879, lng: 31.34613896 }}
        >
          <Polyline
            path={this.state.path}
            options={{ strokeColor: "#cd4b71" }}
          />
          {STOPS.map((stop) => (
            <Circle
              defaultCenter={stop}
              defaultVisible
              visible
              radius={30}
              defaultOptions={{ fillColor: "#754daa", strokeColor: "#754daa" }}
            />
          ))}
          {this.state.progress && (
            <>
              <Polyline
                path={this.state.progress}
                options={{ strokeColor: "#754daa" }}
              />
              <Marker
                position={this.state.progress[this.state.progress.length - 1]}
              />
            </>
          )}
        </GoogleMap>
        <button onClick={this.startTrip}>Start Ride</button>
      </>
    );
  };
}

const MapComponent = withScriptjs(withGoogleMap(Map));

export default () => (
  <MapComponent
    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
    loadingElement={<div style={{ height: `100%` }} />}
    containerElement={<div style={{ height: `400px`, width: "100%" }} />}
    mapElement={<div style={{ height: `100%` }} />}
  />
);
