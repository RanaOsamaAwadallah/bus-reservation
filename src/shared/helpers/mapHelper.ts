export const decodePolyline = (encoded: string) => {
  // array that holds the points

  var points = [];
  var index = 0,
    len = encoded.length;
  var lat = 0,
    lng = 0;
  while (index < len) {
    var b,
      shift = 0,
      result = 0;
    do {
      b = encoded.charAt(index++).charCodeAt(0) - 63; //finds ascii                                                                                    //and substract it by 63
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);

    var dlat = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
    lat += dlat;
    shift = 0;
    result = 0;
    do {
      b = encoded.charAt(index++).charCodeAt(0) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    var dlng = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
    lng += dlng;

    points.push({ lat: lat / 1e5, lng: lng / 1e5 });
  }
  return points;
};

export const getProgressPath = (path: Array<{ lat: number; lng: number }>) => {
  return path.map((coordinates: { lat: number; lng: number }, i, array) => {
    if (i === 0) {
      return { ...coordinates, distance: 0 }; // it begins here!
    }
    const { lat: lat1, lng: lng1 } = coordinates;
    const latLong1 = new window.google.maps.LatLng(lat1, lng1);

    const { lat: lat2, lng: lng2 } = array[0];
    const latLong2 = new window.google.maps.LatLng(lat2, lng2);

    // in meters:
    const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
      latLong1,
      latLong2
    );

    return { ...coordinates, distance };
  });
};

export const getDistance = (initialDate: any, velocity: number) => {
  // seconds between when the component loaded and now
  const differentInTime = ((new Date() as any) - initialDate) / 1000; // pass to seconds
  return differentInTime * velocity; // d = v*t -- thanks Newton!
};
