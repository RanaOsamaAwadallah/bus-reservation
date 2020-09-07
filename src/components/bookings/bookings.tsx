import React, { useEffect } from "react";
import styles from "./bookings.module.scss";
import { connect } from "react-redux";
import { BookingsSliceState, addBooking, fetchBookings } from "./bookingsSlice";

interface BookingsProps {
  bookings?: Array<{ name: string; status?: string }>;
  fetchBookings?: any;
}

export const Bookings: React.FC<BookingsProps> = ({
  bookings,
  fetchBookings,
}) => {
  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const bookingsElements = bookings?.map((booking) => (
    <div className={styles["bookings__customer"]}>
      <div className={styles["name"]}>{booking.name}</div>
      <div className={styles["ride-data"]}>{booking.status}</div>
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
