import React, { useEffect } from "react";
import styles from "./tripInfo.module.scss";
import { fetchTripInfo, TripInfoSliceState, startTrip } from "./tripInfoSlice";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapPin,
  faDollarSign,
  faRoute,
} from "@fortawesome/free-solid-svg-icons";
import CountUp from "react-countup";

interface TripInformationProps {
  tripInfo: {
    tripDate?: string;
    time?: string;
    driverName?: string;
    driverImg?: string;
    carType?: string;
    startLocationName?: string;
    endLocationName?: string;
    tripDistance?: number | null;
    tripFare?: number | null;
    tripStarted?: boolean;
  };
  fetchTripInfo: any;
  startTrip: any;
}

const TripInformation: React.FC<TripInformationProps> = ({
  tripInfo,
  fetchTripInfo,
  startTrip,
}) => {
  useEffect(() => {
    fetchTripInfo();
  }, [fetchTripInfo]);

  const {
    tripDate,
    time,
    driverName,
    driverImg,
    carType,
    startLocationName,
    endLocationName,
    tripDistance,
    tripFare,
    tripStarted,
  } = tripInfo;

  return (
    <div className={styles["trip-info"]}>
      <div className={styles["tip-info__header"]}>
        <h1>Trip Information</h1>
        <button
          onClick={startTrip}
          className={styles["start-btn"]}
          disabled={tripStarted}
        >
          {tripStarted ? "Ride Started" : "Start Ride"}
        </button>
      </div>

      <p className={styles["trip-info__date-time"]}>
        {tripDate}, {time}
      </p>
      <div className={styles["trip-info__main"]}>
        <div className={styles["diver-info"]}>
          <img
            className={styles["diver-info__img"]}
            src={driverImg}
            alt="Driver"
          />
          <div>
            <div className={styles["diver-info__name"]}>{driverName}</div>
            <div className={styles["diver-info__car-type"]}>{carType}</div>
          </div>
        </div>
        <div className={styles["route"]}>
          <FontAwesomeIcon
            className={styles["icon"]}
            icon={faRoute}
            size="lg"
          />
          <div className={styles["route__data"]}>
            <div className={styles["route__start"]}>{startLocationName}</div>
            <div className={styles["route__end"]}>{endLocationName}</div>
          </div>
        </div>
        <div className={styles["billing"]}>
          <div className={styles["billing__distance"]}>
            <FontAwesomeIcon className={styles["icon"]} icon={faMapPin} /> Trip
            Distance: <b>{tripDistance} KM</b>
          </div>
          <div className={styles["route__end"]}>
            <FontAwesomeIcon className={styles["icon"]} icon={faDollarSign} />{" "}
            Trip Base Fare:{" "}
            <b>
              <CountUp
                start={0}
                end={tripFare || 0}
                suffix=" EGP"
                duration={4}
              />
            </b>
          </div>
        </div>
      </div>
    </div>
  );
};

// TODO add rootstate type
const mapStateToProps = (state: { tripInfoState: TripInfoSliceState }) => ({
  tripInfo: state.tripInfoState.tripInfo,
});

const mapDispatchToProps = {
  fetchTripInfo,
  startTrip,
};

export default connect(mapStateToProps, mapDispatchToProps)(TripInformation);
