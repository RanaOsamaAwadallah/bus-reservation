import React, { useEffect } from "react";
import styles from "./bookings.module.scss";
import { connect } from "react-redux";
import {
  BookingsSliceState,
  addBooking,
  fetchBookings,
  Booking,
  PaymentMethod,
} from "./bookingsSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill, faIdCard } from "@fortawesome/free-solid-svg-icons";

interface BookingsProps {
  bookings?: Array<Booking>;
  fetchBookings?: any;
}

export const Bookings: React.FC<BookingsProps> = ({
  bookings,
  fetchBookings,
}) => {
  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);
  const anonymousImg = "https://www.georeferencer.com/static/img/person.png";

  const bookingsElements = bookings?.map((booking) => (
    <div className={styles["bookings__customer"]}>
      <img
        className={styles["img"]}
        src={booking.img || anonymousImg}
        alt="user"
      />
      <div>
        <div className={styles["name"]}>{booking.name}</div>
        <div className={styles["ride-data"]}>
          <FontAwesomeIcon
            icon={
              booking.paymentMethod === PaymentMethod.CASH
                ? faMoneyBill
                : faIdCard
            }
          />{" "}
          <span>{booking.status}</span>
        </div>
      </div>
    </div>
  ));
  return (
    <>
      <h1>Bookings</h1>
      <div className={styles["bookings"]}>{bookingsElements}</div>
    </>
  );
};

// TODO add rootstate type
const mapStateToProps = (state: { bookingsState: BookingsSliceState }) => ({
  bookings: state.bookingsState.bookings,
});

const mapDispatchToProps = {
  fetchBookings,
  addBooking,
};

export default connect(mapStateToProps, mapDispatchToProps)(Bookings);
