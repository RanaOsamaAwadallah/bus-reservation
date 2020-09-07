import React, { useEffect } from "react";
import styles from "./tripInfo.module.scss";
import { fetchTripInfo, TripInfoSliceState } from "./tripInfoSlice";
import { connect } from "react-redux";

interface TripInformationProps {
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
  fetchTripInfo: any;
}

const TripInformation: React.FC<TripInformationProps> = ({
  tripInfo,
  fetchTripInfo,
}) => {
  useEffect(() => {
    fetchTripInfo();
  }, [fetchTripInfo]);
  const {
    tripDate,
    time,
    driverName,
    carType,
    startLocationName,
    endLocationName,
    tripDistance,
    tripFare,
  } = tripInfo;
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

// TOD add rootstate type
const mapStateToProps = (state: { tripInfoState: TripInfoSliceState }) => ({
  tripInfo: state.tripInfoState.tripInfo,
});

const mapDispatchToProps = {
  fetchTripInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(TripInformation);
