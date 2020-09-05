import React from "react";
import styles from "./tripInfo.module.scss";

interface TripInformationProps {
  tripDate?: string;
  time?: string;
  driverName?: string;
  carType?: string;
  startLocationName?: string;
  endLocationName?: string;
  tripDistance?: number;
  tripFare?: number;
}

export const TripInformation: React.FC<TripInformationProps> = ({
  tripDate,
  time,
  driverName,
  carType,
  startLocationName,
  endLocationName,
  tripDistance,
  tripFare,
}) => {
  return (
    <div className={styles["trip-info"]}>
      <h1>Trip Information</h1>
      <p className={styles["trip-info__date-time"]}>
        {tripDate}, {time}
      </p>
      <div className={styles["trip-info__main"]}>
        <div className={styles["diver-info"]}>
          <div className={styles["diver-info__name"]}>{driverName}</div>
          <div className={styles["diver-info__car-type"]}>{carType}</div>
        </div>
        <div className={styles["route"]}>
          <div className={styles["route__start"]}>{startLocationName}</div>
          <div className={styles["route__end"]}>{endLocationName}</div>
        </div>
        <div className={styles["billing"]}>
          <div className={styles["billing__distance"]}>
            Trip Distance: <b>{tripDistance} KM</b>
          </div>
          <div className={styles["route__end"]}>
            Trip Base Fare: <b>{tripFare} EGP</b>
          </div>
        </div>
      </div>
    </div>
  );
};
